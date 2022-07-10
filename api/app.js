const express = require("express");
const config = require("./config/constants");
const routes = require('./routes/');
const app = express();
const cors = require('cors');

app.use(cors());
require("./service/mongoose");

app.use('/images', express.static(process.cwd()+"/uploads"));

app.use(express.json())
app.use(express.urlencoded())


app.use('/api', routes)
// 404

app.use((req, res, next) => {
    // 
    next({
        status: 404,
        msg: "Not found"
    });
    // res.status(404).json({
    //     result: req.body,
    //     satus: false,
    //     msg: "Not found"
    // }); 
})

// error handling 
app.use((err, req, res, next) => {
    
    console.log("Error: ", err);
    
    let code = err?.status || 500;
    let msg = err?.msg || "Error";
    res.status(code).json({
        result: req.body,
        satus: false,
        msg: msg
    }); 
});


app.listen(9001, 'localhost', (err) => {
    if(err){
        console.log("Error while listening to server");
    } else {
        console.log("Server is listening to port: 9001");
        console.log("Press CTRL + C to close the server")
    }
})