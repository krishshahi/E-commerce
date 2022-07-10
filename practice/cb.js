// Task Block
const askMoney = function() {
    
    setTimeout(function(){
        console.log("Ask Money")
    }, 3000);

}

const purchaseLaptop = function(err, done) {
    console.log("Purchase Laptop");
}


const letsProgram = function() {
    console.log("Let's program");
}

// execute 

//setTimeout(askMoney, 3000);
// askMoney();
// purchaseLaptop()
// letsProgram();

let products = [
    {
        title: "Prod 1",
        price: 1000,
        discount: 0
    },
    {
        title: "Prod 2",
        price: 5000,
        discount: 20
    },
    {
        title: "Prod 3",
        price: 10000,
        discount: 15
    }
];

products.map(function(elem,index){
    // products[index].after_discount
    elem.after_discount = elem.price - elem.price * elem.discount/100;
});

let filtered = products.filter(function(elem, index) {
    return elem.discount >0;
})

console.log("Products: ", filtered);
// TODO: Write these codes
// Create functions to execute the following: 
    // start the car
        // if already started , engine is running,
        // else, Car started,

    // run the car 
        // if engine is not running, start the car first
        // and run the car
        // else output car is running 

    // apply break
        // if car is stopped, output car is already stopped,
        // delay the car to stop after 3 secs, output: Car stopping..., after 3 secs: Car stopped....

    // off the car 
        // reset the operations