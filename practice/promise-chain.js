const doSomthing = (x) => {
    console.log("I am first Promise");
    
    return new Promise((res, rej) => {
        rej("I am reject of First Promise");
        // res(true);
    });
}

const doNothing = () => {
    console.log("I am second Promise");
    return new Promise((res, rej) => {
        res(true);
        // rej("I am reject of Second Promise");
    })
}

const testAll = () => {
    console.log("I am third Promise");
    return new Promise((res, rej) => {
        res(true);
    })
}

doSomthing(10)
    .then((res)=>{
        console.log("I am resolve of first Promise")
        return doNothing()
    })
    .then((res1) => {
        console.log("I am resolve of Second Promise");
        return testAll();
    })
    .then((res2) => {
        console.log("I am resolve of third promise");
    })
    .catch((err) => {
        console.log("Rej: ", err);
    })

// doSomthing()
//     .then((res) => {
//         console.log("I am resolve of First Promise");
//         doNothing()
//             .then((response) => {
//                 console.log("I am resolve of Second Promise");
//                 testAll()
//                     .then((resp) => {
//                         console.log("I am resolve of third promise");
//                     })
//                     .catch((errr) => {
//                         console.log("I am reject of third promise");
//                     })
//             })
//             .catch((error) => {
//                 console.log("I am reject of second Promise");
//             })
//     })
//     .catch((err)=>{
//         console.log("I am reject");
//     })
