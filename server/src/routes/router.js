const express = require("express");
const Router = express.Router;

const HelloController = require("../controller/hello");
const authController = require("../controller/authController");
const {authMiddleware, roleMiddleware} = require("../middleware/authMiddleware");

const helloController = new HelloController
const AuthController = new authController

const router = Router();

router.route('/login')
    .post(AuthController.login)

router.route('/register')
    .post(AuthController.register)

router.use(authMiddleware)

router.route('/hello')
    .get(helloController.sendHello)

router.route('/user')
    .get(roleMiddleware(['admin']), helloController.getUser)

module.exports = router;