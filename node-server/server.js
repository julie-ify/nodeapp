const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 5000;
const pool = require('./database/db');

//Middleware
app.use(cors());
app.use(express.json()); // allows me to get the req.body from forms. serves as body parser

// req is information comming from the users browser
// res is the response we send to the user or browser

// get request to get all hard coded users

app.get('/api/users', (req, res) => {
	const users = {
		users: [
			{ name: 'ada', age: 30 },
			{ name: 'ego', age: 20 },
			{ name: 'lilly', age: 10 },
		],
	};

	res.json(users);
});

// get request to get all todos

app.get('/api/todos', async (req, res) => {
	try {
		const todos = await pool.query('SELECT * FROM todos');
		res.json(todos.rows)
	} catch (error) {
		console.log(error.message);
	}
});

// post request to create a new todo

app.post('/api/todos', async (req, res) => {
	try {
		const { description } = req.body;
		const newTodo = await pool.query(
			'INSERT INTO todos (description) VALUES($1) RETURNING *',
			[description]
		);
		res.json(newTodo.rows[0]);
	} catch (error) {
		console.log(error.message);
	}
});

// put request to update a todo

// delete request to delete a todo

app.delete('/api/dotos/:id', (req, res) => {
	
})

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
