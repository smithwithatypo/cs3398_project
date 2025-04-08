const AuthService = {
    getTestMessage() {
        return "This is a test message from the AuthService";
    },

    checkCredentials(clientData) {
        const valid_login = { email: 'test@gmail.com', password: 'pw' }

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
