"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import supabase from "@/app/supabase/supabaseClient";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function Update({ item }) {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("smoothies")
          .select()
          .eq("id", item.id)
          .single();

        setLoading(false);
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
        setIngredient(data.ingredient);
        console.log(data);
      } catch (error) {
        setFormError("Not found Data");
      }
    };
    fetchData();
  }, [item.id]);

  const handleSubmit = async () => {
    if (!title.trim() || !method.trim() || !rating || !ingredient.trim()) {
      setFormError("Please fill all the fields");
      alert(formError);
      return;
    }
    setFormError(null);
    setLoading(true);

    try {
      const SmoothieData = await supabase
        .from("smoothies")
        .update([
          {
            title,
            method,
            rating,
            ingredient,
          },
        ])
        .eq("id", item.id)
        .select();
      console.log(SmoothieData);
      router.refresh();
      setLoading(false);
      setSuccessMessage("Successfully added smoothies");
    } catch (error) {
      setFormError(error.message);
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue) && Number(inputValue) <= 10) {
      setRating(inputValue);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Update</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Smoothie</SheetTitle>
          <SheetDescription>
            Make changes to your Smoothie here. Click save when you&aposre done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={title}
              className="col-span-3"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Ingredients
            </Label>
            <Textarea
              id="ingredient"
              value={ingredient}
              className="col-span-3"
              onChange={(e) => setIngredient(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Method
            </Label>
            <Textarea
              id="method"
              onChange={(e) => setMethod(e.target.value)}
              value={method}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Rating
            </Label>
            <Input
              id="rating"
              value={rating}
              className="col-span-3"
              type="number"
              onChange={handleChange}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={() => handleSubmit(item.id)}>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
