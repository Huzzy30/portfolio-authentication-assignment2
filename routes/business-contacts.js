var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');

let BusinessContact = require('../models/contact');

/* GET Route for the Business Contact List page - READ Operation */
router.get('/',function(req, res, next) 
{
    console.log(req.user);
    if(req.user)
    {
        BusinessContact.find((err, contactList) => {
            if(err)
            {
                return console.error(err);
            }
            else
            {
                res.render('business-contact-views/listcontacts', { title: 'Contact List', user: "Logout", ContactList: contactList});
            }
        }).sort({"name":1});
    }
    else
    {
        return res.redirect('/user/login');
    }
});


router.get('/add',function(req, res, next) 
{
        res.render('business-contact-views/addcontact', { title: 'Contact Add', user: "Logout" })
});


router.post('/add',function(req, res, next)
{
    let newContact = BusinessContact({
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });

    BusinessContact.create(newContact, (err, BusinessContact) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the business contact list
            res.redirect('/business-contacts');
        }
    });
});



// router.get('/update',function(req, res, next) 
// {
//     if(req.username != "")
//     {
//         return res.redirect('/user/login');
//     }
//     else
//     {
//         res.render('business-contact-views/updatecontact', { title: 'Contact Update' })
//     }
// });

router.post('/update/:id',function(req, res, next) 
{
    let id = req.params.id;

    BusinessContact.findById(id, (err, contactToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('/business-contacts/edit/:id', {title: 'Contact Update'})
        }
});
});


module.exports = router;