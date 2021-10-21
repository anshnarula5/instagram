const mongoose = require("mongoose")
const Schema = mongoose.Schema

const User = require("./user")
const Post = require("./post")

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref : "User"
    },
    profileImage: {
        type: String,
        default : "https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_1280.png"
    },
    website: {
        type : String
    },
    bio: {
        type : String
    },
    gender: {
        type: String,
    },
    followers : {
        type: [Schema.Types.ObjectId],
        ref : User
    },
    following : {
        type: [Schema.Types.ObjectId],
        ref : User
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref : "Post"
        }
    ],
    saves: [
        {
            type: Schema.Types.ObjectId,
            ref : "Post"
        }
    ]
})

const Profile = mongoose.model("Profile", profileSchema)

module.exports = Profile