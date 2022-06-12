const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

router.use(express.json());

const videoDetailsPath = "./data/videos.json";

router
  .route("/videos")
  .get((req, res) => {
    // res.send(JSON.parse(fs.readFileSync(videoDetailsPath)));
    let videosNoComments = [];
    let dataPath = JSON.parse(fs.readFileSync(videoDetailsPath));

    dataPath.map((videos) => {
      videoNoComments.push({
        title: videos.title,
        channel: videos.channel,
        image: videos.image,
      });
    });

    res.json(VideoNoComments);
  })
  .post((req, res) => {
    const { title, description } = req.body;
    console.log(description);
    const VideoList = JSON.parse(fs.readFileSync(videoDetailsPath));

    const newObj = {
      title: title,
      channel: "Guest",
      image: "https://i.imgur.com/i6S8m7I.jpg",
      description: description,
      views: "0",
      likes: "0",
      duration: "1:00",
      timestamp: 1626032763000,
      comments: [],
      id: uuidv4(),
    };

    VideoList.push(newObj);

    fs.writeFileSync(videoDetailsPath, JSON.stringify(VideoList));

    res.send(newObj);
  });

  router.route("/videos/:id").get((req, res) => {
    const id = req.params.id;
  
    const videoDetails = JSON.parse(fs.readFileSync(videoDetailsPath));
  
    const filteredVideos = videoDetails.find((video) => video.id === id);
  
    return res.json(filteredVideos);
  });

module.exports = router;
