var spawn = require('child_process').spawn;
var moment = require('moment');
var knox = require('knox');
var fs = require('fs');

var credentials = require('./credentials');

var CMD = '/opt/vc/bin/raspistill';
var snapshotTime = process.env.delay || 10000; // in ms
var width = process.env.width || 640; // in pixels
var height = process.env.height || 480;

console.log('Taking snapshots every ' + snapshotTime + 'ms at ' + width + 'x' + height);

function removeLocalFile(filename) {
  fs.unlink(filename, function(err) {
    if (err) {
      console.log('Error removing file: ', err);
    } else {
      console.log('Removed local file: ', filename);
    }
  });
}

function uploadToS3(localPath, filename) {
  var client = knox.createClient(credentials);
  client.putFile(
    localPath + filename, filename,
    function(err, result) {
      if (result.statusCode !== 200) {
        err = new Error('Upload Failure: ' + result.statusCode);
      } else {
        removeLocalFile(localPath + filename);
      }
    }
  );
}

function snapPhoto() {
  var localPath = './images/';
  var filename = moment().format('MM-DD-YYYY_m:hh:ss') + '.jpg';
  var args = [
    '--output', localPath + filename,
    '--width', width,
    '--height', height
  ];

  var child_process = spawn(CMD, args);

  child_process.on('close', function () {
    console.log('Image written to file: ', filename);
    uploadToS3(localPath, filename);
    setTimeout(snapPhoto, snapshotTime);
  });
}

snapPhoto();
