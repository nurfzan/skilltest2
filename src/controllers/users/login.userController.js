const { Users} = require("../../models");
const {compareSync} = require("bcrypt")
const { createJWT }= require("../../middleware/jwt")
const service = async (req,res) => {
    try {
        const { email, password } = req.body;
        // find by email
        const user = await Users.findOne({
            where : {
                email,
            }
        })
        if(!user) {
            return res.status(400).json({
                msg: "email or password is incorrect",
            })
        } else {
            // check password
            const isPasswordValid = compareSync(password, user.password);
            if(!isPasswordValid) {
                return res.status(400).json({
                    msg: "email or password is incorrect",
                })
            }
            // create token
            const token = createJWT(user);
            return res.status(200).json({
                msg: "Login successfully",
                data: token,
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:error.toString(),
        })
    }
}

module.exports = { service }