import React from "react";
import { App } from "../components/App.js";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";

// test('renders a number input with a label "Favorite Number"', () => {
  //1. render component
    

  const getByLabelText = render(<App />);
  console.log(getByLabelText);

//   //2. search for element
//   const numberInput = getByLabelText("Favorite Number"); // /favourite number/i to apply to lower case defn also

//   //3. assert on the element
//   expect(numberInput).toBeInTheDocument();
//   expect(numberInput).toHaveAttribute("type", "number");
// });

// test("changing the number input to 10 shou,d trigger error message", () => {
//   const { getByLabelText } = render(<FavoriteNumber />);
//   const { getByText } = render(<FavoriteNumber />);
//   const numberInput = getByLabelText(/Favorite Number/);

//   //key in the number 10
//   fireEvent.change(numberInput, { target: { value: 10 } });

//   expect(getByText("The number is invalid")).toBeInTheDocument();
// });
