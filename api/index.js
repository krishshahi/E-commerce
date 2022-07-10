// fs
const fs = require("fs");
const path = require("path");
const events = require("events");

fs.open('abc.txt', 'w', (err, fp) =>{
    let user = {
        name: "Sandesh Bhattarai",
        address: "Kathmandu",
        email: "sandesh.bhattarai@kotuko.it"
    }
    
    fs.write(fp, JSON.stringify(user), (error, done) => {
        // console.log("Err: ", error);
        // console.log("Done: ", done);
    })
});

fs.open('abc.txt', 'r', (err, fd) => {
    fs.readFile(fd,{encoding: 'utf-8'}, (err, done) => {
        console.log("Data: ", done);
    })
})

// fs.write(fp, JSON.stringify(user), (err, done) => {
//     console.log("Err: ", err);
//     console.log("Done: ", done);
// })