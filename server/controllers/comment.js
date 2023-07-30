import { createError } from '../error.js'
import Comment from '../models/Comment.js'
import Video from '../models/Video.js'

//  all the comments in the web applicaiton is here 

export const addComment = async (req,res,next)=>{
    const newComment = new Comment ({...req.body,userId: req.user.id})
    try {
        const saveComment = await newComment.save()
        res.status(200).send(saveComment)
    }catch(err){
        next(err)
    }
}
export const deleteComment= async (req,res,next)=>{
    try {
        const comment  = await Comment.findById(req.params.id)
        if( req.user.id === comment.user.id || req.user.id === Video.user.id ){
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json(" the comment has been delected ")
        }else{
            return next(createError(402, " you can only delect your commen check the delectComment "))
        }

        
    }catch(err){
        next(err)
    }
}
export const getComment = async( req,res,next) =>{
    try{
        const getcomment = await Comment.find({videoId: req.params.videoId})
        res.status(200).json(getcomment)

    } 
    catch(err){
        next(err)
        
    }
}