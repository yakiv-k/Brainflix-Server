const fs = require("fs");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const videoRoutes = require("./routes/videos");
const PORT = 8080;


// Define route for videos
app.use('/', videoRoutes);

// Serve static assets
app.use("/static", express.static("./assets"));


// Initiate middleware
app.use((req, res, next) => {
  console.log("succcess");
  next();
})

// Initiate listener
app.listen(PORT, () => {
  console.log("Server listening to http://localhost:" + PORT);
});