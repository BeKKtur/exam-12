import express from "express";
import userModel from "../Models/user";

const userRouter = express.Router();

userRouter.post('/register', async (req, res, next) => {
    try {
        const user = new userModel({
            username: req.body.username,
            password: req.body.password,
            displayName: req.body.displayName,
        })
        user.generateToken();
        await user.save();

        return res.send({message: 'Register successfully', user});

    } catch (e) {
        next()
    }
});

userRouter.post('/sessions', async (req, res, next) => {
    try {
        const user = await userModel.findOne({username: req.body.username});
        if (!user) {
            return res.status(400).send({error: 'Username or password not correct'});
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch){
            return res.status(400).send({error: 'Username or password not correct'});
        }

        user.generateToken();
        await user.save();

        return res.send({message: "Username and password correct", user});
    } catch (e) {
        next(e)
    }
});

export default userRouter;