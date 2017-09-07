Date.prototype.today = function () {
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}

Date.prototype.timeNow = function () {
    return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

module.exports = function(app, passport) {

    app.get('/', inSession, function(req, res) {
        res.redirect('/login');
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });

    app.get('/logout', function(req, res) {
        if(req.user) {
            var user = req.user;
            var datetime = "Logged-Out on: " + new Date().today() + " @ " + new Date().timeNow();
            user.local.loginHistory.push(datetime);
            user.save(function(err) {});
        }
        req.logout();
        res.redirect('/login');
    });


    app.get('/login', inSession, function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true
    }));


    app.get('/signup', inSession, function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true
    }));

    app.get('/remove', function(req, res) {
        if(req.user) {
            var user = req.user;
            user.local.email = undefined;
            user.local.password = undefined;
            user.local.loginHistory = undefined;
            user.local.actions = undefined;
            user.save(function(err) {
                res.redirect('/logout');
            });
        } else {
            res.redirect('/login');
        }
    });

    app.post('/logAction', function(req, res) {
        if(req.user) {
            var user = req.user;
            if (req.body) {
                user.local.actions.push(logActions(req.body));
            }
            user.save();
        }
        res.status(200).send();
    });

};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}

function inSession(req, res, next) {
    if (req.user) {
        res.redirect('/profile');
    } else {
        return next();
    }
}

function logActions(action) {
    var datetime = new Date().today() + " @ " + new Date().timeNow() + "<br>";
    switch (action["type"]) {
        case "question_click":
            return datetime + "Clicked on question: <a href=\"" + action["content"] + "\" target=\"_blank\">" +  action["content"] + "</a>";
        case "tag_click":
            return datetime + "Clicked on tag: <a href=\"" + action["content"] + "\" target=\"_blank\">" +  action["content"] + "</a>";
        case "star":
            return datetime + "Starred question: <a href=\"" + action["content"] + "\" target=\"_blank\">" +  action["content"] + "</a>";
        case "unstar":
            return datetime + "Un-starred question: <a href=\"" + action["content"] + "\" target=\"_blank\">" +  action["content"] + "</a>";
        case "share_question":
            return datetime + "Shared question: <a href=\"" + action["content"] + "\" target=\"_blank\">" +  action["content"] + "</a>";
        case "share_answer":
            return datetime + "Shared answer: <a href=\"" + action["content"] + "\" target=\"_blank\">" +  action["content"] + "</a>";
        case "upvote_on_question":
            return datetime + "Upvoted question: <a href=\"" + action["content"] + "\" target=\"_blank\">" +  action["content"] + "</a>";
        case "upvote_off_question":
            return datetime + "Un-voted question: <a href=\"" + action["content"] + "\" target=\"_blank\">" +  action["content"] + "</a>";
        case "upvote_on_answer":
            return datetime + "Upvoted answer: <a href=\"" + action["content"] + "\" target=\"_blank\">" +  action["content"] + "</a>";
        case "upvote_off_answer":
            return datetime + "Un-voted answer: <a href=\"" + action["content"] + "\" target=\"_blank\">" +  action["content"] + "</a>";
        case "downvote_on_question":
            return datetime + "Downvoted question: <a href=\"" + action["content"] + "\" target=\"_blank\">" +  action["content"] + "</a>";
        case "downvote_off_question":
            return datetime + "Un-voted question: <a href=\"" + action["content"] + "\" target=\"_blank\">" +  action["content"] + "</a>";
        case "downvote_on_answer":
            return datetime + "Downvoted answer: <a href=\"" + action["content"] + "\" target=\"_blank\">" +  action["content"] + "</a>";
        case "downvote_off_answer":
            return datetime + "Un-voted answer: <a href=\"" + action["content"] + "\" target=\"_blank\">" +  action["content"] + "</a>";
        case "scroll":
            return datetime + "Scrolled on: <a href=\"" + action["content"] + "\" target=\"_blank\">" +  action["content"] + "</a>";
    }
}
