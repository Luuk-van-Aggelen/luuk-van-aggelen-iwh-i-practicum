require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS;

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

app.get('/', async (req, res) => {
	const pets = 'https://api.hubspot.com/crm/v3/objects/2-146203150?properties=birthday,name,hubspot_owner_id,type_of_pet';
	const headers = {
		Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
		'Content-Type': 'application/json'
	}
	try {
		const response = await axios.get(pets, { headers });
		const data = response.data.results;
		// res.json(data) // raw data;
		res.render('pets', { title: 'Pets | HubSpot APIs', data }); 
	} catch (error) {
		console.error(error);
	}
})

app.listen(3000, () => console.log('Listening on http://localhost:3000'));