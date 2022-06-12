const { Users } = require("../../models");
const { body } = require('express-validator');
const service = async (req,res) => {
    try {
            const payload = req.body;
            const requestDB = await Users.create(payload);
            console.log(requestDB);
            return res.json({
                message: "User created successfully",
                data: requestDB,
                
            });
            
        
       
    } catch (error) {
        return res.status(500).json({
            msg: error.toString(),
        })
    }
}

const validation = [
    body('name').not().isEmpty().withMessage('Name cannot be empty'),
    body('address').not().isEmpty().withMessage('Address cannot be empty'),
    body('phone').not().isEmpty().withMessage('Phone cannot be empty').custom(async(value) =>{
        const requestDB = await Users.findOne({
            where: {
                phone: value
            }
        });
        if (requestDB) {
            throw new Error('Phone already exists');
        }
    }),
    body('phone').isLength({ min: 10, max: 13 }).withMessage('Phone must be 10-13 digits'),
    body('email').not().isEmpty().withMessage('Email cannot be empty').isEmail().withMessage('Email must be valid').custom(async(value)=> {
        const requestDB = await Users.findOne({
            where: {
                email: value
            }
        })
        if (requestDB) {
            throw new Error('Email already exists');
        }
    }),
    body('password').not().isEmpty().withMessage('Password cannot be empty'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),

    
    body('gender').not().isEmpty().withMessage('Gender cannot be empty'),
    

]

module.exports = { service, validation }