"use strict";
const mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');

if (mongoose.connection.readyState == 0) {

    mongoose.connect('mongodb://localhost:27017/digital');
}

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: String,
    phone: String
}
    , {
        versionKey: false
    });


var contacts = mongoose.model('contacts', contactSchema);

function getAllContacts(cb) {
    contacts.find({}, cb);
}
function createContact(newContact, cb) {
    contacts(newContact).save(cb);
}


module.exports = {
    getAllContacts: getAllContacts,
    createContact: createContact
}



// var config = require('config.json');
// var _ = require('lodash');
// var jwt = require('jsonwebtoken');
// var bcrypt = require('bcryptjs');
// var Q = require('q');
// var mongo = require('mongoskin');
// var db = mongo.db(config.connectionString, { native_parser: true });
// db.bind('contacts');

// var service = {};

// service.getAll = getAll;
// service.create = create;

// module.exports = service;

// function create(contactParam) {
//     var deferred = Q.defer();

//     // validation
//     db.contacts.findOne(
//         { email: contactParam.email },
//         function (err, contact) {
//             if (err) deferred.reject(err.name + ': ' + err.message);

//             if (contact) {
//                 // email already exists
//                 deferred.reject('Email "' + contactParam.email + '" is already taken');

//             } else {

//                 createContact();

//             }
//         });

//     function createContact() {
//         var contact = {'name': contactParam.name,
//                        'email': contactParam.email,
//                        'phone': contactParam.phone 
//                       };

//         db.contacts.insert(
//             contact,
//             function (err, doc) {
//                 if (err) {

//                     deferred.reject(err.name + ': ' + err.message);
//                 }

//                 deferred.resolve(doc);

//             });
//     }

//     return deferred.promise;
// }

// function getAll () {

//     var deferred = Q.defer();

//     db.contacts.find().toArray(function(err, posts){
//         if (err) {

//             deferred.reject(err.name + ': ' + err.message);
//         }

//         deferred.resolve();
//         return posts;
//     });

//     return deferred.promise;

// }