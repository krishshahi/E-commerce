// variable or constants 
/**
 *  Data types 
 * a. String 
 *      "", '',``
 * b. Number
 *      integer, float
 * c. Boolean
 *      true, false,
 *      1, 0
 * d. Null
 *      null, "", '', ``
 * e. Array
 *          0,      1,      ..., n-1
 *      [element1, element2, ... , element_n]
 * 
 *      ** Single Dimensional Array
 *          [string, number, bool, null, ..., data_n]
 * let a = [1,2,3,4];
 * a[1]
 *      ** Multi Dimensional Array
 *          [
 *              [],
 *              [],
 *              [],
 *          ]
 * let a = [[1],2,3,4];
 * a[0][0]
 * f. Object
 *      {
 *          key: "value",
 *          key_1: "value_1"
 *      }
 * g. Json, Javascript Object Notation 
 *      Universal Data format
 *      {
 *          "key": "Value"
 *      }
 * h. Undefined
 *      
 */
let product = [
    "iPhone 13",        // title
    138000,             // price
    10,                 // discount
    10                  // stock
];

let product_obj =  {
    title: "iPhone 13",        // title
    price: 138000,             // price
    discount: 10,              // discount
    stock: [10, 5]                  // stock
};

let product_json =  {
    "title": "iPhone 13",        // title
    "price": 138000,             // price
    "discount": 10,              // discount
    "stock": 10                  // stock
};

let name;       // data type => Undefined