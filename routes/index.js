var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
		fs.readdir('./public/mp3', function(err, files){
			if(err) throw err;
			res.render('index', {
title: 'Gyaon',
fileList: files
});
			});
		});

/* 音声データ受け取り */
router.post('/upload', function(req, res){
		var form = new formidable.IncomingForm();
		form.encoding = "utf-8";
		form.uploadDir = "./public/mp3";

		form.parse(req, function(err, fields, files){
			if(err) throw err;
			fs.rename('./' + files.file1.path, './public/mp3/' + files.file1.name, function(err){
				if(err) throw err;
				res.write('received data!');
				res.end();
			});
		});
});

module.exports = router;
