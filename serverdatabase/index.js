
// express 
const express = require('express');
const app = express();

//jwt
const jwt = require('jsonwebtoken');

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// cors 
const cors = require('cors');
app.use(cors());

//mysql 
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo'
});
connection.connect();

const secret = 'dsoigjnmdsadfjhuxijkgnlmdsafvj iwkejgf sdbiusnjfdjvohudgkjdflsxzjkd';

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT id, username, full_name FROM user WHERE username = ? AND password = ?`;
    connection.query(query, [username, password], (err, results) => {
        if (err) {
            res.status(500).send(
                {
                    success: false,
                    message: err.sqlMessage,
                    data: []
                }
            );
        } else {
            if (results.length > 0) {
                const user = {
                    id: results[0].id,
                    username: results[0].username,
                    full_name: results[0].full_name
                }
                const token = jwt.sign(user, secret, { expiresIn: '72h' });
                res.send(
                    {
                        success: true,
                        message: 'Login Success',
                        data: token
                    }
                );
            } else {
                res.status(404).send(
                    {
                        success: false,
                        message: 'User not found',
                        data: []
                    }
                );
            }
        }
    });
});

app.get('/todos', (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.status(401).send(
            {
                success: false,
                message: 'unauthorized',
                data: []
            }
        );
    } else {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).send(
                    {
                        success: false,
                        message: 'unauthorized',
                        data: []
                    }
                );
            } else {
                const query = `SELECT * FROM list WHERE user_id = ?`;
                connection.query(query, [decoded.id], (err, results) => {
                    if (err) {
                        res.status(500).send(
                            {
                                success: false,
                                message: err.sqlMessage,
                                data: []
                            }
                        );
                    } else {
                        res.send(
                            {
                                success: true,
                                message: 'Todos retrieved',
                                data: results
                            }
                        );
                    }
                });
            }
        });
    }
});

app.post('/add_todo', (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.status(401).send(
            {
                success: false,
                message: 'unauthorized',
                data: []
            }
        );
    }
    else {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).send(
                    {
                        success: false,
                        message: 'unauthorized',
                        data: []
                    }
                );
            } else {
                const task = req.body.task;
                const query = `INSERT INTO list (task, user_id) VALUES (?, ?)`;
                connection.query(query, [task, decoded.id], (err, results) => {
                    if (err) {
                        res.status(500).send(
                            {
                                success: false,
                                message: err.sqlMessage,
                                data: []
                            }
                        );
                    } else {
                        res.send(
                            {
                                success: true,
                                message: 'Todo added',
                                data: results
                            }
                        );
                    }
                });
            }
        });
    }
}
);

app.put('/update_todo/:id', (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.status(401).send(
            {
                success: false,
                message: 'unauthorized',
                data: []
            }
        );
    }
    else {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).send(
                    {
                        success: false,
                        message: 'unauthorized',
                        data: []
                    }
                );
            } else {
                const id = req.params.id;
                const task = req.body.task;
                const query = `UPDATE list SET task = ? WHERE id = ? AND user_id = ?`;
                connection.query(query, [task, id, decoded.id], (err, results) => {
                    if (err) {
                        res.status(500).send(
                            {
                                success: false,
                                message: err.sqlMessage,
                                data: []
                            }
                        );
                    } else {
                        res.send(
                            {
                                success: true,
                                message: 'Todo updated',
                                data: results
                            }
                        );
                    }
                });
            }
        });
    }
});

app.delete('/delete_todo/:id', (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.status(401).send(
            {
                success: false,
                message: 'unauthorized',
                data: []
            }
        );
    }
    else {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).send(
                    {
                        success: false,
                        message: 'unauthorized',
                        data: []
                    }
                );
            } else {
                const id = req.params.id;
                const query = `DELETE FROM list WHERE id = ? AND user_id = ?`;
                connection.query(query, [id, decoded.id], (err, results) => {
                    if (err) {
                        res.status(500).send(
                            {
                                success: false,
                                message: err.sqlMessage,
                                data: []
                            });
                    } else {
                        res.send(
                            {
                                success: true,
                                message: 'Todo deleted',
                                data: results
                            }
                        );
                    }
                });
            }
        });
    }
});

app.put('/change_status/:id', (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.status(401).send(
            {
                success: false,
                message: 'unauthorized',
                data: []
            }
        );
    }
    else {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).send(
                    {
                        success: false,
                        message: 'unauthorized',
                        data: []
                    }
                );
            } else {
                const id = req.params.id;
                const is_done = req.body.is_done;
                const query = `UPDATE list SET is_done = ? WHERE id = ? AND user_id = ?`;
                connection.query(query, [is_done, id, decoded.id], (err, results) => {
                    if (err) {
                        res.status(500).send(
                            {
                                success: false,
                                message: err.sqlMessage,
                                data: []
                            }
                        );
                    } else {
                        res.send(
                            {
                                success: true,
                                message: 'Todo updated',
                                data: results
                            }
                        );
                    }
                });
            }
        });
    }
});


const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});