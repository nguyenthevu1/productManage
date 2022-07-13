const express = require('express');
const route = require('./routes/index');
const db = require('./config/connectDb');

db.connect();
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

route(app);
app.listen(PORT, () => {
    console.log(`SERVER running at http://localhost:${PORT}`);
});
