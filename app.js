const express = require("express");
const cors = require("cors");
const {uploadToS3} = require('./src/utils/storeVideo');
const app = express();




require("dotenv").config();

const port = process.env.PORT || 8080;


app.use(cors());
app.use(express.urlencoded({ extended: false }));
//connection of database.
const mongoose = require("mongoose");
const { videoUpload } = require("./src/utils/storeVideo");
MongoDbURL = process.env.MONGODB_URL;
mongoose.connect(MongoDbURL);
var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error : "));
db.once("open", function () {
  console.log("Database is Ready.... ");
});

app.use(express.json({ limit: "50mb" }));

app.get('/', (req, res) => {
  res.send("hello world!")
})

app.use("/api/ram-setu", require("./src/routes/RamSetuContactRoutes"));
app.use("/api/token", require("./src/routes/TokenRoute"));
app.use("/api/whatsapp-share", require("./src/routes/WaRoute"));



app.post("/api/yoga-upload/yoga", videoUpload.single('video'), (req, res) => {
  uploadToS3(req.file, req.body.fileName);
  res.send({videoUrl:`https://satyug-bucket.s3.amazonaws.com/webiste/${req.body.fileName}.mp4`});

}, (error, req, res, next) => {
   res.status(400).send({ error: error.message })
})

// app.use("/api/yoga-upload", require("./src/routes/YogaRoute"));

app.listen(port, () => {
  console.log(`Your app listening at port ${port}`);
});