const { userSchema } = require("../models");

class UserService {

    static async registerUser(userData) {
        try {
            return await userSchema.create(userData);
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = UserService;
