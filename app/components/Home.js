import React from "react";
import "./SmoothieInstructions.css"; // Import CSS file for styling

const SmoothieInstructions = () => {
  return (
    <div className="smoothie-instructions-container">
      <h2>Welcome to our Smoothie App!</h2>
      <p>
        To add a smoothie, simply click on the "Add Smoothie" button and fill in
        the required information such as the name of the smoothie, ingredients,
        and recipe. Once added, you'll see your smoothie listed below in the
        "Smoothie Recipes" section.
      </p>
      <p>
        To view recipes, just scroll down to the "Smoothie Recipes" section.
        Each smoothie entry includes its name, ingredients, and recipe for you
        to follow and enjoy making at home!
      </p>
    </div>
  );
};

export default SmoothieInstructions;
