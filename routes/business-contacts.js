const { Router } = require('express');
var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');

let BusinessContact = require('../models/contact');


function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/user/login');
    }
    next();
}


/* GET Route for the Business Contact List page - READ Operation */
router.get('/',requireAuth,function(req, res, next) 
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
});


router.get('/add',requireAuth,function(req, res, next) 
{
        res.render('business-contact-views/addcontact', { title: 'Contact Add', user: "Logout" })
});


router.post('/add',requireAuth,function(req, res, next)
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



router.get('/update',requireAuth,function(req, res, next) 
{
        let id = req.query.id;
        console.log(id);
        BusinessContact.findById(id, (err, contactToEdit) => {
            console.log(contactToEdit);
            if(err)
            {
                console.log(err);
                res.end(err);
            }
            else
            {
               
                //show the edit view
                //res.redirect('/business-contacts');
                res.render('business-contact-views/updatecontact', { title: 'Contact Update',user: "Logout", businessContact: contactToEdit })
            }
     });    
 });

router.post('/update',requireAuth,function(req, res, next) 
{
    let id = req.query.id;
    let updatedContact = BusinessContact({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });
    BusinessContact.updateOne({_id: id}, updatedContact, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.redirect('/business-contacts');
            //res.render('business-contact-views/listcontacts', {title: 'Contact Update',user: "Logout" })
        }
});
});

router.get('/delete',requireAuth,function(req, res, next) 
{
    let id = req.query.id;

    BusinessContact.deleteOne({_id: id}, (err) => {
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


module.exports = router;