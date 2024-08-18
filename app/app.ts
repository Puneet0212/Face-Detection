// lib/app.ts
import express from "express";

import * as bodyParser from "body-parser";

import { faceRecognition } from "./faceRecognition";
import { saveFaceMatched } from "./saveFaceMatched";

import jimp from "jimp";

import jsQR from "jsqr";

const port = process.env.PORT || "3000";

// Create a new express application instance
const app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/panqr", async (req: any, res) => {
  try {
    const url = req.body.url;
    console.log(url);
    const image = await jimp.read(url);

    const value = jsQR(
      new Uint8ClampedArray(image.bitmap.data),
      image.bitmap.width,
      image.bitmap.height
    );
    console.log(value);
    if (value.data) {
      const panNo = value.data.substr(-10, 10);
      console.log("Pan No. :", panNo);
      res.json({ pan: panNo });
    } else {
      res.send(404);
    }
  } catch (e) {
    res.send(404);
  }
});

app.post("/faceMatch", async (req: any, res) => {
  try {
    const knownFace = req.body.knownFace;
    const unknownFace = req.body.unknownFace;
    console.log("Faces are : ", knownFace, " ", unknownFace);
    const val = await faceRecognition(knownFace, unknownFace);
    console.log("Value from faceRecognition function is : ", val);
    res.json({ probability: val });
  } catch (err) {
    console.error(err);
    res.json({ error: err.message || err });
  }
});

app.get("/encode", (req, res) => {
  try {
    res.json({ encode: "Encode" });
  } catch (err) {
    console.error(err);
    res.json({ error: err.message || err });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
