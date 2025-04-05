const AuthService = {
    getTestMessage() {
        return "This is a test message from the AuthService";
    },

    checkCredentials(clientData) {
        const valid_login = { email: 'test@gmail.com', password: 'pw' }

        console.log("clientdata inside authService:", clientData)
        console.log("valid_login inside authService:", valid_login)
        
        // if matches database, return successful login
        if (clientData == valid_login) {
            return true
        } else {
            return false
        }
    }
};

export { AuthService };
