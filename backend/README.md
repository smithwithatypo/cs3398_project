# Recipe Generator Backend

This is the backend for the Recipe Generator project.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```bash
    cd recipe_generator/backend
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Rename the .env.sample file:
    ```bash
    mv .env.sample .env
    ```
5. In your .env file, update your variables to match your API keys, etc

### Running the Project

To start the project, run the following command:
```bash
npm run start
```

The backend server should now be running and accessible.

### Testing the Connection

To verify that the backend server is running correctly, open your browser and navigate to:
```bash
http://localhost:3000/test
```
You should see a response indicating that the server is up and running.

## License

This project is licensed under the MIT License.