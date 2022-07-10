let stds = [
    {
        name: "Sandesh Bhattarai",
        email: "sandesh.bhattarai79@gmail.com",
        address: "Kathmandu",
        phone: 1231231231
    },
    {
        name: "Student Two",
        email: "studenttwo@gmail.com",
        address: "Lalitpur",
        phone: 3213213211
    },
    {
        name: "Student Three",
        email: "studentthree@gmail.com",
        address: "Bhaktapur",
        phone: 3213213211
    }
];
let len = stds.length;  // 3

// 1,2,3,4,5

for(let j = 1; j<=5; j++){
    // html 
}



for(let i =0; i <= len-1; i++){
    console.log(
        "Name: ", stds[i].name, 
        ", Email: ", stds[i].email, 
        ", Address: ", stds[i].address,
         ", Phone: ", stds[i].phone
        )
    
}

for(let j =0; j < stds.length; j++){
    console.log("Name: ", stds[j].name,", "+
        "Email: ", stds[j].email, ", "+
        "Address: "+stds[j].address,", "+
        "Phone: ", stds[j].phone)

}
// Name: Sandesh Bhattarai, Email: sandesh.bhattarai79@gmail.com, Address: Kathmandu, Phone: 1231231231
// Name: Student Two, Email: studentwo@gmail.com, Address: Lalitpur, Phone: 3213213211

// Create an array of products object containing atleast 10 products
let products = [
    {
        title: "Prod 1",
        price: 1000,
        discount: 10
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
console.log(products);
// create a loop to calculate the after_discount value and add that to the products itself';
// products
for(let i =0; i < products.length; i++){
    
    let after_discount = products[i].price - products[i].price * products[i].discount / 100;
    
    products[i].after_discount = after_discount;
}
// after loop
console.log(products);
// [
//     {
//         title: "",
//         price: 1000,
//         discount: 10,
//         after_discount: 900
//     }
// ]