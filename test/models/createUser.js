const assert = require('assert');
const User = require('../../src/user');

describe('Create User', () => {
    let idUser;
    beforeEach('Create a new User', async () => {
        const thanh = new User({
            name: 'thanh',
            cars: [
                { color: 'red', branch: 'Yamaha' },
                { color: 'blue', branch: 'Honda' }
            ]
        });
        idUser = thanh._id;
        await thanh.save();
    });

    xit('Can add more car into a User exists', async () => {
        const user = await User.findById(idUser);
        user.cars.push(
            { color: 'yellow', branch: 'Toyota' },
            { color: 'pink', branch: 'Toyota' },
        );
        await user.save();

        const user2 = await User.findById(idUser);
        assert.equal(user2.cars.length, 4);
        assert.equal(user2.cars[3].color, 'pink');
    });

    it('Can add more car into a User exists with $push', async () => {
        await User.findByIdAndUpdate(idUser, {
            $push: {
                cars: {
                    $each: [ // Dùng $each để thêm được 1 lúc nhiều car vô 1 user
                        // Nếu chỉ dùng $push thì chỉ push đc 1 cái vô thôi.
                        { color: 'yellow', branch: 'Toyota' },
                        { color: 'pink', branch: 'Toyota' }]
                }
            }
        });

        const user2 = await User.findById(idUser);
        assert.equal(user2.cars.length, 4);
        assert.equal(user2.cars[3].color, 'pink');
    });
});