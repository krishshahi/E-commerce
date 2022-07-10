const abc = () => {
    return Promise.resolve("Test");
}

const xyz = () => {
    return new Promise((res, rej) => {
        res("Test");
    })
}

async function cdf() {
    return "Test";
}

async function test(){
    let result = await abc();
    console.log(result);
}

test();