// const BASE_URL="https://v6.exchangerate-api.com/v6/af861925c76f1d133e585ac3/latest/USD";

// const dropdowns=document.querySelectorAll(".dropdown select");
// const btn=document.querySelector("form button");
// const fromCurr=document.querySelector(".from select");
// const toCurr=document.querySelector(".to select");
// const msg=document.querySelector(".msg");

// for(let select of dropdowns){
//     for(currCode in countryList){
//         let newOption=document.createElement("option");
//         newOption.innerText=currCode;
//         newOption.value=currCode;
//         if(select.name === "from" && currCode === "USD"){
//             newOption.selected="selected";
//         }else if(select.name === "to" && currCode === "INR"){
//            newOption.selected="selected";
//         }
        
//         select.append(newOption);
//     }
//     select.addEventListener("change",(evt)=>{
//         updateFlag(evt.target);

//     });
    
// }
// const updateFlag=(Element)=>{
//     let currCode= element.value;
//     let countryCode=countryList[currCode];
//     let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
//     let img = element.parentelement.querySelector("img");
//     img.src=newSrc;


// };
// btn.addEventListener("click",async(evt)=>{
//     evt.preventDefault();
//     let amount=document.querySelector(".amount input");
//     let amtVal=amount.value;
//     if(amtVal===""||amtVal<1){
//         amtVal=1;
//         amount.value="1";
//     }
//     //console.log(fromCurr.value,toCurr.value);
//    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
//    let response=await fetch(URL); 
//    let data=await response.json();
// let rate=data[toCurr.value.toLowerCase()];

// let finalAmount=amtVal*rate;
// msg.innerText=`${amtVal} ${fromCurr.value}=${finalAmount}${toCurr.value}`;

// });


const BASE_URL = "https://v6.exchangerate-api.com/v6/af861925c76f1d133e585ac3/latest/USD";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Define countryList to map currency codes to country codes
const countryList = {
    AED: "AE",
    AFN: "AF",
    // Add other currencies and country codes as needed
    USD: "US",
    INR: "IN",
    EUR: "FR",
    AUD: "AU",
};

function populateDropdowns() {
    for (let select of dropdowns) {
        for (let currCode in countryList) {
            let newOption = document.createElement("option");
            newOption.innerText = currCode;
            newOption.value = currCode;
            if (select.name === "from" && currCode === "USD") {
                newOption.selected = true;
            } else if (select.name === "to" && currCode === "INR") {
                newOption.selected = true;
            }
            select.append(newOption);
        }
    }
}

// Update flag image based on selected currency
function updateFlag(element) {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    if (img) {
        img.src = newSrc;
    }
}

// Handle form submission to fetch and display exchange rate
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = parseFloat(amount.value);
    if (isNaN(amtVal) || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    try {
        const URL = `${BASE_URL}`;
        let response = await fetch(URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        let data = await response.json();
        let rate = data.conversion_rates[toCurr.value];
        let finalAmount = amtVal * rate;
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    } catch (error) {
        console.error('Fetch error:', error);
        msg.innerText = 'Error fetching exchange rate. Please try again later.';
    }
});

// Initialize the dropdowns
populateDropdowns();

// Add event listeners for dropdown changes
for (let select of dropdowns) {
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

