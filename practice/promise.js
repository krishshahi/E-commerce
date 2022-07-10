// pending 
// fullfilled 
// Reject
// setteled

// request 
const myPromise = new Promise(function(res, rej){
    // code block 
    // succ, fail
    // login 
    // user 
    let user = {
        name: ""
    }
    if(user){
        res(user);
    } else {
        rej()
    }
    // rej(false);
});

let is_loading = true;
myPromise
    .then(function(response) {
        // table design
        // in fullfilled
        console.log("Response: ", response);
    })
    .catch(function(error) {
        // in rejection
    })
    .finally(function(){
        // always
        is_loading = false;
    })

    console.log("After promise");