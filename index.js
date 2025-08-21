require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS;

app.get('/', async (req, res) => {
	const pets = 'https://app.hubspot.com/contacts/146761057/objects/2-146203150/views/all/list';
	const headers = {
		Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
		'Content-Type': 'application/json'
	}
	try {
		const response = await axios.get(pets, { headers });
		res.json(response.data.results);
	} catch (error) {
		console.error(error);
	}
})

app.listen(3000, () => console.log('Listening on http://localhost:3000'));