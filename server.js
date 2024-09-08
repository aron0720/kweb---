const express = require('express');
const path = require('path');
const port = 8080;
const app = express();
const bcrypt = require('bcrypt');
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

const filePath = path.join(__dirname, './public/src/info/info.json');

app.post('/sign_up', async (req, res) => {
    try {
        const { id, password, name, number, student } = req.body;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = {
            id,
            password: hashedPassword,
            name,
            number,
            student,
            g: [],
        };

        fs.readFile(filePath, 'utf8', (err, data) => {
            let users;

            if (err) {
                if (err.code === 'ENOENT') {
                    users = [];
                } else {
                    return res.status(500).json({ error: 'Failed to read user data' });
                }
            } else {
                try {
                    users = JSON.parse(data);
                } catch (parseError) {
                    return res.status(500).json({ error: 'Failed to parse user data' });
                }
            }

            const userExists = users.some(user => user.id === id);
            if (userExists) {
                return res.status(400).json({ error: 'User already exists' });
            }

            users.push(newUser);

            fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf8', (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to save user data' });
                }

                if (!student) {
                    const folderPath = path.join(__dirname, 'public/src/info', id);
                    const filePath = path.join(folderPath, 'g.json');

                    fs.mkdir(folderPath, { recursive: true }, (err) => {
                        if (err) {
                            console.error('Error creating folder:', err);
                            return res.status(500).json({ error: 'Failed to create folder' });
                        }

                        fs.writeFile(filePath, JSON.stringify(newUser.g, null, 2), 'utf8', (err) => {
                            if (err) {
                                console.error('Error creating file:', err);
                                return res.status(500).json({ error: 'Failed to create file' });
                            }

                            console.log('Folder and file created successfully');
                            res.json({ message: 'User signed up successfully' });
                        });
                    });
                } else {
                    const folderPath = path.join(__dirname, 'public/src/info', id);
                    const filePath = path.join(folderPath, 'g.json');

                    fs.mkdir(folderPath, { recursive: true }, (err) => {
                        if (err) {
                            console.error('Error creating folder:', err);
                            return res.status(500).json({ error: 'Failed to create folder' });
                        }

                        fs.writeFile(filePath, JSON.stringify(newUser.g, null, 2), 'utf8', (err) => {
                            if (err) {
                                console.error('Error creating file:', err);
                                return res.status(500).json({ error: 'Failed to create file' });
                            }

                            console.log('Folder and file created successfully');
                            res.json({ message: 'User signed up successfully' });
                        });
                    });
                }
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process request' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const id = req.body.id;
        const password = req.body.password;

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to read user data' });
            }

            const users = JSON.parse(data);

            const user = users.find(user => user.id === id);

            if (!user) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ error: 'Error checking password' });
                }

                if (!isMatch) {
                    return res.status(400).json({ error: 'Invalid credentials' });
                }

                res.json({ message: 'Login successful', user: { id: user.id, name: user.name, student: user.student } });
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'failed' });
    }
});

app.post('/pro', async (req, res) => {
    try {
        const id = req.body.username;

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to read user data' });
            }

            const users = JSON.parse(data);

            const user = users.find(user => user.id === id);


            res.json({ message: 'Login successful', user: { id: user.id, name: user.name, student: user.student, g: user.g } });
        });
    } catch (error) {
        res.status(500).json({ error: 'failed' });
    }
});

app.post('/stu', async (req, res) => {
    try {
        const id = req.body.id;

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to read user data' });
            }

            const users = JSON.parse(data);
            let garray = [];

            users.forEach(element => {
                if (element.student === false) {
                    garray.push(element.id);
                }
            });

            res.json({ message: 'Login successful', list: garray});
        });
    } catch (error) {
        res.status(500).json({ error: 'failed' });
    }
});

app.post('/stun', async (req, res) => {
    try {
        const id = req.body.id;
        const id2 = req.body.id2;

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to read user data' });
            }

            const users = JSON.parse(data);

            const user = users.find(user => user.id === id2);

            let garray = user.g;
            

            res.json({ message: 'Login successful', list: garray});
        });
    } catch (error) {
        res.status(500).json({ error: 'failed' });
    }
});

app.post('/stuu', async (req, res) => {
    try {
        const id = req.body.id;

        const Path = path.join(__dirname, 'public/src/info', id, 'g.json');

        fs.readFile(Path, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to read user data' });
            }

            const users = JSON.parse(data);
            let garray = [];

            users.forEach(element => {
                let array = element.inside + '-' + element.pro;
                garray.push(array);
            });

            

            res.json({ message: 'Login successful', list: garray});
        });
    } catch (error) {
        res.status(500).json({ error: 'failed' });
    }
});

