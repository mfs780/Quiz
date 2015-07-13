// app/routes.js

// grab the nerd model we just created
var Quiz = require('./models/quiz');
var Answer = require('./models/answer');

module.exports = function(app, passport) {

    // server routes ===========================================================

    // Quiz API
    // Quiz Get All
    app.get('/api/quiz', function(req, res) {
        // use mongoose to get all quizzes in the database
        Quiz.find(function(err, quizzes) {
            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.send('fail');
            console.log('Success Get');
            res.json(quizzes); // return all nerds in JSON format
        });
    });
    // Quiz Get by ID
    app.get('/api/quiz/:id', function(req, res) {
        if (req.params && req.params.id) {
            console.log('get One');
            Quiz.findById(req.params.id, function(err, quiz) {
                if (err) throw err;
                res.json(quiz);
            });
        }
    });
    // Quiz Create
    app.post('/api/quiz', function(req, res) {
        var quiz = new Quiz({
            quiz: req.body.quiz
        })
        quiz.save(function(err) {
            if (err) throw err;
            console.log('Quiz saved successfully!');
        })
        res.json(quiz);
    });
    // Quiz Update
    app.put('/api/quiz', function(req, res) {
        console.log('heh', req.body._id);

        Quiz.findById(req.body._id, function(err, quiz) {
            if (err) throw err;
            console.log(quiz);
            quiz.quiz = req.body.quiz;
            quiz.save(function(err) {
                if (err) throw err;
                console.log('Quiz update successfully!');
            })
        });
    });

    // Answer API
    // Answer Get By UserName
    app.get('/api/answer', function(req, res){

    });

    // Answer Create
    app.post('/api/answer', function(req, res){
        console.log(req.body.answer);
        var answer = new Answer({
            answer: req.body.answer,
            user: req.body.user,
        });
        res.json(answer);
    })

    // Login API
    app.get('/api/login', isLoggedIn, function(req, res) {
        res.json(req.user);
    })

    // Logout API
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    })

    // locally --------------------------------
    // LOGIN ===============================
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // SIGNUP =================================
    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // google ---------------------------------

    // send to google to do the authentication
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/home',
        failureRedirect: '/'
    }));

    // =============================================================================
    // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
    // =============================================================================

    // locally --------------------------------
    app.get('/connect/local', function(req, res) {
        res.render('connect-local.ejs', {
            message: req.flash('loginMessage')
        });
    });
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // google ---------------------------------

    // send to google to do the authentication
    app.get('/connect/google', passport.authorize('google', {
        scope: ['profile', 'email']
    }));

    // the callback after google has authorized the user
    app.get('/connect/google/callback', passport.authorize('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));


    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
