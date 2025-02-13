const express =require('express');
const fs= require('fs');
const path = require('path');
const bodyParser=require('body-parser');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>This is homepage</h1>');
})

app.get('/overview', (req, res) => {
  res.send('<h1>This is overview page</h1>');
})

app.get('/product', (req, res) => {
  res.send('<h1>This is product page</h1>');
})

const checkExist = (req, res, next) => {
  let users = JSON.parse(fs.readFileSync('dev-data/users.json', 'utf-8'));
  let userId = req.params._id || req.body._id;
  let email = req.body.email;

  if (req.method === 'POST') {
    let existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
  } else {
    let user = users.find(user => user._id == userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.user = user;
  }
  next();
}

app.get('/api/v1/users', (req, res) => {
  let users = JSON.parse(fs.readFileSync('dev-data/users.json', 'utf-8'));
  res.status(200).json(users);
})

app.get('/api/v1/users/:_id', checkExist, (req, res) => {
  res.status(200).json(req.user);
})

app.post('/api/v1/users', checkExist, (req, res) => {
  let users = JSON.parse(fs.readFileSync('dev-data/users.json', 'utf-8'));

  let newUser = { _id: users.length + 1, ...req.body };

  users.push(newUser);
  fs.writeFileSync('dev-data/users.json', JSON.stringify(users, null, 2));

  res.status(201).json({ message: 'User created successfully', user: newUser });
})

app.put('/api/v1/users/:_id', checkExist, (req, res) => {
  let users = JSON.parse(fs.readFileSync('dev-data/users.json', 'utf-8'));
  let userIndex = users.findIndex(user => user._id == req.params._id);

  users[userIndex] = { ...users[userIndex], ...req.body };
  fs.writeFileSync('dev-data/users.json', JSON.stringify(users, null, 2));

  res.status(200).json({ message: 'Update successfully', user: users[userIndex] });
})

app.delete('/api/v1/users/:_id', checkExist, (req, res) => {
  let users = JSON.parse(fs.readFileSync('dev-data/users.json', 'utf-8'));
  users = users.filter(user => user._id != req.params._id);

  fs.writeFileSync('dev-data/users.json', JSON.stringify(users, null, 2));

  res.status(200).json({ message: 'Delete successfully' });
})

app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>');
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

//npm install -g nodemon
//npm install express
//npm install nodemon
//npm install body-parser
//npm install -g json-server
// npm run dev
