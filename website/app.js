//API key
const apiKey = '1af6e134f26baab3124b2973eb22411d&units=imperial';
// global variables
const button = document.querySelector('#generate');

// POST data
const postData = async (url = '', data = {}) => {
	const response = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	try {
		const newData = await response.json();
		console.log(newData);
		return newData;
	} catch (error) {
		console.log('error', error);
	}
};

/* Getting data from API */
const getWeather = async (zip) => {
	const response = await fetch(
		`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`
	);
	try {
		const dataTemp = await response.json();
		return dataTemp.main.temp;
	} catch (error) {
		console.log('error', error);
		alert('Please type in valid zipcode');
	}
};

// Getting data from server
const retrieve = async () => {
	const req = await fetch('/all');

	try {
		const data = await req.json();

		// change UI
		document.querySelector('#date').innerHTML = data.date;
		document.querySelector('#temp').innerHTML =
			Math.round(data.temp) + 'degrees';
		document.querySelector('#content').innerHTML = data.content;
	} catch (error) {
		console.log('ERROR', error);
	}
};

//add Event Listner to button
button.addEventListener('click', action);

function action() {
	// get Date
	const date = new Date();
	// get feelings content
	const content = document.querySelector('#feelings').value;
	// get zip code
	const zip = document.querySelector('#zip').value;

	// get temp and POST to server
	getWeather(zip)
		.then((temp) => {
			postData('/all', {
				date: date.toUTCString(),
				temp: temp,
				content: content,
			});
		})
		.then(() => {
			retrieve();
		});
}
