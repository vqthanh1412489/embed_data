const assert = require('assert');
const User = require('../../src/user');

describe('Delete User', () => {
    let idUser;
    let idYamaha;
    beforeEach('Create 2 new User', async () => {
        const thanh = new User({
            name: 'thanh',
            cars: [
                {color: 'red', branch: 'Yamaha'},
                {color: 'blue', branch: 'Honda'}
            ]
        });
        idYamaha = thanh.cars[0]._id;
        idUser = thanh._id;
        await thanh.save();
    });

    it('Can detele a car of a User by idCar', async () => {
        const user = await User.findById(idUser);
        user.cars.remove(idYamaha);
        await user.save();

        const user2 = await User.findById(idUser);
        assert.equal(user2.cars.length, 1);
        assert.equal(user2.cars[0].branch, 'Honda');
    });

    it('Delete car of User with $pull', async () => {
        await User.findByIdAndUpdate(idUser, {
            $pull: {
                cars: {_id: idYamaha}
            }
        });

        const user2 = await User.findById(idUser);
        assert.equal(user2.cars.length, 1);
        assert.equal(user2.cars[0].branch, 'Honda');
    });
});