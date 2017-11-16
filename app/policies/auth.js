module.exports = function auth(req, res, next) {
  console.log("Auth");
  next();
};