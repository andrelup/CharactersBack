const Users = require("../models/users");

exports.postUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const favourites = req.body.favourites;
    const user = new Users(email, password, favourites);
    console.log("User: ", user);
    user
        .save(user)
        .then((userSaved) => {
            console.log("User: ", userSaved);
            res.send(user);
        })
        .catch((error) => {
            console.log("ERROR: ", error);
            res.status(500).send(error);
        });
}

exports.putUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const favourites = req.body.favourites;
    console.log("[editUser] favourites: ", favourites);
    console.log("[editUser] password: ", password);
    console.log("[editUser] email: ", email);
    const user = new Users(email, password, favourites);
    user
        .edit(email)
        .then((result) => {
            console.log("User: ", result);
            res.send(user);
        })
        .catch((error) => {
            console.log("ERROR: ", error);
            res.status(500).send(error);
        });
}

exports.getUser = (req, res, next) => {
    const email = req.params.email;
    Users.find(email)
        .then((user) => {
            console.log("User: ", user);
            res.send(user);
        })
        .catch((error) => {
            console.log("ERROR: ", error);
            res.status(500).send(error);
        });
}