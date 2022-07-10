let start = false;
const startCar = (cb) => {
    if(start){
        console.log("Car is already started....");
        cb(true);
    } else {
        start = true;
        console.log("Start the car");
        cb(null, start);
    }
}

// false, null, 0, "", '', ``, undefined, NaN
// any variable with the afroementioned values, 
// any undefined or NaN variables
const runCar = (err = false, data = null) => {
    if(data){
        console.log("Car is running")

        setTimeout(()=>{
            console.log("Break has been applied....");
            setTimeout(applyBreak, 2000);
        }, 3000)
    } else {
        console.log("Car has not started...");
    }
}

const applyBreak = () => {
    console.log("Break applied");
    stopCar();
}

const stopCar = () => {
    console.log("Car stopped");
}

startCar(runCar)