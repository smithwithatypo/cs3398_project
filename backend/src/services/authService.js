const AuthService = {
  getTestMessage() {
      return "This is a test message from the AuthService";
  },

  checkCredentials(clientData) {
      const valid_login = { email: 'hungry@gmail.com', password: 'test' }

      // console.log("clientdata inside authService:", clientData)    // for debug
      // console.log("valid_login inside authService:", valid_login)  // for debug

      // if matches database, return true
      if (clientData.email === valid_login.email &&
          clientData.password === valid_login.password
      ) {
          return true
      } else {
          return false
      }
  }
};

export { AuthService };




// // backend/src/services/authService.js
// import User from "../../database/models/User.js"; // Adjust path as needed
// import bcrypt from "bcrypt";

// export const AuthService = {
//   async checkCredentials(clientData) {
//     console.log("Client Data Received:", clientData);
    
//     const user = await User.findOne({ email: clientData.email });
//     console.log("User fetched from DB:", user);
    
//     if (!user) {
//       console.log("No user found with email:", clientData.email);
//       return false;
//     }
    
//     console.log("Client Password:", clientData.password);
//     console.log("Stored Hashed Password:", user.password);
    
//     const passwordMatch = await bcrypt.compare(clientData.password, user.password);
//     console.log("Password match result:", passwordMatch);
    
//     return passwordMatch;
//   },

//   getTestMessage() {
//     return "This is a test message from the AuthService";
//   }
// };
