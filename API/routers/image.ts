import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import Image from "../Models/images";
import {imagesUpload} from "../multer";

const imageRouter = express.Router();

imageRouter.get('/', async  (req, res, next) => {
    try {
        const item = await Image.find();
        return res.send(item);
    } catch (e) {
        next(e)
    }
});

imageRouter.post('/',  imagesUpload.single('image') ,auth , async(req: RequestWithUser, res, next) => {
    try {
        const item = new Image({
            title: req.body.title,
            image: req.file ? req.file.filename : null
        });
        item.username(req.user?.email);

        await item.save();

        return res.send({ message : 'image added',item});
    } catch (e) {
        next(e)
    }
});

export default imageRouter