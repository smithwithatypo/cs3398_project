// backend/src/services/authService.js
import User from "../../database/models/User.js"; // Adjust path as needed
import bcrypt from "bcrypt";

export const AuthService = {
  async checkCredentials(clientData) {
    console.log("Client Data Received:", clientData);
    
    const user = await User.findOne({ email: clientData.email });
    console.log("User fetched from DB:", user);
    
    if (!user) {
      console.log("No user found with email:", clientData.email);
      return false;
    }
    
    console.log("Client Password:", clientData.password);
    console.log("Stored Hashed Password:", user.password);
    
    const passwordMatch = await bcrypt.compare(clientData.password, user.password);
    console.log("Password match result:", passwordMatch);
    
    return passwordMatch;
  },

  getTestMessage() {
    return "This is a test message from the AuthService";
  }
};
