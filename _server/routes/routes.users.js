const { Router } = require('express');
const usersRouter = Router();

usersRouter.get('/', function (req, res) {
  res.send('GET: users');
});

usersRouter.post('/', function (req, res) {
  res.send('POST: create user');
});

usersRouter.delete('/', function (req, res) {
  res.send('DELETE: all users');
});

usersRouter.get('/:userID', function (req, res) {
  res.send('GET: one user');
});

usersRouter.put('/:userID', function (req, res) {
  res.send('PUT: update one user');
});

usersRouter.delete('/:userID', function (req, res) {
  res.send('DELETE: delete one user');
});

module.exports = {
  usersRouter,
}