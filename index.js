'use strict';

//Imports dependencies and set up http server
const
	express = require('express'),
	bodyParser = require('body-parser'),
	app = express().use(bodyParser.json()); //creates express http server

// sets server port and logs message on success

	app.listen(process.env.PORT || 8080, () => console.log('webhook is listening'));

app.post('/webhook', (req, res) => {
	let body = req.body;

	if (body.object === 'page') {
		body.entry.forEach(function(entry) {

		let webhook_event = entry.messaging[0];
		console.log(webhook_event);
	});

	res.status(200).send('EVENT_RECEIVED');
}
else
{
	res.sendStatus(404);
}
});


app.get('/webhook', (req, res) => {

	let VERIFY_TOKEN = "EAAlXmQdBY2wBAEj1z4MTOQbA53drsSNnwZBUK6lOqp72Ge2JqIQP64tGAsHRpxwYMiZCIXjs9c8QhFV5cupYUtmCxYPO87lQ1F9tSbIojccBj6rYa3ZBRIweZAoRZBvUlMZBB2xnswSD6yW5eQWWDO451sFMnc5xWENdSDOkTt2wZDZD"

	let mode = req.query['hub.mode'];
	let token = req.query['hub.verify_token'];
	let challenge = req.query['hub.challenge'];

	if (mode && token) {
	
		if (mode === 'subscribe' && token === VERIFY_TOKEN) {

		console.log('WEBHOOK_VERIFIED');
		res.status(200).send(challenge);
	} else {
	res.sendStatus(403);
	}
}
});
