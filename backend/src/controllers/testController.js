import { TestService } from '../services/testService.js';

const TestController = {
    getTest(req, res) {
        try {
            const message = TestService.getTestMessage();
            res.status(200).json({ success: true, message });
        } catch (error) {
            console.error('Error in TestController:', error);
            res.status(500).json({ success: false, error: "Test route failed." });
        }
    }
};

export { TestController };
