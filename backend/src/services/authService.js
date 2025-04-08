import User from "../../database/models/User.js";
import bcrypt from 'bcrypt';

export const AuthService = {
    getTestMessage() {
        return "This is a test message from the AuthService";
    },

    async checkCredentials({ email, password }) {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
          return false; // No user exists with that email
        }
    // Compare the provided password with the hashed password in the database.
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
    },
};
export default AuthService;