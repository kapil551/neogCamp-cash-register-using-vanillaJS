// 1. Input ==>
// get the input bill amount
const billAmount = document.querySelector("#bill-amount");
console.log(billAmount);

// get the input cash given
const cashGiven = document.querySelector("#cash-given");
console.log(cashGiven);

// get the check button
const checkButton = document.querySelector("#check-btn");
console.log(checkButton);

// get the error-message paragraph
const errorMessage = document.querySelector("#error-message");
console.log(errorMessage);

// get all the table row data
const tableNoOfNotes = document.querySelectorAll(".no-of-notes") ;
console.log(tableNoOfNotes);

//get the next button
const nextButton = document.querySelector("#next-btn");
console.log(nextButton);

// get the register div
const registerDiv = document.querySelector(".register");
console.log(registerDiv);

// get the message paragraph
const message = document.querySelector("#message");
console.log(message);

// currency notes available
const currencyNotes = [2000, 500, 100, 20, 10, 5, 1];

//2. Processing & output ==>

// handler for showing the eror message
function showErrorMessage(error) {

    errorMessage.style.display = "block";
    errorMessage.innerText = error;

}

// handler for hiding the error message
function hideErrorMessage() {

    // Set the display property to none initially.
    errorMessage.style.display = "none";

}

// handler for next button
function nextButtonHandler() {

    console.log("next button is clicked");

    message.style.display = "none";
    
    // 1: Validate the bill amount ==> Check whether it is greater than zero or not?
    if(billAmount.value > 0)
    {
        // make the register div visible by setting it's display property
        registerDiv.style.display = "flex";
    } else {

        message.style.display = "block";
        message.innerText = "Invalid Bill Amount";

    }


    
}


// calulate the return change
function calculateAmountChange(amountChange) {

    // start from the highest currency note and go till the lowest currency note
    // Why are we starting with the highest currency ==> because we need to return the change in minimum number of notes.

    for (let idx = 0; idx < currencyNotes.length; idx++) {
        
        let note = currencyNotes[idx]; // current currency note
        let numberOfNotes = amountChange / note;

        // only take the integer value 
        // 0.975 ==> Math.trunc(0.975) ==> 0
        console.log(note, Math.trunc(numberOfNotes));

        // update the remaining change amount
        amountChange = amountChange % note;
        console.log("amountChange", amountChange);
        
        // update the no. of notes in the view ==> In the table row data
        tableNoOfNotes[idx].innerText = Math.trunc(numberOfNotes);
    }

}

// handler for the checkButton
function checkButtonHandler() {

    console.log("check button is clicked");

    // get the input value of the bill amount 
    let bill = billAmount.value;
    console.log(bill);

    // get the input value of the cash given
    let cash = cashGiven.value;
    console.log(cash);

    hideErrorMessage(); // Hide the message initially

    // 1: Validate the bill amount ==> Check whether it is greater than zero or not?
    if (bill > 0) {

        // cash given should be greater then or equal to the bill amount
        if ((cash - bill) >= 0) {

            //calculate the change cash
            const amountChange = cash - bill;
            console.log("amountChange:", amountChange);
            calculateAmountChange(amountChange);

        } else {

            // show an error message ==> Cash given less then bill amount
            const cashGivenError = "The cash given should be atleast equal to the bill amount";
            showErrorMessage(cashGivenError);
        }

    } else {

        // show an error message ==> Bill amount validation failed
        const validationError = "The bill amount should be greater then zero";
        showErrorMessage(validationError);
    }
}

// listen for the click event on the next button
nextButton.addEventListener("click", nextButtonHandler)

// listen for the click event on the check button
checkButton.addEventListener("click", checkButtonHandler);