const extraData = document.querySelectorAll('#extraData');

const toggleInfo = function () {
	extraData.forEach(item => item.classList.toggle('hideMe'));
};
