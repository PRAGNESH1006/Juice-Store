import React, { Fragment } from "react";
import "./SmoothieInstructions.css"; // Import CSS file for styling
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <Fragment>
      <section className="flex flex-col items-center my-10 px-5">
        <div className="bg-[#d4e4e4] flex flex-col lg:flex-row gap-10 p-5 rounded-lg shadow-lg">
          <img
            src="/resources/orange.jpg"
            alt="orange"
            className="h-[250px] w-[250px] lg:h-[350px] lg:w-[350px] object-cover rounded-lg"
          />
          <div className="flex flex-col m-2  items-start gap-5 lg:w-[600px]">
            <h3 className="text-xl text-[orange] font-bold">Who We Are?</h3>
            <h1 className="text-2xl lg:text-3xl font-outfit font-semibold">
              Meet the Juice Crafters Crafting Healthy Delights
            </h1>
            <p className="text-sm">
              Welcome to Pulp Juice, where we believe in the pure joy of fresh,
              natural juice. Our mission is to bring you the highest quality
              fruit juices, crafted from the finest ingredients, to ensure every
              sip is bursting with flavor and vitality.
            </p>

            <p className="text-sm">
              Thank you for choosing Pulp Juice. We’re excited to be a part of
              your healthy lifestyle and can’t wait for you to taste the
              difference!
            </p>

            <Button>Book Juice</Button>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="bg-[#f5f5f5] mt-10 p-5 rounded-lg shadow-lg w-full max-w-4xl">
          <h2 className="text-2xl font-semibold text-center text-[#333] mb-5">
            Contact Us
          </h2>
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold">Location</h3>
              <p className="text-sm">123 Juice Street, Flavor Town, 56789</p>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-sm">+91 9879389572</p>
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="text-sm">pragneshpadhiyar4@gmail.com</p>
            </div>
            <div className="flex-1 h-[250px] bg-[#d4e4e4] rounded-lg">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14666.61900788909!2d73.1634672283307!3d22.297950678056673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5c801dd9c75%3A0x75153f58feec49b4!2sVadodara%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sus!4v1694798204354!5m2!1sen!2sus"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Page;
