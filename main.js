// months.
const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
]

// global value
let totalAmount  = ""

// select DOM element reference.
const expenditure = document.getElementById("expenditure")
const amount = document.getElementById("amount")
const submit = document.getElementById("submit")

const heading = document.querySelector(".calc__input-heading")
const form = document.querySelector(".calc__form")
const profitForm = document.querySelector(".calc__profit")
const message = document.querySelector(".calc__message")
const linksWrapper = document.querySelector(".calc__links")


const records = document.querySelector(".calc__records")
const total = document.getElementById("total-expenditure")
const profit = document.getElementById("net-profit-loss")


// EVENT LISNERES
form.addEventListener( "submit", saveDetails)
linksWrapper.addEventListener("click", displayContent)
window.addEventListener( "DOMContentLoaded", () => {
    setUpDetails()
    renderTotalExpenditures()
})
profitForm.addEventListener( "submit", calculateProfitOrLoss)


function calculateProfitOrLoss(e) {
    e.preventDefault()
    const profitOrLoss = document.getElementById("net-profit-loss")
    const income = document.getElementById("total-gain")
    const total = income.value
    const expenditures = totalAmount
    let diff = total - expenditures
    if(total > expenditures) {
        diff = `profit is ${diff}/=`
    }
    else {
        diff = `loss is ${diff * -1}/=`
    }
    profitOrLoss.value = diff
    income.value = ""
}




// FUNCTIONS
function displayContent(e) {
  e.preventDefault()
  const link = e.target.textContent
  switch(link) {

     case "HOME":
        // some code ... 
    break

     case "DETAILS":
        // some code ...
       break

     case "CALCULATE":
         // some code ...
       break
    
     default:
       return
  }

}

function saveDetails(e) {
    e.preventDefault()

    // date 
    const today = new Date()
    const this_year = today.getFullYear()
    const this_month = months[today.getMonth()]
    const this_date = today.getDate()
    const this_hour = today.getHours()
    const this_min = today.getMinutes()
    const dateFormat = `${this_date}/${this_month}/${this_year} ${this_hour}:${this_min}`    
    
    const expenditureVal = expenditure.value
    const amountVal = amount.value
    const details = {expenditure: expenditureVal,amount: amountVal, date: dateFormat}

    if(amount.value && expenditure.value) {
        // get details
        const data = getLocalstorage()
        data.push(details)
        // add details to local storage
        localStorage.setItem("details", JSON.stringify(data))
        
        // add details to UI
        addDetails(expenditureVal,amountVal,dateFormat)
        
        // render total expenditures on UI
        renderTotalExpenditures()

        displayMessage("details added successfully!", "success")
        setUpToDefault()
    }

    else {
        if(!expenditureVal && !amountVal) {
            displayMessage("please enter expenditure and amount", "danger")
        }
        else if(!expenditureVal) {
            displayMessage("please enter expenditure", "danger")
        }
        else {
            displayMessage("please enter amount", "danger")
        }
    }
}

// add details to UI
function addDetails(expenditure, amount, date) {
    amount = tolocaleString(amount)
    const detail = `<p class="calc__text">on ${date}, spent ${amount}/= amount paying for ${expenditure}</p>`
    records.insertAdjacentHTML("beforeend",detail)
    
}

// tolocalestring.
function tolocaleString(num) {
    num = Number(num)
    num = num.toLocaleString("en")
    return num
} 

// get local storage.
function getLocalstorage() {
    return localStorage.getItem("details") ? JSON.parse(localStorage.getItem("details")) : []
}

// display message function
function displayMessage(text,action) {
    message.textContent = text
    message.classList.add(action)
    
    setTimeout( () => {
       message.textContent = ""
       message.classList.remove(action)
    }, 1500)
}

// setup to default
function setUpToDefault() {
   expenditure.value = ""    
   amount.value = ""    
}

// setup details page refresh
function setUpDetails() {
    const details = getLocalstorage()

    details.forEach(detail => {
        addDetails(detail.expenditure,detail.amount,detail.date)
    });
}

// total expenditures
function sumOfExpenditures() {
    const details = getLocalstorage()
    let total = 0
    details.forEach( detail => {
        total += Number(detail.amount)
    })
    return total
}

function renderTotalExpenditures() {
    const totalExpenditures = sumOfExpenditures()
    totalAmount = totalExpenditures
    total.value = tolocaleString(totalExpenditures)
}


