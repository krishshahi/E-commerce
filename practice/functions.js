// function functionName(a){   // 
//     // body
//     return a;
// }

const functionName = function(a) {
    return a;
}

let result = functionName(10);


let user = {
    name: "Sandesh Bhattarai",
    getName: function(){
        return user.name;
    }
}

user.getName();


let a = 10;
let b = 20

const addNumbers = function() {
    let c = a+b;
    return c;
}

// console.log(addNumbers());   // 10

const askMoney = function() {
    console.log("Give me money");   // output
    // clouser function 
    
    const purchaseLaptop = function() { // definiton
        console.log("I need a laptop"); // output
        return true;        // true return
    }

    return purchaseLaptop;          // function return 
}

const funcRes = askMoney();     // function return 

const bool = funcRes();         //  // output
console.log(bool);

// console.log("Result: ", funcRes);
// synchronous Call
// asynchronous call

// db query
// populate html 
// table load 


// table design , skeleteon
// db query 
// populate table 


// callback , async 