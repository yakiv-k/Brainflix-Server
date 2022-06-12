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
            image: videos.image
       })
    });

    res.json(VideoNoComments);
  });






module.exports = router;