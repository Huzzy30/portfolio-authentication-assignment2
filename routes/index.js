var express = require('express');
var router = express.Router();


/* GET Home page. */
router.get('/', function(req, res, next) {
    if(req.user)
    {
        res.render('index', { title: 'Home' ,user: 'Logout'});
    }
    else
    {
        res.render('index', { title: 'Home' ,user: ''});
    }

});
/* GET Home page. */
router.get("/home", function(req, res, next) {
    if(req.user)
    {
        res.render('index', { title: 'Home' ,user: 'Logout'});
    }
    else
    {
        res.render('index', { title: 'Home' ,user: ''});
    }
});
/* GET Service page. */
router.get("/services", function(req, res, next) {
    if(req.user)
    {
        res.render('content/services', { title: 'Services' ,user: 'Logout' });
    }
    else
    {
        res.render('content/services', { title: 'Services' ,user: '' });
    }
});
/* GET Project page. */
router.get("/projects", function(req, res, next) {
    if(req.user)
    {
        res.render('content/projects', { title: 'Projects',user: 'Logout' });
    }
    else
    {
        res.render('content/projects', { title: 'Projects',user: '' });
    }
});
/* GET About page. */
router.get("/about", function(req, res, next) {
    if(req.user)
    {
        res.render('content/about', { title: 'About Me' ,user: 'Logout'});
    }
    else
    {
        res.render('content/about', { title: 'About Me' ,user: ''});
    }
});
/* GET Contact page. */
router.get("/contact", function(req, res, next) {
    if(req.user)
    {
        res.render('content/contact', { title: 'Contact Me',user: 'Logout' });
    }
    else
    {
        res.render('content/contact', { title: 'Contact Me',user: '' });
    }
});


module.exports = router;
