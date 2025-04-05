# Contributing to Recipe Generator

Thank you for your interest in contributing to our Recipe Generator project! This document provides guidelines to help you get started.

## Prerequisites

- Node.js (latest LTS version recommended)
- MongoDB
- Git

## Setting Up the Development Environment

1. **Fork and clone the repository**
    ```bash
    git clone git@bitbucket.org:cs3398-luna-s25/recipe_generator.git
    cd recipe_generator
    ```

2. **Backend Setup**
    - Navigate to the backend directory
    - Install dependencies
      ```bash
      cd backend
      npm install
      ```
    - Set up environment variables
      ```bash
      cp .env.sample .env
      ```
    - Open the `.env` file and fill in your API keys
    - Start the backend server
      ```bash
      npm run start
      ```
    - You can test your connection by opening your browser to:  
    `localhost:3000/test`

3. **Frontend Setup**
    - Navigate to the frontend directory
    - Install dependencies
      ```bash
      cd recipe_vite
      npm install
      ```
    - Start the React development server
      ```bash
      npm run start
      ```

## Development Workflow

1. Create a new branch for your feature or bug fix
    ```bash
    git switch -c your-feature-name
    ```

2. Make your changes and commit them with descriptive commit messages
    ```bash
    git add .
    git commit -m "Add feature: description of changes"
    ```

3. Push your changes to your forked repository
    ```bash
    git push -u origin your-feature-name
    ```

4. Create a pull request going into the development branch 

## Code Style and Guidelines

- Follow the existing code style and patterns
- Keep commits focused and atomic
- Update documentation when necessary

## Pull Request Process

1. Ensure your code follows the project's coding standards
2. Update the README.md or documentation if needed
3. The PR should work in all environments (test this locally)
4. Request a review from a maintainer

## Questions?

If you have any questions, please open an issue or reach out to the project maintainers.

Thank you for contributing to Recipe Generator!