const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const config = require("../config/constants");
// process.env.DB_URL
// process.env.DB_NAME

// 5 steps 
/**
 * a. dB server connect 
 * b. DB Select
 * c. query build
 * d. Execute 
 * e. Fetch/ackn
 */

const dbConnection = (cb) => {
    MongoClient.connect(config.DB_URL)
    .then((client) => {
        const db= client.db(config.DB_NAME);
        // query operate
        cb(null, db);
    })
    .catch((error) => {
        cb({status: 500, msg: "Error establishing db Connection"});
    })
}

const dbInsert = (collection_name, data, is_multiple=false) => {
    return new Promise((res, rej) => {
        dbConnection((error, db) => {
            if(error){
                rej(error);
            } else {
                if(is_multiple) {
                    // multiple entry at a time
                    db.collection(collection_name).insertMany(data)
                    .then((success) => {
                        res(success);
                    })
                    .catch((db_error) => {
                        rej(db_error)
                    })
                } else {
                    // single entry at a time
                    db.collection(collection_name).insertOne(data)
                    .then((success) => {
                        res(success);
                    })
                    .catch((db_error) => {
                        rej(db_error)
                    })
                }
            }
        })
    })
}

const getAllData = (collection_name) => {
    return new Promise((res, rej) => {
        dbConnection((err, db) => {
            if(err) {
                rej(err);
            } else {
                db.collection(collection_name)
                .find()
                .toArray()
                .then((data) => {
                    res(data);
                })
                .catch((errs) => {
                    rej({staus: 500, msg: JSON.stringify(errs)});
                })
            }
        })
    })
}

const getDataById = (collection_name, id) => {
    return new Promise((res, rej) => {
        dbConnection((err, db) => {
            if(err) {
                rej(err);
            } else {
                db.collection(collection_name)
                .findOne({
                    _id: mongodb.ObjectId(id)
                })
                .then((data) => {
                    res(data);
                })
                .catch((errs) => {
                    rej({staus: 500, msg: JSON.stringify(errs)});
                })
            }
        })
    })
}

module.exports = {dbInsert, getAllData,getDataById};