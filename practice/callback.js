function test(cb){
    console.log("Test function");

    cb(null, 10);
    cb(true);
}

const afterTest = function(err, done){
    // 
    console.log("I am callback");
}

test(afterTest)


// login 
// username, pass 
// db connection 
    // query
        // response 