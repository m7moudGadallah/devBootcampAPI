const http = require('http');
const { parse } = require('path');

const PORT = 5000;

const server = http.createServer(async (req, res) => {
    const { headers, url, method } = req;
    console.log({ headers, url, method });

    // res.setHeader('X-Powered-By', 'Node.js'); // when we use not standard header we add 'X-' prefix before header name

    // res.setHeader('Content-Type', 'text/plain');
    // res.write('Hello :)');

    // res.setHeader('Content-Type', 'text/html');
    // res.write('<h1> Hello :) </h1>');

    // res.setHeader('Content-Type', 'application/json');

    /* parse data from request body */
    const parseBody = async () => {
        let body = [];

        await req
            .on('data', (chunk) => {
                body.push(chunk);
            })
            .on('end', () => {
                body = Buffer.concat(body);
            });

        return body.toString();
    };

    const body = await parseBody();
    console.log(body);

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
});

server.listen(PORT, () => {
    console.log(`App is running on port ${PORT}🚀...`);
});
