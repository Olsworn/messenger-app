const http = require('http');
const app = require('./app');
const { initSocket } = require('./app/socket');

const port = 8000;

const httpInstance = http.createServer(app);

initSocket(httpInstance);

httpInstance.listen(port, () => {
    console.log(`Server started on port ${port}`);
})