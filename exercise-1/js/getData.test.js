const { TestWatcher } = require('@jest/core');
const getData = require('./getData');

test('api to return an object', async () => {
	expect(getData()).toBe(typeof object);
});
