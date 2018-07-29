var path = require("path");
var WBData = require('../model/wbdata');
var fileApi = require('./fileapi');

const ssIndexFile = path.join(__dirname, '../204304/ScreenShot/High/package.pak');
const unzippedSsIndexFile = path.join(__dirname, '../204304/ScreenShot/High/unzippedindex.pak');
const ssScreenshotDataFile = path.join(__dirname, '../204304/ScreenShot/High/1.pak');
const wbImageIndexFile = path.join(__dirname, '../204304/WB/1/VectorImage/package.pak');
const unzippedWbImageIndexFile = path.join(__dirname, '../204304/WB/1/VectorImage/unzippedindex.pak');
const wbImageDataFile = path.join(__dirname, '../204304/WB/1/VectorImage/1.pak');
const wbSequenceIndexFile = path.join(__dirname, '../204304/WB/1/VectorSequence/package.pak');
const unzippedWbSequenceIndexFile = path.join(__dirname, '../204304/WB/1/VectorSequence/unzippedindex.pak');
const wbSequenceDataFile = path.join(__dirname, '../204304/WB/1/VectorSequence/1.pak');

// Screenshot Cache
var ssIndexArray = null;
var ssHashmap = [];
// Whiteboard Cache
var wbImageIndexArray = null;
var wbImageIndex = null;
var wbSequenceIndexArray = null;
var wbSequenceIndex = null;

exports.getScreenshotData = function(second) {
  if (ssIndexArray===null) {
    var buffer = fileApi.getIndexFile(ssIndexFile, unzippedSsIndexFile);
    ssIndexArray = fileApi.getIndexArray(buffer);
    ssHashmap = [];
    for (var i = 0; i < ssIndexArray.length; i++)
    {
      if(!ssHashmap[ssIndexArray[i].timestamp]) {
        ssHashmap[ssIndexArray[i].timestamp] = i;
      }
    }
  }

  var ssIndex = fileApi.getSSIndex(ssHashmap, ssIndexArray, second);
  return fileApi.getSSData(ssScreenshotDataFile, ssIndex);
};

exports.getWhiteBoardData = function(second) {
  // get lines
  var lines = this.getWBImageData(second);
  // get events
  var events = this.getWBSequenceData(second);
  // combine them to whiteboard data
  var res = new WBData(second, lines, events);

  return JSON.stringify(res);
};
  
exports.getWBImageData = function(second) {
  if (wbImageIndex===null) {
    var buffer = fileApi.getIndexFile(wbImageIndexFile, unzippedWbImageIndexFile);
    wbImageIndexArray = fileApi.getIndexArray(buffer);
    wbImageIndex = fileApi.getWBIndex(wbImageIndexArray);
  }
  return fileApi.getWBImageData(wbImageDataFile, wbImageIndex, wbImageIndexArray, second);
};
  
exports.getWBSequenceData = function(second) {
  if (wbSequenceIndex===null) {
    var buffer = fileApi.getIndexFile(wbSequenceIndexFile, unzippedWbSequenceIndexFile);
    wbSequenceIndexArray = fileApi.getIndexArray(buffer);
    wbSequenceIndex = fileApi.getWBIndex(wbSequenceIndexArray);
  }
  return fileApi.getWBSequenceData(wbSequenceDataFile, wbSequenceIndex, wbSequenceIndexArray, second);  
};
