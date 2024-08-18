# Simple Endpoint API

This project demonstrates the implementation of Test-Driven Development (TDD), authentication, and API documentation using Swagger. The goal is to build a well-tested and documented API that includes user authentication.

# Features

- **API Documentation**: The API is fully documented using Swagger, making it easy to understand and test the endpoints.
- **Test-Driven Development (TDD)**: The project follows TDD principles, with tests written for all major functionalities to ensure reliability and accuracy.
- **Authentication**: The project includes secure user authentication using JWT tokens, ensuring that endpoints are protected.

## Getting Started

Follow the instructions below to set up and run the project locally.

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (or any other database supported by Prisma)
- Git

## Installation

Clone the repository :

```bash
git clone https://github.com/aksalatdev/BEJS_fgabatch2_Aksal_Abitahta_Challenge-Chapter_5.git
```

Navigate to the project directory:

```
cd BEJS_fgabatch2_Aksal_Abitahta_Challenge-Chapter_5
```

Install the dependencies:

```
npm install
```

Set up environment variables by creating a .env file:

```
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

Apply Prisma Migrations:

```
npx prisma migrate dev
```

## Running The Project

Start The Server :

```
npm start
```

The API will be available at `http://localhost:3000.`

Access the Swagger documentation at `http://localhost:3000/api-docs`

## Usage

- Register a new user at `/auth/register`
- Login a user at `/auth/login`
- Authenticate user with JWT at `/auth/authenticate`

## Technologies Used

- Node.js: Backend server
- Express.js: Web framework
- Prisma: ORM for database interaction
- Jest: Testing framework
- Swagger: API documentation
- JWT: JSON Web Tokens for authentication

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

Feel free to adjust any of the details as needed!
