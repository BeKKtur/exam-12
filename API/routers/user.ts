import express from "express";
import userModel from "../Models/user";
import {OAuth2Client} from "google-auth-library";
import config from "../config";

const userRouter = express.Router();
const client = new OAuth2Client(config.google.clientId)

userRouter.post('/register', async (req, res, next) => {
    try {
        const user = new userModel({
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.displayName,
        })
        user.generateToken();
        await user.save();
        return res.send({message: 'Register successfully', user});

    } catch (e) {
        next(e)
    }
});

userRouter.post('/google', async (req, res, next) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: config.google.clientId
        });

        const payload = ticket.getPayload();

        if(!payload){
            return res.status(400).send({error: 'Google login failed'});
        }

        const email = payload['email'];
        const id = payload['sub'];
        const displayName = payload['name'];

        if(!email) {
            return res.status(400).send({error: 'Email is required'});
        }

        let user = await userModel.findOne({googleID: id});

        if(!user){
            user = new userModel({
                email,
                password: crypto.randomUUID(),
                googleID: id,
                displayName,

            })
        }

        user.generateToken();
        await user.save();

        return res.send({message: 'Login with google successful!', user})


    } catch (e){
        next(e)
    }
})

userRouter.post('/sessions', async (req, res, next) => {
    try {
        const user = await userModel.findOne({email: req.body.email});
        if (!user) {
            return res.status(400).send({error: 'Email or password not correct'});
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch){
            return res.status(400).send({error: 'Email or password not correct'});
        }

        user.generateToken();
        await user.save();

        return res.send({message: "Email and password correct", user});
    } catch (e) {
        next(e)
    }
});

export default userRouter;