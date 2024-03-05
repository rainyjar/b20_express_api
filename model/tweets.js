//  create a model
let mongose = require('mongoose');

// create a schema
let tweeetSchema = mongose.Schema;

// setup mapping method
// map the collection in which the documents is  given

// 2 paramerters (document sturcture, collection name)
let tweetCollections = new tweeetSchema({
    "post" : String,
    "likes" : Number,
    "dislikes" : Number,
    "profilepic" : String,
    "image" : String,
    "comments" : Number,
}, {
    collection: "tweets"
})

// export
module.exports = mongose.model('tweetsmodel', tweetCollections)