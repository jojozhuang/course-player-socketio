function Index(timestamp, grid, offset, length) {
  this.timestamp = timestamp;
  this.grid = grid;
  this.offset = offset;
  this.length = length;
  this.row = function() {
    return this.grid >> 4;
  }
  this.col = function() {
    return this.grid & 0xf;
  }
}

module.exports = Index;
