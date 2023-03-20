# ecommerce-transaction

Before running the project, you will need to have the following software installed on your system:

- Node.js
- PostgreSQL
- Redis

## Getting Started

To get started, clone this repository to your local machine:

    git clone https://github.com/AbdulRasyid-Ans/ecommerce-transaction.git

Next, navigate to the project directory and run the SQL queries in the `sql` folder to initialize and migrate the database. Then, install the necessary packages by running:

    npm install

Next, create `.env` file on root of project directory based on file `.env.example`

## Running the Project

To run the project, use the following command:

    npm start

This will start the server and you can access it through `http://localhost:3000`.

## Feature
- CRON Alert when stock less than or equal stock_alert (print to console)
- Cache to redis when get detail product and user
- Lock product when create transaction to handle multiple transaction on the same time
