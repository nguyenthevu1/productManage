const bcrypt = require('bcrypt');
const User = require('../model/User.model');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: 'Email hoac Password khong duoc de trong',
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            const comparePass = await bcrypt.compareSync(
                req.body.password,
                user.password,
            );

            if (!comparePass) {
                res.status(400).json({
                    success: false,
                    message: 'Email hoac Password sai',
                });
            }
            const { password, createdAt, updatedAt, ...info } = user._doc;
            console.log(info);
            const token = await jwt.sign({ ...info }, 'mySecret');
            res.status(200).json({
                success: true,
                token,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Loi dang nhap',
        });
    }
};

exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: 'Email hoac Password khong duoc de trong',
            });
        }
        
        const hasPass = await bcrypt.hashSync(password, 10);

        const user = await User.create({
            email,
            username,
            password: hasPass,
        });

        res.status(201).json({
            success: true,
            user,
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Khon the dang ky',
        });
    }
};
