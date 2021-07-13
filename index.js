const express = require('express');
const app = express();
const inforoute = require('./routes/route');

app.enable('trust proxy');
app.use('/', inforoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening to ${port}...`);
});