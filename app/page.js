"use client";
import "./style/style.css";
import { Fragment } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export default function Home() {
  const router = useRouter();

  const callouts = [
    {
      name: "Desk and Office",
      description: "Work from home accessories",
      imageSrc: "/resources/juice1.jpg",
      imageAlt:
        "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
      href: "#",
    },
    {
      name: "Self-Improvement",
      description: "Journals and note-taking",
      imageSrc: "/resources/juice2.jpg",
      imageAlt:
        "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
      href: "#",
    },
    {
      name: "Travel",
      description: "Daily commute essentials",
      imageSrc: "/resources/juice3.jpg",
      imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
      href: "#",
    },
  ];
  return (
    <Fragment>
      {/* image */}
      <section className="my-5">
        {" "}
        <div className="relative overflow-hidden bg-transparent">
          <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
            <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
              <div className="sm:max-w-lg">
                <div className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  <h3 className="text-[#F9B401] text-base stext">
                    Crafting Wellness, One Glass at a Time Meet Our Juice Shop
                  </h3>
                </div>
                <div className="mt-4 text-xl text-gray-500">
                  <div className="font-extrabold text-4xl  ">
                    <h1 className="font-outfit flex justify-center">
                      Crafting Wellness, One Glass{" "}
                    </h1>
                    <h1 className="font-outfit flex justify-center">
                      at a Time Meet Our Juice Shop
                    </h1>
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-10">
                  {/* Decorative image grid */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                  >
                    <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                      <div className="flex items-center space-x-6 lg:space-x-8">
                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                            <img
                              alt=""
                              src="/resources/graps.jpg"
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            <img
                              alt=""
                              src="/resources/orange.jpg"
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                        </div>
                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            <img
                              alt=""
                              src="/resources/kivi.jpg"
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            <img
                              alt=""
                              src="/resources/fruits1.jpg"
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            <img
                              alt=""
                              src="/resources/Raspberry.jpg"
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                        </div>
                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            <img
                              alt=""
                              src="/resources/images.jpg"
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            <img
                              alt=""
                              src="/resources/images1.jpg"
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      router.push("/components/collection");
                    }}
                    className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                  >
                    See Collection
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* tips */}
      <div className="flex justify-center mb-5">
        <div className="h-auto w-full max-w-[1100px] bg-[#FFFFFF] shadow-xl rounded-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">
            {/* item1 */}
            <div className="flex items-center gap-2">
              <div className="rounded-full h-[100px] w-[100px] flex items-center justify-center bg-[#F2F2F2] shadow-lg">
                <img
                  src="/resources/watermelon.svg"
                  alt="Watermelon"
                  width={80}
                  height={80}
                />
              </div>
              <div className="h-[100px] w-[180px] text-[10px] flex flex-col gap-2">
                <h3 className="text-lg text-[#FF6162] font-semibold">
                  Nutrient intake
                </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo,
                  temporibus harum. Voluptates ex sed similique quod
                  repellendus?
                </p>
              </div>
            </div>

            {/* item2 */}
            <div className="flex items-center gap-2">
              <div className="rounded-full h-[100px] w-[100px] flex items-center justify-center bg-[#F2F2F2] shadow-lg">
                <img
                  src="/resources/oranges.svg"
                  alt="Oranges"
                  width={80}
                  height={80}
                />
              </div>
              <div className="h-[100px] w-[180px] text-[10px] flex flex-col gap-2">
                <h3 className="text-lg text-[#FF6162] font-semibold">
                  Hydration
                </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo,
                  temporibus harum. Voluptates ex sed similique quod
                  repellendus?
                </p>
              </div>
            </div>

            {/* item3 */}
            <div className="flex items-center gap-2">
              <div className="rounded-full h-[100px] w-[100px] flex items-center justify-center bg-[#F2F2F2] shadow-lg">
                <img
                  src="/resources/fruits.svg"
                  alt="Fruits"
                  width={80}
                  height={80}
                />
              </div>
              <div className="h-[100px] w-[180px] text-[10px] flex flex-col gap-2">
                <h3 className="text-lg text-[#FF6162] font-semibold">
                  Digestive health
                </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo,
                  temporibus harum. Voluptates ex sed similique quod
                  repellendus?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* second section */}
      <section>
        {" "}
        <div className="bg-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-6 lg:max-w-none ">
              <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

              <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                {callouts.map((callout) => (
                  <div
                    key={callout.name}
                    className="group relative"
                    onClick={() => {
                      router.push("/components/collection");
                    }}
                  >
                    <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                      <img
                        alt={callout.imageAlt}
                        src={callout.imageSrc}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h3 className="mt-6 text-sm text-gray-500">
                      <span className="absolute inset-0" />
                      {callout.name}
                    </h3>
                    <p className="text-base font-semibold text-gray-900">
                      {callout.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
