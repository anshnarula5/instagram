const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema({
    image: {
        type: String,
        required : true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref : "User"
    },
    text: {
        type: String,
    },
    date: {
        type: Date,
        default : Date.now()
    },
    save: {
     type : Boolean   
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref : "User"
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref : "User"
            },
            text: {
                type: String,
                required : true
            },
            date: {
                type: Date,
                default : Date.now()
            },
            likes: [
                {
                    user: {
                        type: Schema.Types.ObjectId,
                        ref : "User"
                    }
                }
            ],
        }
    ],

})

const Post = mongoose.model("Post", postSchema)

module.exports = Post