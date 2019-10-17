const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
require('./db')


app.get(
    '/', (req, res) => res.send('Hello!')
)

app.listen(port, () => console.log(`Listening on port: ${port}`))