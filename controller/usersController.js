const Users = require("../models/usersModel");
const bcrypt = require("bcryptjs");
///registration api///////////////
const register = async(req, res) => {
        try {

            const { name, email, password } = await req.body;
            if (!name || !email || !password) {
                res.json({
                    msg: "please enter all fields",
                    success: false
                });
            }
            const exist = await Users.findOne({ email });
            if (exist) {
                res.status(500).json({
                    msg: "email alrady exist please login",
                    success: false
                });
            }

            const user = await Users.create({ name, email, password });

            res.status(200).json({
                msg: "registration successfull",
                success: true,
                user
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                msg: "registration failed",
                success: false
            });
        }
    }
    //user login///////////
const userLogin = async(req, res) => {
    const { email, password } = req.body;
    try {
        if (!email) res.status(400).json({ msg: "please enter email", success: false });
        if (!password) res.status(400).json({ msg: "please enter password", success: false })

        res.status(200).json({
            msg: "logine Succesfully",
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "logine failed",
            success: false
        })
    }
}

///fetch allusers api///////////
const allusers = async(req, res) => {
        try {
            const allUsers = await Users.find({});
            res.status(200).json({
                msg: "users fatch succesfully",
                success: true,
                allUsers
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "user failed",
                success: false
            });
        }
    }
    ///fetch single user
const fetchSingleUser = async(req, res) => {
        try {
            const { id } = await req.params;
            const user = await Users.findById({ _id: id });
            res.status(200).json({
                msg: "user fetch succesfully",
                success: true,
                user
            })
        } catch (error) {
            console.log(error);
        }
    }
    //delete a single users api
const deleteUser = async(req, res) => {
        const { user_id } = await req.params;
        const user = await Users.findById({ _id: user_id });
        try {
            if (user) {
                await Users.deleteOne({ _id: user_id });
            } else {
                res.status(400).json({
                    msg: "User doesnot exist",
                    success: false
                })
            }
            res.status(200).json({
                msg: "user deleted succesfully",
                success: true
            })
        } catch (error) {
            console.log(error);
        }
    }
    //udate single user///
const updateUser = async(req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const user = await Users.findById({ _id: id });
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;
        await user.save();
        res.status(200).json({
            msg: "user update succcesfully",
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "internal error",
            success: false
        })
    }
}

module.exports = {
    register,
    allusers,
    deleteUser,
    updateUser,
    fetchSingleUser,
    userLogin

}