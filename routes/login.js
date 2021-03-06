const _ = require("lodash");
const { User } = require("./models/user");
//Check if the user exists, if they do exist, log them in
module.exports = app => {
  app.post("/users/login", (req, res) => {
    var body = _.pick(req.body, ["email", "password"]);

    User.findByCredentials(body.email, body.password)
      .then(user => {
        return user.generateAuthToken().then(token => {
          res.header("xauth", token).send(user);
        });
      })
      .catch(e => {
        res.status(400).send();
      });
  });
};
