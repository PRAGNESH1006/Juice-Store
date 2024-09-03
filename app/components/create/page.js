"use client";
import { useState } from "react";
import supabase from "@/app/supabase/supabaseClient"; // Ensure this path is correct
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    juicename: "",
    fruit: "",
    price: "",
    img: "",
    ml: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { juicename, fruit, price, img, ml } = formData;

    const { data, error } = await supabase
      .from("juice_products")
      .insert([{ juicename, fruit, price, img, ml }]);

    if (error) {
      console.error("Error inserting data:", error);
      setErrorMessage("Failed to add product. Please try again.");
    } else {
      setSuccessMessage("Product added successfully!");
      router.push("/components/collection");
      setFormData({
        juicename: "",
        fruit: "",
        price: "",
        img: "",
        ml: "",
      });
    }
  };

  return (
    <div className="container mx-auto max-w-lg p-4 bg-white shadow-md rounded-lg my-5">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Add New Juice Product
      </h1>
      {successMessage && (
        <p className="text-green-600 text-center mb-4">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-red-600 text-center mb-4">{errorMessage}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="url"
            name="img"
            value={formData.img}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Juice Name
          </label>
          <input
            type="text"
            name="juicename"
            value={formData.juicename}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fruit
          </label>
          <input
            type="text"
            name="fruit"
            value={formData.fruit}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price (₹)
          </label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Milliliters (ml)
          </label>
          <input
            type="number"
            name="ml"
            value={formData.ml}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
