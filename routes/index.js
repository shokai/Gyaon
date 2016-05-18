var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var debug = require("debug")("index");
var promiseUploadDir = function() {
    return new Promise(function(resolve, reject) {
      var dir = path.resolve("./public/mp3");
      fs.mkdir(dir, function(err) {
        err ? resolve(err) : resolve();
      });
    });
  }
  /* GET home page. */
router.get('/', function(req, res, next) {
  promiseUploadDir().then(function() {
    fs.readdir('./public/mp3', function(err, files) {
      if (err) throw err;
      res.render('index', {
        title: 'Gyaon',
        fileList: files.filter(function(f) {
          return path.extname(f).match(/wav|mp3/)
        })
      });
    });
  }).catch(debug);
});

/* 音声データ受け取り */
router.post('/upload', function(req, res) {
  promiseUploadDir().then(function() {
    var form = new formidable.IncomingForm();
    form.encoding = "utf-8";
    form.uploadDir = "./public/mp3";
    form.multiples = false;
    var fileName;
    form.on("file", function(name, file) {
      var fn = path.basename(file.path) + ".wav";
      fs.rename(file.path, form.uploadDir + "/" + fn);
      fileName = fn;
    });
    form.on("end", function() {
      res.status(200).set("Content-Type", "application/json").json({
        file: fileName
      }).end();
    });
    form.parse(req);
  }).catch(debug)
});


module.exports = router;
