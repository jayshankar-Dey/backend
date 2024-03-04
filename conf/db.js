const mongose = require('mongoose');
const connectdb = async() => {
    try {
        await mongose.connect(process.env.db);
        console.log("connected to the database".bgYellow.red)
    } catch (error) {
        console.log(error);
        console.log("error".bgred);
    }
}

module.exports = connectdb;