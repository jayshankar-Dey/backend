const express = require('express');
const { register, allusers, deleteUser, updateUser, fetchSingleUser, userLogin } = require('../controller/usersController');
const router = express.Router();
//users registration///getallusers///updateSingleuser///api
router.route("/users/:id?").post(register).get(allusers).put(updateUser)
    //fetch single user///api
router.route("/user/:id?").get(fetchSingleUser)
    //delete Singleuser///api
router.route("/delete/:user_id").delete(deleteUser)
    ///login user///api
router.route("/login/user").post(userLogin)
module.exports = router;