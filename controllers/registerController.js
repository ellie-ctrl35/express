const usersDB = {
    users: require('../data/users.json'),
    setUsers: function(data) {
        this.users = data;
    }
};

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const duplicate = usersDB.users.find(person => person.username === user);
    if (duplicate) return res.sendStatus(409);

    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const newUser = { 
            "username": user,
            "roles":{"User":2001},
            "password": hashedPwd 
        };
        usersDB.setUsers([...usersDB.users, newUser]);

        // Write data to the file synchronously
        fs.writeFileSync(path.join(__dirname, '..', 'data', 'users.json'), JSON.stringify(usersDB.users));

        console.log(usersDB.users);
        res.status(201).json({ 'success': `New User ${user} created` });
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
};

module.exports = { handleNewUser };