// while 
// for 

// for-in 
// for-of

// array.map
// array.filter
// array.reduce
// array.each

let a = 1;          // 1
while(a <= 10) {    // 11 <= 10
    // loop 
    console.log(a); // 1 2 10
    a++;            // 11
}


for(let i = 1; i <=100; i++){
    if(i%2 == 0){
        console.log(i);
    }
}

for(let j = 2; j <= 10; j = j+2){
    console.log(j);
}

// 1 100 even numbers 



// let i = 1;              //i = 1
// while(i = 10){         // 1 = 10
//     // code repeate
//     console.log("here");
//     // console.log(i++);   // 1    2   3 ... 10, 11
// }                       //

// for(let i=1,j=1; i<=5 && j > 0; i++, j++){
//     console.log(j);
// }

/**
 *  *
 *  *    *
 *  *    *    *
 *  *    *    *    *
 *  *    *    *    *    *
 * 
 *  *    *    *    *    *
 *  *    *    *    *
 *  *    *    *
 *  *    * 
 *  * 
 * 
 * 
 * 1
 * 2    2
 * 3    3   3
 * 4    4   4   4
 * 5    5   5   5   5
 */

let leng = 11;

for(let i =1; i <=5; i++){
    let html = "";
    for(let j = 1; j <= i; j++){
        // if(i == 1) { for(let k =1; k <= 5; k++) { html += " "}}
        // html += "*";
        // 
        // html += "*&nbsp;&nbsp;&nbsp;&nbsp;";
        html += "*    ";
    }
    console.log(html)
    if(i == 5){
        for(let k =4; k >= 1; k--){
            let html = "";
            for(let l = k; l >= 1; l--){
                // html += "*&nbsp;&nbsp;&nbsp;&nbsp;";
                html += "*    ";
            }
            console.log(html)
        }
    }
}


