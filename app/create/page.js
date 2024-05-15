"use client";
import { useState } from "react";
import supabase from "@/app/supabase/supabaseClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Create = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !method.trim() || !rating) {
      setFormError("Please fill all the fields");
      return;
    }
    setFormError(null);
    setLoading(true);

    try {
      const SmoothieData = await supabase
        .from("smoothies")
        .insert([
          {
            title,
            method,
            rating,
            ingredient,
          },
        ])
        .select();
      setLoading(false);
      router.push("/");
      setSuccessMessage("Successfully added smoothies");
    } catch (error) {
      setFormError(error.message);
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (!isNaN(inputValue) && Number(inputValue) <= 10) {
      setRating(inputValue);
    }
  };

  return (
    <>
      <Card className="w-full md:w-[350px] mx-auto my-6">
        <CardHeader>
          <CardTitle>Create smoothie</CardTitle>
          <CardDescription>Add your new smoothie in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="ingredient">Ingredients</Label>
                <Input
                  id="ingredient"
                  value={ingredient}
                  onChange={(e) => setIngredient(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="method">Method</Label>
                <Input
                  id="method"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="rating">Rating</Label>
                <Input id="rating" value={rating} onChange={handleChange} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col md:flex-row justify-between">
          <Button variant="outline" onClick={() => router.push("/")}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="mt-2 md:mt-0">
            {loading ? "Loading..." : "Create"}
          </Button>
          {formError && (
            <p className="text-red-500 mt-2 text-center">{formError}</p>
          )}
          {successMessage && (
            <p className="text-green-500 mt-2 text-center">{successMessage}</p>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default Create;
