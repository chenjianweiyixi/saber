const controller = require('./controller');

module.exports = {
  route(req, res) {
    if(/index\.html/.test(req.url)) {
      controller.exec(req, res);
    }
  }
}