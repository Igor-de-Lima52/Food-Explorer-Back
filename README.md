# Food Explorer

## Project description

**Food Explorer** is a dish registration system for a restaurant. Administrators can add, edit or remove dishes, while users can view the dishes available on the menu. The project aims to facilitate the management of a restaurant's menu and improve the customer experience when viewing dish options.

## Technoolgies used

The project backend was developed using the following technologies and libraries:

- **bcryptjs**: For hashing and verifying passwords.
- **cookie-parser**: For parsing HTTP cookies.
- **cors**: For CORS (Cross-Origin Resource Sharing) configuration.
- **dotenv**: For managing environment variables.
- **express**: Web framework for Node.js.
- **express-async-errors**: To handle errors in asynchronous middleware.
- **jsonwebtoken**: For authentication and authorization using JWT tokens.
- **knex**: SQL Query builder for Node.js.
- **multer**: Middleware for uploading files.
- **pm2**: Node.js application process manager.
- **sqlite** and **sqlite3**: Lightweight SQL database for local storage.

## Requisitos de Sistema

To run the project backend, you will need:

- **Node.js** (version 14 or higher)
- **npm** (Node.js package manager)

> **Note**: It is important to have Node.js and npm configured correctly in your development environment.

## Installation

To configure the development environment, follow these steps:

1. Clone the repository:
   
   ```bash
   git clone https://github.com/Igor-de-Lima52/food-explorer.git
   ```
2. Install project dependencies:
   
   ```bash
   npm install
   ```
## Settings
Before running the project, you need to configure the environment variables. Rename the  **.env.example**  file to  **.env** and adjust the variables as needed.

```bash
cp .env.example .env
```
Edit the file .env to include your settings

## Execution

To start the development server, use the command:
```bash
npm run dev
``` 
To run the server in a production environment (with PM2), use:
```bash
npm start
``` 

## Directory structure

The Backend directory structure is organized as follows:

```bash
/src
  /config        # Authentication and upload configs
  /controllers   # Control logic for dishes, users, sessions
  /database      # Knex config and SQLite database
  /middlewares   # Middlewares for Express
  /providers     # External services and providers
  /repositories  # Database access logic
  /routes        # Defining users, dishes and session routes
  /services      # Services that contain the business logic
  /utils         # General utilities
/tmp             # Temporary directory for storing files
server.js        # Server entry point
```

## API endpoints

Endpoints are the access points to different API funcionalities. The project's main endpoints include: 

- **/users**: Users management(register, log in, etc.).
- **/dishes**: Dishes management (list, create, edit, delete)
- **/sessions**: Sessions management (log in, log out)

## Authentication and Authorization
The project uses JSON Web Tokens (JWT) for authentication. The users and admins must log in to receive an access token. The actions such as creation and editing dishes are restricted only for admins

