const express = require("express");
const multer = require("multer");
const os = require("os");

console.log(os.arch());
console.log(os.freemem() / (1024 * 1024 * 1024));
console.log(os.totalmem());
console.log(os.hostname());
console.log(os.platform());
console.log(os.userInfo());

require("./config");
const ProductModel = require("./product");

const app = express();
app.use(express.json());

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  }),
}).single("user_file");

app.post("/upload", upload, (req, res) => {
  res.send("file uploaded Succesfully");
});

app.post("/create", async (req, res) => {
  let data = ProductModel(req.body);
  let result = await data.save();
  res.send(result);
});

app.get("/list", async (req, res) => {
  let data = await ProductModel.find();
  res.send(data);
});

app.delete("/:_id", async (req, res) => {
  let data = await ProductModel.deleteOne(req.params);
  res.send(data);
});

app.put("/:_id", async (req, res) => {
  let data = await ProductModel.updateOne(req.params, {
    $set: req.body,
  });
  res.send(data);
});

app.get("/search/:key", async (req, res) => {
  let data = await ProductModel.find({
    $or: [{ name: { $regex: req.params.key } }],
  });
  res.send(data);
});

app.listen(5000);
