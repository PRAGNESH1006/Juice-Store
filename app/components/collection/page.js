"use client";
import { useEffect, useState } from "react";
import { Button } from "@headlessui/react";
import { useRouter } from "next/navigation";
import supabase from "@/app/supabase/supabaseClient"; // Import your existing Supabase client

export default function Example() {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  // Fetch data from Supabase on component mount
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from("juice_products").select("*");

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="bg-[azure]">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Our Products
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative"
              onClick={() => {
                router.push("/components/item");
              }}
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  alt={product.juicename}
                  src={`${product.img}`}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Button>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.juicename}
                    </Button>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ₹{product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
