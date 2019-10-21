const express = require('express');
const app = express();
const usersCtrl = require('./usersCtrl');

const serverPort = 3000;

app.listen(serverPort, () => {
    console.log('listening on port: ', serverPort)
});

app.use(express.json());

app.get('/api/user/:userId', usersCtrl.getUserById);
app.put('/api/user/:userId', usersCtrl.updateUserById);
app.delete('/api/user/:userId', usersCtrl.deleteById);
app.post('/api/user', usersCtrl.addNewUser);
app.get('/api/admin', usersCtrl.getAdmin);
app.get('/api/nonadmin', usersCtrl.getNonadmin);
app.get('/api/type/:userType', usersCtrl.getUsersByType);
app.get('/api/user', usersCtrl.getUsers);
