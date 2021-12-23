const express = require('express');
module.exports = (req, res, next) => {
  if (req.query.id) {
    next();
  } else {
    const url = `${req.protocol}://${req.headers.host}/talk/${talk.url}`;
    res.redirect(url);
  }
};
