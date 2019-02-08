const server = require('./server.js');

server.startBlogWatcher();
server.establishRoutes();
server.start(3000);