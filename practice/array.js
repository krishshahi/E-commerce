// is a collection of data
// any data type 
// every data is stored in a comma seprated format 
// data are stored in index-value pair
// where index starts from 0
// array are of two types: 
    // single dimensional array
        // array which does not have any other array/object data
    // multi dimensional array 
        // array which contains atleast one array/object data 

// e.g. => a form to create a product 
    // {}, {}, {}
    // {..., brands: ['sony','apple'] }
// an array  can be a collection of products
    // [{}, {}, {}]


// general way of creating an array
let brands = [];

// how to push a data in an array
let brand_1 = "apple";

// at the end of the array
brands.push(brand_1);   // 0    // ["apple"]

let brand_2 = "samsung"
brands.push(brand_2);       // 1    // ["apple","samsung"]

// ["apple","samsung"]
// extract first element 
let first = brands.shift(); // returns 0 index element
// first => apple
// brands => ["samsung"]

// extract last element 
let last = brands.pop();        // returns last index element
// last => samsung
// []

// size of an array 
let length = brands.length; // 0

// entry 
// last_index = size - 1; // 10, 9
// ['apple', ''] => 2
// [2]
brands[length] =  brand_1   // array.push(), array[array.length]
length = brands.length; // 1

brands[length] =  brand_2   // 0, 1

// push enters at end 
brands.unshift(brand_2);    // shifts the array and enters the data at 0 index

// delete brands[1];   //
// [0,1,2]
// delete [1];
// [0, 1]
console.log("Brands: ", brands)
// splice(index, count)
brands.splice(1,1);

console.log("Brands: ", brands)

// iteration, loop
// .map
// .filter 

console.log("Brand 0: ", brands[0]);
console.log("Brand 1: ", brands[1]);


// by using array Constructor 
let products = new Array(["Samsung Mobile"], ["Apple IPhone"]);

console.log("products: ", products);
console.log("First Value: ", products[0][0])
console.log("Second Value: ", products[1][0])

// create an array or students: 
let stds = [
    ["Student Name", "email@test.com", "Kathmandu"],
    ["Student Two", "std2@test.com", "Lalitpur"],
    ["std3@test.com", "Student Three",  "Bhaktapur"],
]
// print the output in the following format: 
// Name: Student Name, Email: email@test.com, Address: Kathmandu

// create a new student array 
let std_1 = ["Student Four", "std4@test.com","Address"];
// push the element at the end 
stds[2] = std_1;

console.log("Name: ", stds[0][0], " Email: ", stds[0][1], "Address: ", stds[0][2]);
console.log("Name: ", stds[1][0], " Email: ", stds[1][1], "Address: ", stds[1][2]);
console.log("Name: ", stds[2][1], " Email: ", stds[2][0], "Address: ", stds[2][2]);

// stds.push(std_1);
let index = stds.length -1;
console.log("Name: ", stds[index][0], " Email: ", stds[index][1], "Address: ", stds[index][2]);

// new entry 
//let index = stds.length -1;
//console.log("Name: ", stds[index][0], " Email: ", stds[index][1], "Address: ", stds[index][2]);
// print the element's value as above 