const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { helper: responseHelper } = require('express-response-helper');
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');

const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));

app.use(responseHelper());

app.get('/', (req, res) => res.respond({ message: 'Hello world!' }, 200));

authRoutes(app);
userRoutes(app);

app.get('/*', (req, res) => res.failNotFound(`Route ${req.url} not found`));

// eslint-disable-next-line no-console
app.listen(port, () => console.log('🚀 server run at port 3000'));
