const customerList = document.getElementById('customers');

const template =
	'<li><b>User:</b> {{name}} | <b>Avatar: </b>{{avatar}} <span id="extraData" class="showMe"> | <b>Created:</b> {{createdAt}} | <b>ID:</b> {{id}}</span></li>';
const templateFunction = Handlebars.compile(template);

async function getData() {
	try {
		const apiSource = 'https://615485ee2473940017efaed3.mockapi.io/assessment';

		const resp = await fetch(apiSource);
		return await resp.json();
	} catch (error) {
		console.error(error);
	}
}

const apiResult = getData().then(data => {
	const list = data.map(record => record);
	list.forEach(el => {
		const html = templateFunction({
			name: el.name,
			avatar: el.avatar,
			createdAt: el.createdAt,
			id: el.id,
		});
		customerList.insertAdjacentHTML('afterbegin', html);
	});
});
