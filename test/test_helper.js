require('../src/db');
const User = require('../src/user');

beforeEach('Remove all User', async () => {
    await User.remove({});
});