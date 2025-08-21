require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS;

<<<<<<< Updated upstream
app.get('/', async (req, res) => {
	const pets = 'https://app.hubspot.com/contacts/146761057/objects/2-146203150/views/all/list';
=======
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
	const pets = 'https://api.hubspot.com/crm/v3/objects/2-146203150?properties=birthday,name,type_of_pet';
>>>>>>> Stashed changes
	const headers = {
		Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
		'Content-Type': 'application/json'
	}
	try {
		const response = await axios.get(pets, { headers });
<<<<<<< Updated upstream
		res.json(response.data.results);
=======
		const data = response.data.results;
		// res.json(data) // raw data;
		res.render('homepage', { title: 'Pets | HubSpot APIs', data }); 
>>>>>>> Stashed changes
	} catch (error) {
		console.error(error);
	}
})

app.get('/update-cobj', async (req, res) => {
	const id = req.query.id;
	const getPet = `https://api.hubapi.com/crm/v3/objects/2-146203150/${id}?properties=birthday,name,type_of_pet`;
	const headers = {
		Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
		'Content-Type': 'application/json'
	};

	try {
		const response = await axios.get(getPet, { headers });
		const data = response.data;

		// res.json(data);
		res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum.', birthday: data.properties.birthday, name: data.properties.name, type_of_pet: data.properties.type_of_pet, id: id});
		
	} catch(err) {
		console.error(err);
	}
})

app.post('/update-cobj', async (req, res) => {
	// console.log(req);
	const update = {
		properties: {
			"name": req.body.name,
			"type_of_pet": req.body.type_of_pet,
			"birthday": req.body.birthday
		}
	}

	const id = req.body.id;
	const updatePet = `https://api.hubapi.com/crm/v3/objects/2-146203150/${id}?properties=birthday,name,type_of_pet`;
	const headers = {
		Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
		'Content-Type': 'application/json'
	};

	try {
		await axios.patch(updatePet, update, { headers } );
		res.redirect('/');
	} catch(err) {
		console.error(err);
	}
});

app.get('/add-cobj', async (req, res) => {
	res.render('add', { title: 'Add Custom Object Form | Integrating With HubSpot I Practicum.'});
})

app.post('/add-cobj', async (req, res) => {;
	const newPet = {
		properties: {
			"name": req.body.name,
			"type_of_pet": req.body.type_of_pet,
			"birthday": req.body.birthday
		}
	}

	const id = req.body.id;
	const addPet = `https://api.hubapi.com/crm/v3/objects/2-146203150`;
	const headers = {
		Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
		'Content-Type': 'application/json'
	};

	try {
		await axios.post(addPet, newPet, { headers } );
		res.redirect('/');
	} catch(err) {
		console.error(err);
	}
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));