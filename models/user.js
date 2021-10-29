/*******************************************************************************************************
*                                                                                                      *
*           File name     :  user.js                                                               *
*           Student name :  Huzaifah Mahifa                                                           *
*           StudentID     :  300747824                                                                 *
*           Date  :  10/26/2021                                                                         *
*                                                                                                      *
********************************************************************************************************/



// require modules for the User Model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');


let User = mongoose.Schema
(
    {
        username: 
        {
            type: String,
            default: '',
            trim: true,
            required: 'username is required'
        },
        password:
        {
            type: String,
            default: '',
            trim: true,
            required: 'password is required'   
        },
       email:
       {
           type: String,
           default: '',
           trim: true,
           required: 'email address is required'
       }
    },
    {
        collection: "users"
    }
);

// configure options for User Model
let options = ({missingPasswordErr: 'Wrong / Missing Password'});
User.plugin(passportLocalMongoose, options);
module.exports.User = mongoose.model('User', User);