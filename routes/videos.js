const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

router.use(express.json());

// Variable for Database
const videoDetailsPath = "./data/videos.json";

// Fulfill GET request from front end
router
  .route("/videos")
  .get((req, res) => {
    let videosNoComments = [];
    let dataPath = JSON.parse(fs.readFileSync(videoDetailsPath));

// Send back only what is needed
    dataPath.map((videos) => {
      videosNoComments.push({
        title: videos.title,
        channel: videos.channel,
        image: videos.image,
        id: videos.id,
      });
    });

    res.json(videosNoComments);
  })
  // Fulfill POST request
  .post((req, res) => {
    const { title, description } = req.body;
    console.log(description);
    const VideoList = JSON.parse(fs.readFileSync(videoDetailsPath));
// Create new object that passes the info from our front-end request
    const newObj = {
      title: title,
      channel: "Guest",
      image: "http://localhost:3000/static/media/Upload-video-preview.313a407cf90c0668da07.jpg",
      description: description,
      views: "0",
      likes: "0",
      duration: "1:00",
      timestamp: Date.now(),
      comments: [],
      id: uuidv4(),
    };

    VideoList.push(newObj);
// Update our database
    fs.writeFileSync(videoDetailsPath, JSON.stringify(VideoList));

    res.send(newObj);
  });

  // FUlfill request based on id
router.route("/videos/:id").get((req, res) => {
  const id = req.params.id;

  const videoDetails = JSON.parse(fs.readFileSync(videoDetailsPath));
// Retrieve video from database based on the id passed from our request
  const filteredVideos = videoDetails.find((video) => video.id === id);

  return res.json(filteredVideos);
});

module.exports = router;
