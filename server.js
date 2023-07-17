const http = require('http');

const PORT = 5000;

const server = http.createServer((req, res) => {
    const { headers, url, method } = req;
    console.log({ headers, url, method });
    res.end();
});

server.listen(PORT, () => {
    console.log(`App is running on port ${PORT}🚀...`);
});
