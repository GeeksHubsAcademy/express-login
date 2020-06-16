const express = require('express');
const usersRouter = require('./routes/users');
const cors = require('./middleware/cors')
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRouter);

app.listen(PORT, () => console.log('server running on port ' + PORT))