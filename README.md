# PostgreSQL Database Setup Guide

## 1. Create a Database and a User

You'll need to create a new database and a corresponding user (with a password) that your application can use.

### a. Open the PostgreSQL shell

Run the following command (adjust if necessary for your OS):

```bash
sudo -u postgres psql
```

### b. Create a user and a database

Inside the PostgreSQL prompt, run:

```sql
-- Create a new user with a password
CREATE USER craftuser WITH PASSWORD 'craftpass';

-- Create a new database
CREATE DATABASE craftdb;

-- Grant privileges on the database to the new user
GRANT ALL PRIVILEGES ON DATABASE craftdb TO craftuser;
```

Type `\q` to exit the PostgreSQL shell.

## 2. Configure the DATABASE_URL Environment Variable

In your project's root directory, create or update a `.env` file with the following lines:

```
DATABASE_URL="postgresql://craftuser:craftpass@localhost:5432/craftdb"
STRIPE_SECRET_KEY="sk_test_51R1qiVJy580uLvHAH7EeFuTJ6lMJJzX1wZJCLvTR5TvP0DpnwIu5DJh7NdW1a2YhPYQ6xXuyKDH9WePRe5E7WdRB00GoNjK0WE"
VITE_STRIPE_PUBLIC_KEY="pk_test_51R1qiVJy580uLvHAnHIQyLPtZU3ADDIesMFWTli9875iDbvqO5aBS8pt98S2KQxMpmkLJOK6rSbosIHYjXfYjdRe00XQfYVdD9"
```

This connection string tells your application to connect to PostgreSQL on your local machine using the provided credentials and database.

## 3. Run the Migration Script

You mentioned a migration file located at `migrations/0000_furry_sharon_carter.sql`. This file creates your tables and types.

### a. Execute the migration using psql

Run the following command from your terminal (make sure you're in the project root or adjust the path accordingly):

```bash
psql -U craftuser -d craftdb -f migrations/0000_whole_rafael_vega.sql
```

**Explanation:**
- `-U craftuser` tells psql to connect as the user craftuser.
- `-d craftdb` specifies the database to connect to.
- `-f` runs the SQL commands from the specified file.

**Tip:** If prompted for a password, enter the password you set (in this example, `craftpass`).

## 4. Start Your Development Server

Once the database is set up and the migration has run successfully, you can start your project:

```bash
npm run dev
```

Your project should now start without the `DATABASE_URL is required` error, and it will use the PostgreSQL database you just configured.
