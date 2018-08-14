const Request = function (url) {
  this.url = url;
}

Request.prototype.get = function (onComplete) {
  return fetch(this.url)
    .then((res) => res.json());
}

module.exports = Request;
