/**
 * a. Arithematic Operator
 *      +, -, *, /, %
 * b. Increment or Decrement Operators
 *      ++, --
 * c. Assignment Operator 
 *      =, +=, -=, *=, /=, %=
 * d. Concatination Operator or String Operator 
 *      +, ,
 * e. Comparision Operator 
 *      <, >, <=, >=, ==, !=, ===, !==
 * f. Logical Operator 
 *      &&, ||, !
 * g. Conditional Operator 
 *      (exp) ? true : false;
 *      
 *      (data) ? data : false   => data ?? false
 */
let a = 10;       // string



// (!b) 
// let result = functionCall();

// a = '10' + 5;
a = a + 5;
a += 5;     // 15

// let abc= Number("10.05");  // 10.05
// let abcd= parseInt("10.99");  // 10
// let abcde= parseFloat("10");  // 10.00

// console.log("Value of a: " + a); // 10, 105, 

// a = a + 1;
// a++;
// Post Assign
// 15
console.log("Value of a: "+ a++); // 15, 16
// a => 16
// console.log("Value of a: ", a); // 11

// ++a;
// pre assign
console.log("Value of a: ", ++a); // 17, 17


let x = 10;     // numeric
let y = '10';   // string 

console.log((x == y));  // == => value
// true 

console.log((x != y));  // != => value
// false 

console.log((x === y)); // !== => value and data type
// false

let index = null;   // null
// logic 
index = 0;          // number 

(index === null);    // false
(index === 0);       // true 

// truthy condition 
// falsy condition 
    // null, 0, "", '', ``, false ,undefined , NaN
    // empty variable 
    // variable with the above value
let falsy = false;

(falsy == null)
(falsy == 0)
(falsy == '')


a =10; 
x =15;

(a == 10  &&   x ==10)
// true && false => false 

(a == 10  ||   x ==10)
// true || false => true 

!(a == 10  &&   x ==10)
// !(true && false) => !(false) => true 
let is_featured = null;
is_featured = (is_featured) ? true : false;

// if(is_featured) {
//     let a = getValue();
// } else {
//     let a = donotGetValue();
// }

// let a = (is_featured) ? getValue() : donotGetValue();

// let status = (allow_login) ? true : false;
 
let user = {
    name: ""
}

let user_1 = {

}

user_1?.name;