const { userService } = require("../services");

class UserController {

    static async register(req, res) {
        try {
            const userData = req.body;
            const user = await userService.registerUser(userData);

            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: "User registration failed"
                });
            }

            return res.status(201).json({
                status: true,
                message: "User registered successfully",
                data: user
            });

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    }
}

module.exports = UserController;
