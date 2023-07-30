import User from "../models/User.js"
import Video from "../models/Video.js"
import { createError } from "../error.js"

//  all the request for the login page is here


export const addvideo = async function (req, res, next) {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
    } catch (err) {
        next(err);

    }
}
export const updateVideo = async function (req, res, next) {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, "video not found "))
        if (req.user.id === video.userId) {
            const updateVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            res.status(200).json(updateVideo)
        } else {
            return next(createError(403, "you can update only your video"))
        }

    } catch (err) {
        next(err)
    }
}
export const delectVideo = async function (req, res, next) {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, "video not found "))
        if (req.user.id === video.userId) {
            const deleteVideo = await Video.findByIdAndDelete(req.params.id)
            res.status(200).json(" the video has been deleted ")
        } else {
            return next(createError(403, "you can  delect only your video"))
        }

    } catch (err) {
        next(err)
    }

}
export const getVideo = async function (req, res, next) {
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)

    } catch (err) {
        next(err)
    }

}
export const addView = async function (req, res, next) {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
          $inc: { views: 1 },
        });
        res.status(200).json("The view has been increased.");
      } catch (err) {
        next(err);
      }

}
export const addRandom = async function (req, res, next) {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }])
        res.status(200).json(videos)

    } catch (err) {
        next(err)
    }

}
export const addSubscribe = async function (req, res, next) {
    try {
        const user = await User.findById(req.user.id)
        const subscribeChannels = user.subscribedUsers
        const list = await Promise.all(
            subscribeChannels.map(channelId => {
                return Video.find({ userId: channelId })
            })
        )
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
        next(err)
    }
}

export const addTrend = async function (req, res, next) {
    try {
        const video = await Video.find().sort({ views: -1 })
        res.status(200).json(video)

    } catch (err) {
        next(err)
    }

}
export const getbytag = async function (req, res, next) {
    const tags = req.query.tags.split(",")
    // console.log(tags)
    try {
        const video = await Video.find({ tags: { $in: tags } }).limit(20)
        res.status(200).json(video)

    } catch (err) {
        next(err)
    }


}

export const search = async function (req, res, next) {
    const query = req.query.q

    try {
        const video = await Video.find({ title: { $regex: query, $options: "i" } })
        res.status(200).json(video)

    } catch (err) {
        next(err)
    }

}