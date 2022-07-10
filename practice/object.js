let std_1 = {
    email: "std4@test.com",        //  email
    name: "Student Four",         //  name
    address: "Address"               //  address
};
// std_1['name']
// std_1.name

std_1.phone = 123123123;

let keys = Object.keys(std_1);      
// ['email','name','address']
let values = Object.values(std_1);
// ['std4@test.com','Student Four','Address']

console.log("Keys: ", values);

// delete std_1.address;

let stds = [
    {
        email: "std4@test.com",        //  email
        name: "Student Four",         //  name
        address: "Address"               //  address
    },
    std_1
];

console.log(stds);

console.log(
    "Name: ", stds[0]['name'], 
    " Email: ", stds[0].email, 
    "Address: ", stds[0].address
);
console.log(
    "Name: ", stds[1]['name'], 
    " Email: ", stds[1].email, 
    "Address: ", stds[1].address
);
