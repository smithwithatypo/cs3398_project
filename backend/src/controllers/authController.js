import { AuthService } from '../services/authService.js';

const AuthController = {
    getTest(req, res) {
        try {
            const message = AuthService.getTestMessage();
            res.status(200).json({ success: true, message });
        } catch (error) {
            console.error('Error in AuthController:', error);
            res.status(500).json({ success: false, error: "Auth route failed." });
        }
    },

    async getAuth(req, res) {
        try {
            const clientData = req.body;
            const authCheck = AuthService.checkCredentials(clientData);
            
            if (authCheck === true) {
                res.status(200).json({ success: true });
            } else {
                res.status(200).json({ success: false });
            }
        } catch (error) {
            console.error('Error in AuthController:', error);
            res.status(500).json({ success: false, error: "Auth route failed." });
        }
    },


};

export { AuthController };
