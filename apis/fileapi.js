var fs = require('fs');
var zlib = require('zlib');
var Index = require('../model/index');
var ScreenImage = require('../model/screenimage');
var WBLine = require('../model/wbline');
var WBEvent = require('../model/wbevent');
var MAX_ROW_NO = 8;
var MAX_COL_NO = 8;

exports.getIndexFile = function(originalFile, unzippedFile) {
  // unzip the index file if it doesn't exist
  if (!fs.existsSync(unzippedFile)) {
    unzipIndexFile(originalFile, unzippedFile);
  }
  // read the unzipped file to buffer
  return fs.readFileSync(unzippedFile);
};

exports.unzipIndexFile = function(originalFile, unzippedFile) {
  var buffer = fs.readFileSync(originalFile);
  var inflate = zlib.inflateSync(buffer);
  fs.writeFileSync(unzippedFile, inflate);
};

exports.getIndexArray = function(buffer){
  var arr = [];
  var ix = 0;
  var pos = 0;
  while (pos < buffer.length) {
    arr[ix] = new Index(buffer.readUInt16LE(pos), buffer.readInt8(pos+2), buffer.readInt32LE(pos+3), buffer.readUInt32LE(pos+7));
    ix++;
    pos = pos + 11;
  }

  for (var j = 0; j < arr.length; j++) {
    if (arr[j].offset == -1 && j > 0) {
    arr[j].offset = arr[j - 1].offset;
    arr[j].length = arr[j - 1].length;
    }
  }
  // sort by timestamp and grid
  arr.sort((a, b) => {
    var compare = a.timestamp - b.timestamp;
    if (compare == 0) {
    compare = a.grid - b.grid;
    }
    return compare;
  });

  return arr;
};

exports.getSSIndex = function(hm, indexarr, second) {
  var foundset = [];
  for(var i = 0; i < MAX_ROW_NO * MAX_COL_NO; i++) {
    foundset[i] = false;
  }
  var res = [];
  var index = 0;
  var firstItem = 0;
  var firstSecond = second;
  for (; firstSecond >= 0; firstSecond--) {
    if(hm[firstSecond]) {
      firstItem = hm[firstSecond];
      break;
    }
  }

  while (firstItem < indexarr.length && indexarr[firstItem].timestamp == firstSecond) {
    firstItem++;
  }

  if (firstItem > 0) {
    for (var i = firstItem - 1; i >= 0; i--) {
      var row = indexarr[i].grid >> 4;
      var col = indexarr[i].grid & 0xf;
      var value = row * MAX_ROW_NO + col;

      if (!foundset[value]) {
        foundset[value] = true;
        res[index]=indexarr[i];
        index++;
      }
      if (res.length == MAX_ROW_NO * MAX_COL_NO) {
        break;
      }
    }
  }

  return res;
};

exports.getSSData = function(imagedatafile, imageindex) {
  var res = [];
  var index = 0;
  var fd = fs.openSync(imagedatafile, 'r');
  var i = 0;
  for (i = 0; i < imageindex.length; i++) {
    var imageobj = imageindex[i];
    var row = imageobj.grid >> 4;
    var col = imageobj.grid & 0xf;

    var offset = imageindex[i].offset;
    var length = imageindex[i].length;
    var buffer = new Buffer(length);
    fs.readSync(fd, buffer, 0, length, offset);
    // image in base64 format
    var image = "data:image/png;base64," + buffer.toString('base64');
    res[index]= new ScreenImage(row, col, image);
    index++;
  }

  return JSON.stringify(res);
};
  
exports.getWBIndex = function(indexarr) {
  var res = [];
  for (var i = 0; i < indexarr.length; i++) {
    if(!res[indexarr[i].timestamp]) {
      res[indexarr[i].timestamp] = i;
    }
  }
  return res;
};

exports.getWBImageData = function(wbImageDataFile, wbImageIndex, indexList, second) {
  var res = [];
  var indeximage;
  var minutes = Math.floor(second / 60);

  if (wbImageIndex[minutes]) {
    indeximage = indexList[wbImageIndex[minutes]];
  }

  if (indeximage && indeximage.length>0) {
    var fd = fs.openSync(wbImageDataFile, 'r');
    var length = indeximage.length;
    var buffer = new Buffer(length);
    fs.readSync(fd, buffer, 0, length, indeximage.offset);

    var ix = 0;
    var pos = 0;
    while (pos < buffer.length) {
      res[ix] = new WBLine(buffer.readUInt16LE(pos), buffer.readUInt16LE(pos+2), buffer.readUInt16LE(pos+4), buffer.readUInt16LE(pos+6),buffer.readInt16LE(pos+8), buffer.readUInt16LE(pos+10));
      ix++;
      pos = pos + 12;
    }
  }

  return res;
};
  
exports.getWBSequenceData = function(wbSequenceDataFile, wbSequenceIndex, indexList, second) {
  var res = [];
  var indexsequence;
  var minutes = Math.floor(second / 60);

  if (wbSequenceIndex[minutes]) {
    indexsequence = indexList[wbSequenceIndex[minutes]];
  }

  if (indexsequence && indexsequence.length>0) {
    var fd = fs.openSync(wbSequenceDataFile, 'r');
    var length = indexsequence.length;
    var buffer = new Buffer(length);
    fs.readSync(fd, buffer, 0, length, indexsequence.offset);

    var ix = 0;
    var pos = 0;
    while (pos < buffer.length) {
      res[ix] = new WBEvent(buffer.readUInt16LE(pos), buffer.readUInt16LE(pos+2), buffer.readInt16LE(pos+4), buffer.readInt16LE(pos+6));
      ix++;
      pos = pos + 8;
    }
  }

  return res;
};