const baseURL= "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api/";
let selects = document.querySelectorAll("select");
let flag1 = document.querySelector(".from img");
let flag2 = document.querySelector(".to img");
let msg = document.querySelector(".msg p")
let btn = document.querySelector("button");
let icon = document.querySelector("i");
let amount;

for (let select of selects) {
    for (let currency in currencyList) {
        let opt = document.createElement("option"); // creating options for currencies 
        opt.innerText = currency;
        opt.value = currency;
        select.append(opt); // adding options to select
        if (select.name == "from" && opt.value == "GBP") {    // initialising currency to convert from
            opt.selected="selected";
        } else if (select.name == "to" && opt.value == "USD") {  // initialising currency to convert to
            opt.selected="selected";
        }   
    }
}

for (let i=0; i <=1 ; i++) {
    selects[i].addEventListener("change", (event) => {
        let currency = event.target.value;
        let country = currencyList[currency]; // selecting country corresponding to selected currency
        if (i===0) {
        flag1.src=`https://flagsapi.com/${country}/flat/64.png`; // creating link to get country's flag
        } else {
        flag2.src=`https://flagsapi.com/${country}/flat/64.png`;
    }
    })
}

// asynchronous programming using async-await
let exchangeRate = async () => {
    let currency1 = selects[0].value;
    let currency2 = selects[1].value;
    let URL= baseURL + `${currency2}_${currency1}.json`;  // creating link to get exchange-rate from an API
    let response = await fetch(URL);
    let data = await response.json(); // changing data format from JSON to JS object
    amount = document.querySelector("input").value; // getting amount entered by user
    if (amount<=0){ // base condition for meaningful amount value
        amount = 1;
        document.querySelector("input").value = 1;
    }  
    msg.innerText = `${amount} ${currency1} = ${data.rate * amount} ${currency2}`;  // showing exchange-rate
};

// for swapping currencies 
icon.addEventListener("click", () => {
    
    // for swapping flags
    swap1=flag1.src;
    flag1.src=flag2.src;
    flag2.src=swap1

    // for swapping currency name
    swap2=selects[0].value;
    selects[0].value=selects[1].value;
    selects[1].value=swap2;

});

// for tracking event of click on button
btn.addEventListener("click", (event) => {
    event.preventDefault(); // to deal with form returning to default values
    exchangeRate();  // calling function
});

// for dealing with the event of loading
window.addEventListener("load", () => {
    exchangeRate(); 
});



    


