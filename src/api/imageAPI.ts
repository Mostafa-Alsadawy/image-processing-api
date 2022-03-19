import express from 'express';
import ImageModel from '../models/image';
import resize from '../utils/imageProcessing';
import errors from '../utils/errorFinder';

const router = express.Router();

//This is the end point for the api and it responsible for handel
//all get requests thats start with /api
router.get('/', async (req, res) => {
    //adding try catch block to not stop the server if unexpected error happened.
    try {
        // parse the request query data
        const imageRequested = new ImageModel(
            req.query.fileName as string,
            parseInt(req.query.width as string),
            parseInt(req.query.height as string)
        );
        // checking for any user errors.
        const errorList = errors(imageRequested);
        // if there no errors.
        if (errorList.length === 0) {
            // check if the requested image in the processed image folder.
            if (!imageRequested.isImageInDest) {
                await resize(imageRequested);
            }

            res.sendFile(imageRequested.pathInDestFolder);
        }
        // if error happened form user , show the errors for him/her.
        else {
            res.render('index', {
                errors: errorList,
            });
        }
        // if error happen from the server show the user an error message
    } catch (e) {
        res.status(500).render('404', {
            massage: 'Sorry, something wrong happened',
        });
    }
});

export default router;
