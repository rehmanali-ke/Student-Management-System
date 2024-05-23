#! /usr/bin/env node
import inquirer from "inquirer";

const randomNumber: number = Math.floor(Math.random() * 9000);

let myBalance = 0;

let answer = await inquirer.prompt([
  {
    name: "Student",
    type: "input",
    message: "Enter Student name",
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      }
      return "Please enter a non-empty value.";
    },
  },
  {
    name: "Courses",
    type: "list",
    message: "Select your desired course to enroll.",
    choices: ["MS Office", "JavaScript", "Python", "Adobe Premier Pro"],
  },
]);

const tuitionFee: { [key: string]: number } = {
  "MS Office": 2000,
  JavaScript: 3000,
  Python: 10000,
  "Adobe Premier Pro": 6000,
};

console.log(`\nTuition Fees: ${tuitionFee[answer.Courses]}/-\n`);
console.log(`Balance: ${myBalance}\n`);

let paymentType = await inquirer.prompt([
  {
    name: "payment",
    type: "list",
    message: "Enter Your Payment Method",
    choices: ["EasyPaisa", "JazzCash", "Bank Transfer"],
  },
  {
    name: "amount",
    type: "input",
    message: "Transfer Money",
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      }
      return "Please Enter a non-empty value.";
    },
  },
]);

console.log(`You have selected payment method through ${paymentType.payment}`);

const tuitionFees = tuitionFee[answer.Courses];
const paymentAmount = parseFloat(paymentType.amount);

if (tuitionFees === paymentAmount) {
  console.log(
    `Congratulations! You have successfully enrolled in ${answer.Courses}.\n`
  );
  let ans = await inquirer.prompt([
    {
      name: "select",
      type: "list",
      message: "What would you like to do next?",
      choices: ["View Status", "Exit"],
    },
  ]);
  if (ans.select == "View Status") {
    console.log(`**** Status ****`);
    console.log(`Student Name: ${answer.Student}`);
    console.log(`Student ID: ${randomNumber}`);
    console.log(`Course: ${answer.Courses}`);
    console.log(`Tuition Fees: ${paymentAmount}`);
    console.log(`Balance: ${(myBalance += paymentAmount)}`);
  } else {
    console.log(`\Thank You for Using Student Management System`);
  }
} else {
  console.log(`Please insert exact course amount\n`);
}