app.post('/stuuu', async (req, res) => {
    try {
        const pro = req.body.pro;
        const inside = req.body.inside;

        const Path = path.join(__dirname, 'public/src/info', pro, 'g.json');

        fs.readFile(Path, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to read user data' });
            }

            const users = JSON.parse(data);
            let garray = [];

            users.forEach(element => {
                let array = element.inside;
                garray = garray.concat(array);
            });

            res.json({ message: 'Login successful', list: garray});
        });
    } catch (error) {
        res.status(500).json({ error: 'failed' });
    }
});

app.post('/stuuuu', async (req, res) => {
    try {
        const pro = req.body.pro;
        const inside = req.body.inside;
        const title = req.body.title;

        const Path = path.join(__dirname, 'public/src/info', pro, 'g.json');

        fs.readFile(Path, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to read user data' });
            }

            const users = JSON.parse(data);
            const user = users.find(user => user.title === title);
            let i = 0;
            while (user.inside[i] !== inside) {
                i++;
            }

            let b = user.insideText[i];
            res.json({ text: b });
        });
    } catch (error) {
        res.status(500).json({ error: 'failed' });
    }
});

app.post('/stunn', async (req, res) => {
    try {
        const id = req.body.id;
        const id2 = req.body.id2;
        const title = req.body.title;

        const Path = path.join(__dirname, 'public/src/info', id, 'g.json');

        fs.readFile(Path, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to read user data' });
            }

            const users = JSON.parse(data);

            const user = users.find(user => user.inside === title);
            if (user) {
                return res.json({message: 'already'});
            }
            else {
                const newg = {
                    title: id,
                    inside: title,
                    pro: id2,
                }

                users.push(newg);

                fs.writeFile(Path, JSON.stringify(users, null, 2), 'utf8', (err) => {
                    if (err) {
                        return res.status(500).json({ error: 'Failed to save user data' });
                    }
                });

                res.json({ message: 'done'});
            }
   
        });
    } catch (error) {
        res.status(500).json({ error: 'failed' });
    }
});

app.post('/pron', async (req, res) => {
    try {
        const id = req.body.username;
        const text = req.body.n;

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to read user data' });
            }

            const users = JSON.parse(data);

            const user = users.find(user => user.id === id);
            user.g.push(text);

            const path = './public/src/info/' + id +'/g.json';

            fs.readFile(path, 'utf-8', (err, data) => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to read user data' });
                }
                const g = JSON.parse(data);

                const newg = {
                    title: id,
                    inside: [],
                    insideText: [],
                };

                g.push(newg);

                fs.writeFile(path, JSON.stringify(g, null, 2), 'utf8', (writeError) => {
                    if (writeError) {
                        return res.status(500).json({ error: 'Failed to save user data' });
                    }
                });
                
            })

            fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf8', (writeError) => {
                if (writeError) {
                    return res.status(500).json({ error: 'Failed to save user data' });
                }

                res.json({
                    message: 'Login successful',
                    user: { id: user.id, name: user.name, student: user.student, g: user.g }
                });
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'failed' });
    }
});

app.post('/pronn', async (req, res) => {
    try {
        const title = req.body.gname;
        const id = req.body.id;

        const Path = path.join(__dirname, 'public/src/info', id, 'g.json');

        fs.readFile(Path, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to read user data' });
            }

            const gs = JSON.parse(data);

            const g = gs.find(g => g.title === title);


            res.json({ message: 'Login successful', g: { gtitle: g.title, ginside: g.inside, ginsideText: g.insideText } });
        });
    } catch (error) {
        res.status(500).json({ error: 'failed' });
    }
});

app.post('/pronnn', async (req, res) => {
    try {
        const title = req.body.gname;
        const id = req.body.id;
        const inside = req.body.inside;
        const insideText = req.body.insideText;

        const Path = path.join(__dirname, 'public/src/info', id, 'g.json');

        fs.readFile(Path, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to read user data' });
            }

            const gs = JSON.parse(data);

            const g = gs.find(g => g.title === title);

            g.inside.push(inside);
            g.insideText.push(insideText);

            fs.writeFile(Path, JSON.stringify(gs, null, 2), 'utf8', (writeError) => {
                if (writeError) {
                    return res.status(500).json({ error: 'Failed to save user data' });
                }

                res.json({
                    message: 'Login successful'

                });
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'failed' });
    }
});

app.post('/pronnnn', async (req, res) => {
    try {
        const id = req.body.id;
        const inside = req.body.inside;
        const title = req.body.title;

        const Path = path.join(__dirname, 'public/src/info', id, 'g.json');

        fs.readFile(Path, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to read user data' });
            }

            const gs = JSON.parse(data);
            
            const g = gs.find(g => g.title === title);

            let i = 0;
            while (inside !== g.inside[i]) {
                i++;
            }
            res.json({ g: {ginsideText: g.insideText[i]} });
        });
    } catch (error) {
        res.status(500).json({ error: 'failed' });
    }
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
