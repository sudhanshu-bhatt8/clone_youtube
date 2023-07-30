import express from 'express';
import { verifyToken } from '../verifytoken.js';
import { addComment, deleteComment, getComment } from '../controllers/comment.js';
// using the express router function for creating some routers 
const router = express.Router();
router.get("/:videoId", verifyToken, getComment)
router.post("/", verifyToken, addComment)
router.delete('/:videoId', verifyToken, deleteComment)

export default router;