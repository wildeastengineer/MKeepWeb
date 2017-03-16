import express from 'express';
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.set('views', path.join(__dirname, '/templates/'));
app.set('view engine', 'ejs');

app.use((req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
});
