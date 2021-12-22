"use strict";

const bill_input = document.querySelector(".input__bill");
const people_input = document.querySelector(".input__people");
const tip_input = document.querySelectorAll(".select-tip");
const custom_input = document.querySelector(".select-tip__custom");
const tag_tip_output = document.querySelector(".tag__tip");
const tag_total_output = document.querySelector(".tag__total");
const reset_btn = document.querySelector(".reset-btn");
const error = document.querySelector(".error");
let bill = 0;
let people = 1;
let tip = 0;
//Reset all the values and update outputs, disactivate the reset button
function reset() {
  bill_input.value = 0;
  people_input.value = 1;
  custom_input.value = "";
  update(0, 0);
  reset_btn.classList.add("reset-btn__inactive");
}
//Update the outputs with new values
function update(tip, total) {
  tag_tip_output.textContent = `$${tip}`;
  tag_total_output.textContent = `$${total}`;
}
//Calculate tip amount per person and total amount per person, trim the numbers to 2nd decimal, update the outputs
function calculate(bill, people, tip) {
  let tips = (tip / 100) * bill;
  let total = bill + tips;
  let tips_per_person = (tips / people).toFixed(2);
  let total_per_person = (total / people).toFixed(2);
  update(tips_per_person, total_per_person);
}

reset_btn.addEventListener("click", reset);
// Add event listener to tip buttons, grab the value of selected input, empty the custom input, calculate new amounts, activate reset button
for (let i = 0; i < tip_input.length - 1; i++) {
  tip_input[i].addEventListener("click", function () {
    const value = tip_input[i].attributes[1].value;
    tip = Number(value.substring(0, value.length - 1));
    custom_input.value = "";
    calculate(bill, people, tip);
    reset_btn.classList.remove("reset-btn__inactive");
  });
}
//Calculate and update on change of any inputs
custom_input.addEventListener("input", function (e) {
  tip = Number(e.target.value);
  calculate(bill, people, tip);
  reset_btn.classList.remove("reset-btn__inactive");
});
bill_input.addEventListener("input", function (e) {
  bill = Number(e.target.value);
  calculate(bill, people, tip);
  reset_btn.classList.remove("reset-btn__inactive");
});
people_input.addEventListener("input", function (e) {
  people = Number(e.target.value);
  if (people == 0) {
    //Show error if amount of people equals zero
    error.style.display = "block";
    people_input.style.border = "2px solid red";
  } else {
    error.style.display = "none";
    people_input.style.border = "none";
    calculate(bill, people, tip);
    reset_btn.classList.remove("reset-btn__inactive");
  }
});
