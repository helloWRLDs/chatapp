const mysql = require('mysql')
const bcrypt = require('bcrypt')

isUserExist = (email, connection, callback) => {
    const query = `SELECT * FROM chat_app.users WHERE email=?`
    connection.query(query, [email], (error, result) => {
        if (error) {
            callback(error, null)
        } else {
            if (result.length > 0) {
                callback(null, true)
            } else {
                callback(null, false)
            }
        }
    })
}

getUserByEmail = (id, connection, callback) => {
    const query = `SELECT * FROM chat_app.users WHERE email=?`
    connection.query(query, [id], (error, result) => {
        if (error) {
            callback(error, null)
        }
        if (result.length > 0) {
            const user = result[0]
            callback(null, user)
        } else {
            callback(null, null)
        }
    })
}

getUserById = (id, connection, callback) => {
    const query = 'SELECT * FROM chat_app.users WHERE user_id=?';
    connection.query(query, [id], (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            // Check if there are rows in the result
            if (result.length > 0) {
                // Retrieve the user information from the first row
                const user = result[0];
                callback(null, user);
            } else {
                // No user found with the given id
                callback(null, null);
            }
        }
    });
};

addUser = (req, connection, callback) => {
    isUserExist(req.body.email, connection, (error, result) => {
        if (error) {
            callback(error, null)
        }
        if (result) {
            callback(new Error("User already exist", null))
        } else {
            bcrypt.hash(req.body.password, 10, (error, hashedPassword) => {
                if (error) {
                    callback(error, null)
                } else {
                    const user = {
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        password: hashedPassword
                    }
                    const query = `INSERT INTO chat_app.users(first_name, last_name, email, password) VALUES (?, ?, ?, ?)`
                    connection.query(query, [user.first_name, user.last_name, user.email, user.password], (error, result) => {
                        if (error) {
                            callback(error, null)
                        } else {
                            getUserById(result.insertId, connection, (error, inserted_user) => {
                                if (error) {
                                    callback(error, null)
                                } else {
                                    callback(null, inserted_user)
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

verifyUser = (req, connection, callback) => {
    isUserExist(req.body.email, connection, (error, result) => {
        if (error) {
            callback(error, null)
        } else if (!result) {
            callback(new Error(`User doesn't exist`), null)
        } else {
            getUserByEmail(req.body.email, connection, (error, user) => {
                if (error) {
                    callback(error, null)
                } else if (user) {
                    bcrypt.compare(req.body.password, user.password, (error, isCorrect) => {
                        if (error) {
                            callback(error, null)
                        }
                        if (isCorrect) {
                            callback(null, user)
                        } else {
                            callback(null, null)
                        }
                    })
                }
            })
        }
    })
}

module.exports = {
    addUser,
    verifyUser,
    getUserById
}