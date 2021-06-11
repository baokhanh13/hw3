const catchAsync = require('../middlewares/catchAsync');
const Wallet = require('./wallet.model');


exports.createWallet = catchAsync(async (req, res, next) => {
    const { password } = req.body;
    try {
        const wallet = new Wallet({ password });
        await wallet.save();
    } catch (error) {
        throw(new Error(error))
    }

    res.json({ msg: 'Create wallet succesfully', privateKey: wallet.privateKey });
});


exports.login = catchAsync(async (req, res, next) => {
    const { privateKey, password } = req.body;
    const wallet = await Wallet.findByCredentials(privateKey, password);
    res.json({ msg: 'Login successfully', publicKey: wallet.publicKey });
});
