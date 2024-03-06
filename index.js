// to create a package.json, run npm init
// import express
let express = require('express');
const { default: mongoose } = require('mongoose');
let cors = require('cors');

// import model file
let tweetsM = require('./model/tweets');

let port = 1234;



let tweets = [
    {
        "id": 1,
        "post": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "likes": 592,
        "dislikes": 32,
        "username": "Stefania",
        "profilepic": "https://logo.clearbit.com/seattletimes.com"
    },
    {
        "id": 2,
        "post": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "likes": 756,
        "dislikes": "01",
        "username": "Gayel",
        "profilepic": "https://logo.clearbit.com/bbc.co.uk"
    }
]

// create express app
let app = express();

// configure express to encode/decode JSON
app.use(express.json());

// configure cors to accept all incoming requests from all ports
app.use(cors());

// create connection string
let connectionString = 'mongodb+srv://rainyjar:iloveprogramming@cluster0.vk2wgsk.mongodb.net/tweetscloud';
mongoose.connect(connectionString);
let db = mongoose.connection;

db.on("open", () => {
    console.log("Connected to MongoDB to cloud.");
})

// create an endpoint
// https://localhost:1234/
// endpoint is root (/)
// request method: GET
app.get('/', (request, response) => {
    console.log('endpoint called -> ' + request.url + ' with method ' + request.method);
    // send response
    response.status(200).json({
        'message': 'Hello World',
        'method': request.method
    });
})

// create an endpoint
// https://localhost:1234/
// endpoint is root (/)
// request method: POST
app.post('/', (request, response) => {
    console.log('endpoint called -> ' + request.url + ' with method ' + request.method);
    // send response
    response.status(200).json({
        'message': 'Hello World',
        'method': request.method
    });
})

// different directory
// https://localhost:1234/tweets
// endpoint is /tweets
// request method: GET
app.get('/tweets', (request, response) => {
    console.log('endpoint called -> ' + request.url + ' with method ' + request.method);
    // send response
    response.json(tweets);
})

// get different list of tweets from mongodb
app.get('/1.0/tweets/all', (request, response) => {
    console.log(`Endpoint is ${request.url}, method is ${request.method}`);
    // interact with mongboDB with model file
    tweetsM.find({})
        .then(data => {
            console.log(`${request.url} success!`);
            // set request status to 200 and send data back to client as response
            response.status(200).json(data);
        })
        .catch(error => {
            console.log(`${request.url} failure!`);
            // set request status to 200 and send data back to client as response
            response.status(500).json(error);
        })
})

// add a new tweet
app.post('/1.0/tweets/add', (request, response) => {
    console.log(`Endpoint is ${request.url}, method is ${request.method}`);
    let requestBody = request.body;
    console.log(requestBody);

    // create a new instance of model and assign the requestBody to it
    let tweetsmodelNew = new tweetsM(requestBody);
    // save the new instance
    tweetsmodelNew.save()
        .then(data => {
            console.log(`${request.url} success!`);
            // set request status to 200 and send data back to client as response
            response.status(200).json(data);
        })
        .catch(error => {
            console.log(`${request.url} failure!`);
            // set request status to 200 and send data back to client as response
            response.status(500).json(error);
        })
}
)

// update a tweet
app.put('/1.0/tweets/update/:id', (request, response) => {
    console.log(`Endpoint is ${request.url}, method is ${request.method}`);
    let requestBody = request.body;
    console.log(requestBody);

    console.log(request.params);
    let id = request.params.id;
    // find the tweet by id and update it
    // save the new instance
    tweetsM.findByIdAndUpdate(id, requestBody, { new: true })
        .then(data => {
            console.log(`${request.url} success!`);
            // set request status to 200 and send data back to client as response
            response.status(200).json(data);
        })
        .catch(error => {
            console.log(`${request.url} failure!`);
            response.status(500).json(error);
        })
}
)

//delete tweet from database
app.delete('/1.0/tweets/delete/:id', (request, response) => {
    console.log(`Endpoint is ${request.url}, method is ${request.method}`);
    console.log(request.params);
    let id = request.params.id;
    tweetsmodel = tweetsM.findByIdAndDelete(id)
        .then(data => {
            console.log(`${request.url} success!`);
            // set request status to 200 and send data back to client as response
            response.status(200).json(data);
        })
        .catch(error => {
            console.log(`${request.url} failure!`);
            response.status(500).json(error);
        })
})


app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
