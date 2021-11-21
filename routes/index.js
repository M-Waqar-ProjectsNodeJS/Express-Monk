var express = require("express");
var router = express.Router();
var db = require("monk")("localhost:27017/TestDb");
var collection = db.get("Books");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/get-data", function (req, res, next) {
  var data = collection.find({});
  data.then(function (docs) {
    res.render("index", { items: docs });
  });
});
router.post("/insert", function (req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  collection.insert(item);
  res.redirect("/");
});

router.post("/update", function (req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  const id = req.body.id;
  collection.update({ _id: db.id(id) }, { $set: item });
  res.redirect("/");
});

router.post("/delete", function (req, res, next) {
  const id = req.body.id;
  collection.remove({ _id: db.id(id) });
});

module.exports = router;
