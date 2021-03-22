const crypto = require("crypto");

exports.users = users = [
  //   {
  //     id: 1,
  //     name: "Daryl Fong",
  //     email: "daryl@gmail.com",
  //   },
  //   { id: 2, name: "Ana Robertson", email: "anar@gmail.com" },
];

const findMaxId = () => {
  if (this.users.length === 0) return 0;
  
  return this.users.reduce(
    (max, i) => (i.id > max ? i.id : max),
    this.users[0].id
  );
};

const hashPassword = (password) => {
  let salt = crypto.randomBytes(16).toString("base64");
  let hash = crypto
    .createHmac("sha512", salt)
    .update(password)
    .digest("base64");
  return salt + "$" + hash;
};

exports.insert = (req, res) => {
  req.body.password = hashPassword(req.body.password);
  console.log("insert user", req.body);
  const id = findMaxId();
  req.body.id = id + 1;
  console.log("max id", id);
  users.push(req.body);
  res.status(201).json({ id: req.body.id });
};

exports.getById = (req, res) => {
  console.log(req.params.userId);
  const foundUser = users.find((i) => i.id == req.params.userId);
  console.log(req.params.userId, foundUser);
  if (!!foundUser) {
    return res.status(200).send(foundUser);
  }
  return res.status(204).send();
};

exports.updateById = (req, res) => {
  const foundUserIndex = users.findIndex((i) => i.id == req.params.userId);
  console.log("before", req.body);
  console.log(req.params.userId, foundUserIndex);
  if (foundUserIndex >= 0) {
    req.body.password = hashPassword(req.body.password);
    users[foundUserIndex] = req.body;
    console.log("after", users[foundUserIndex]);
    return res.status(200).send();
  }
  return res.status(204).send();
};

exports.listUsers = (req, res) => {
  return res.status(200).send(users);
};

exports.deleteUser = (req, res) => {
  users = users.filter((i) => i.id != req.params.userId);
  console.log(users);
  return res.status(200).send();
};
