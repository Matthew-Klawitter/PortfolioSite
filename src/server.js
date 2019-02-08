const fs = require('fs');
const chokidar = require('chokidar');
const express = require('express');
const app = express();
const blogsPath = __dirname + '/posts';
// If true: makes logging highly verbose
const env_testing = true;

// list containing all markdown files in blogsPath
var postlist;

/* Set up node routes */
function establishRoutes() {
    /* Web routes */
    app.get('/', (req, res) => res.sendFile(__dirname + '/html/index.html'));
    app.get('/blog', (req, res) => res.sendFile(__dirname + '/html/blog.html'));
    app.get('/projects', (req, res) => res.sendFile(__dirname + '/html/projects.html'));
    app.get('/media', (req, res) => res.sendFile(__dirname + '/html/media.html'));
    app.get('/comic', (req, res) => res.sendFile(__dirname + '/html/comic.html'));
    app.get('/about', (req, res) => res.sendFile(__dirname + '/html/about.html'));
    app.get('/blog/post', (req, res) => res.sendFile(__dirname + '/html/blogpost.html'));

    /* Data routes */
    app.get('/blog/list', (req, res) => res.send(postlist));
    app.get('/blog/file', function(req, res) {
        fs.readFile(blogsPath + '/' + req.query.id, 'utf8', function read(err, data) {
            if (err) {
                console.warn(err);
            }
            else {
                // sends the requested markdown file data
                res.send(data);
            }
        })
    });

    /* Style Sheets */
    app.get('/css/:id', (req, res) => res.sendFile(__dirname + '/css/' + req.params.id));
}

/* Dynamically updates available blogposts */
function startBlogWatcher() {
    var watcher = chokidar.watch(blogsPath, {
        ignored: /[\/\\]\./,
        persistent: true
    });

    // Listener for posts added to dir blogsPath
    watcher.on('add', function (path) {
        if (env_testing) {
            console.log(`File ${path} has been added to post list`);
        }
        
        postlist = fs.readdirSync(blogsPath);
    });
}

/* Starts the node */
function start(port) {
    app.listen(port, () => console.log(`App is now listening on port ${port}!`));
}

module.exports = {
    establishRoutes,
    start,
    startBlogWatcher
};