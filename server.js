const http = require('http');

const PORT = 5000;

const server = http.createServer((req, res) => {
    const { headers, url, method } = req;
    console.log({ headers, url, method });

    // res.setHeader('X-Powered-By', 'Node.js'); // when we use not standard header we add 'X-' prefix before header name

    // res.setHeader('Content-Type', 'text/plain');
    // res.write('Hello :)');

    // res.setHeader('Content-Type', 'text/html');
    // res.write('<h1> Hello :) </h1>');

    // res.setHeader('Content-Type', 'application/json');

    res.writeHead(200, {
        'Content-Type': 'application/json',
        'X-Powered-By': 'Node.js',
    });
    
    res.end(
        JSON.stringify({
            success: true,
            data: 'hello :)',
        })
    );

    res.end();
});

server.listen(PORT, () => {
    console.log(`App is running on port ${PORT}🚀...`);
});
