/**
 * HTTP methods
 * https://nodejs.org/docs/latest-v12.x/api/http.html * 
 * response.end();// This method signals to the server that all of the response headers and body have been sent; that server should consider this message complete. The method, response.end(), MUST be called on each response.
 */
function httpGet(request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    response.write('http GET message\n');
    response.end('End of http GET\n');
}
function httpPost(request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    response.write('POST message\n');
    response.end('End of http POST\n');
}
function httpPut(request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    response.write('PUT message\n');
    response.end('End of http PUT\n');
}
function httpDelete(request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    response.write('DELETE message\n');
    response.end('End of http DELETE\n');
}
exports.http_methods = function (request, response) {
    if (request.method === 'GET') {
        httpGet(request, response);
    }
    if (request.method === 'POST') {
        httpPost(request, response);
    }
    if (request.method === 'PUT') {
        httpPut(request, response);
    }
    if (request.method === 'DELETE') {
        httpDelete(request, response);
    }
}