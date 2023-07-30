import express from 'express';
import { addRandom, addSubscribe, addTrend, addView, addvideo, delectVideo, getVideo, getbytag, search, updateVideo,  } from '../controllers/video.js';
const router = express.Router();
import { verifyToken } from '../verifytoken.js';
import { update } from '../controllers/user.js';

// create a video 
router.post("/", verifyToken , addvideo )
router.put("/:id", verifyToken , updateVideo )
router.delete("/:id", verifyToken, delectVideo)
router.get("/find/:id", getVideo)
router.put("/view/:id", addView)
router.get("/trends",addTrend )
router.get("/random", addRandom)
router.get("/sub",verifyToken,addSubscribe )
router.get("/tag", getbytag)
router.get("/search", search )

export default router; 