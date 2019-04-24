// server.js
// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
// app.use("/profiles", express.static("/mnt/mfs/profiles"));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Access the parse results as request.body
app.post('/', function(req, res){
    console.log(req.body.newPost);
    const fs = require('fs');
    var rawdata = fs.readFileSync('/mnt/mfs/profiles/jack.json');  
    var profile = JSON.parse(rawdata);
    profile.posts.push( {postID: profile.posts.length, content: req.body.newPost} );
    console.log(profile);
    fs.writeFile('/mnt/mfs/profiles/jack.json', JSON.stringify(profile), function(err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("The file was saved!");
    });
    res.redirect('back');
});

app.get('/', function(req, res) {
    const fs = require('fs');
    var rawdata = fs.readFileSync('/mnt/mfs/profiles/jack.json');  
    var profile = JSON.parse(rawdata);  
    // console.log(test);
    res.render('pages/index', { profile : profile });
});

app.get('/keenan', function(req, res) {
    const fs = require('fs');
    var rawdata = fs.readFileSync('/mnt/mfs/profiles/keenan.json');  
    var profile = JSON.parse(rawdata);  
    // console.log(test);
    res.render('pages/keenan', { profile : profile });
});

app.listen(8080);
console.log('8080 is the magic port');