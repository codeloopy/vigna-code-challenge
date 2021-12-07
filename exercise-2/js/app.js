const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTasksHolder = document.getElementById('incomplete-tasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskString) {
	const listItem = document.createElement('li');
	const checkBox = document.createElement('input');
	const label = document.createElement('label');
	const editInput = document.createElement('input');
	const editButton = document.createElement('button');
	const deleteButton = document.createElement('button');

	checkBox.type = 'checkbox';
	editInput.type = 'text';
	editButton.innerText = 'Edit';
	editButton.className = 'edit';
	deleteButton.innerText = 'Delete';
	deleteButton.className = 'delete';
	label.innerText = taskString;

	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	return listItem;
};

const addTask = function () {
	// const listItemName = taskInput.value || 'New Todo';
	const listItemName = taskInput.value;
	if (!listItemName) {
		alert('A valid todo must be present, try again!'); //turn into a modal
	} else {
		listItem = createNewTaskElement(listItemName);
		incompleteTasksHolder.appendChild(listItem);
		bindTaskEvents(listItem, taskCompleted);
		taskInput.value = '';
	}
};

const editTask = function () {
	const listItem = this.parentNode;
	const editInput = listItem.querySelectorAll('input[type=text')[0];
	const label = listItem.querySelector('label');
	const button = listItem.getElementsByTagName('button')[0];

	const containsClass = listItem.classList.contains('editMode');
	if (containsClass) {
		label.innerText = editInput.value;
		button.innerText = 'Edit';
	} else {
		editInput.value = label.innerText;
		button.innerText = 'Save';
	}

	listItem.classList.toggle('editMode');
};

const deleteTask = function () {
	const listItem = this.parentNode;
	const ul = listItem.parentNode;
	ul.removeChild(listItem);
};

const taskCompleted = function () {
	const listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
	const listItem = this.parentNode;
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
};

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
	const checkBox = taskListItem.querySelectorAll('input[type=checkbox]')[0];
	const editButton = taskListItem.querySelectorAll('button.edit')[0];
	const deleteButton = taskListItem.querySelectorAll('button.delete')[0];
	editButton.onclick = editTask;
	deleteButton.onclick = deleteTask;
	checkBox.onchange = checkBoxEventHandler;
};

addButton.addEventListener('click', addTask);

for (const i = 0; i < incompleteTasksHolder.children.length; i++) {
	bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for (const i = 0; i < completedTasksHolder.children.length; i++) {
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
