module.exports = function isAdmin(req, res, next) {
  ava.jwt.verify(req.token).then((data) => {
    if(data.role == 'admin') {
      next();
    } else {
      res.sendStatus(400);
    }
  }).catch((err) => {
    res.status(500).json(err);
  });
};