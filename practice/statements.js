// Control statements or Decision Making Statements
// ....
// if-else 
// else-if
// switch-case 
// loop 

let act = "view";   // add, view, delete, update
let a;
if (act == 'add'){
    // if block code
    console.log("The value is Add");
    // db query
    a = true;
}
// else {
//     // if not satisfied
//     console.log("The value is not Add");
//     var a;
// }


// act == add
act = 'delete';
if(act == 'add'){
    // add
} else {
    // edit, view, delete
    if(act == 'edit'){
        // edit
    } else {
        // view, delete 
        if(act =='view'){
            // view 
        } else {
            // delete
        }
    }
}


if(act =='add'){
    // 
} else if(act =='edit'){
    // edit 
} else if(act == 'view'){
    // view
} else if(act == 'delete') {
    // delete
}

var per = 50;


switch(act) {
    // case (per >= 50)  
    case "add": 
    case "edit": 
        // body of that edit
        break;
    case "view": 
        // body of that view
        break;
    case "delete":
        // body of that delete
        break;
    default:
        //break;
}


// create a variable named as marks_obtained 
let marks_obtained = 250;
let total = 500;
// calculate percentage,
let per = marks_obtained/total * 100;
/**
 * Print, 
 * per >= 80 => Distinction
 * per >= 60, < 80 => First Division
 * per >= 45, < 60 => Second Division
 * per >= 32, < 45 => Third Division
 * per < 32 => Sorry You are failed
 * 
 */
var b = 50;
if(per >= 80) {
    var b = 20;
    console.log("Distinction");
} else if(per >= 60 && per < 80) {
    console.log("First Division");
} else if(per >= 45  && per < 60) {
    console.log("Second Division");
} else if(per >= 32  && per < 45) {
    console.log("Third Division");
} else {
    console.log("Sorry! You are failed");
}

// &=

// b => 20
var b = 100;

// using switch case print the following: 
let day = "Sunday"; // 
// if => day = Sunday, day = Saturday => Holiday
// if => day = Friday, print => Weekend
// else => Weekday

switch(day){
    case "Sunday": 
    case "Saturday": 
        console.log("Holiday")
        break;
    case "Friday": 
        console.log("Weekend")
        break;
    default: 
        console.log("Weekday")
        break;
}

console.log("Value of a: ", a);