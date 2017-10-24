const assert = require('assert');
const User = require('../../src/user');

describe.only('Delete User', () => {
    let idUser;
    let idYamaha;
    let idHonda;
    beforeEach('Create a User with 2 car', async () => {
        const thanh = new User({
            name: 'thanh',
            cars: [
                {color: 'red', branch: 'Yamaha'},
                {color: 'blue', branch: 'Honda'}
            ]
        });
        idYamaha = thanh.cars[0]._id;
        idHonda = thanh.cars[1]._id;
        idUser = thanh._id;
        await thanh.save();
    });

    // Xóa 1 cái đi coi được không? xóa cái brand: Yamaha

    it('Can detele a car of a User by idCar', async () => {
        // Tim ra cái User của nó
        const user = await User.findById(idUser);
        user.cars.remove(idYamaha);// Xóa cái có id idYamaha.
        await user.save();

        const user2 = await User.findById(idUser);
        assert.equal(user2.cars.length, 1);
        assert.equal(user2.cars[0].branch, 'Honda');
    });

    it('Delete more car of User with $pull', async () => {
        await User.findByIdAndUpdate(idUser, {
            $pull: {
                cars: { 
                    $in: [ // Sử dụng $in để xóa 1 lần nhiều cái nha
                        // Nếu không dùng thì xóa được mỗi cái cuối cùng thôi. mình $pull í
                        {_id: idYamaha},
                        {_id: idHonda}
                    ]
                 }
            }
        });

        const user2 = await User.findById(idUser);
        assert.equal(user2.cars.length, 0);
    });
});