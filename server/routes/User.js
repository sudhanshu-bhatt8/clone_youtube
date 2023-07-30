import express from 'express';
import {  dislike, getUser, like, subscribe, unsubscribe, update, deleteUser } from '../controllers/user.js';
import { verifyToken } from '../verifytoken.js';

const router = express.Router();


//update user 
router.put("/:id",  verifyToken ,update) 

//delect user 
router.delete("/:id", verifyToken , deleteUser) 


// get a user 
router.get('/find/:id' , getUser)

//subscribe a user 
router.put("/sub/:id", verifyToken, subscribe);

//unsubscribe a video
router.put("/unsub/:id", verifyToken, unsubscribe)

//like a video
router.put("/like/:videoId", verifyToken,like);
//dislike a video 
router.put("/dislike/:videoId", verifyToken, dislike)

export default router;