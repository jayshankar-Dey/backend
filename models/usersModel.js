const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const users = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true

    },
    password: {
        type: String,
        require: true
    }
})
users.pre("save", async function(next) {
    const user = this;
    if (!user.isModified('password')) {
        next();
    }
    try {
        const solt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, solt)
        user.password = hash_password;
    } catch (error) {
        next(error);
    }
})
const Users = mongoose.model("Users", users);
module.exports = Users;