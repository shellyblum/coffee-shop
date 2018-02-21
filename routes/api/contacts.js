var express = require('express');
var router = express.Router();
var db = require('db/contact.js');

// routes
router.post('/', createContact);
router.get('/', getContacts);

module.exports = router;

function createContact(req, res) {

    db.createContact(req.body)

        .then(function (data) {

            res.json(data);
            // res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getContacts(req, res) {

    db.getAllContacts()

        .then(function (contacts) {

            if (contacts) {

                res.json(contacts);
                // res.sendStatus(200);

            } else {

                res.sendStatus(404);

            }

        })
        .catch(function (err) {

            res.status(400).send(err);

        });
}