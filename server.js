const http = require("http");
const fs= require('fs');
const fsp = require('fs').promises
const path = require("path");

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    if(req.url==="/"){
        fsp.readFile( "./index.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
    }
    else if(req.url.match("\.js$")){
        const jsPath= path.join(__dirname,"jsfiles",req.url);
        const fileStrem= fs.createReadStream(jsPath);
        res.writeHead(200,{"content-type":"text/javascript"});
        fileStrem.pipe(res);
    }
    
};
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});