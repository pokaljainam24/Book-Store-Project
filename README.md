# Book Management App

A simple Book Management system built with Node.js, Express, and MongoDB. This app allows the admin to manage books by adding, editing, viewing, and deleting them. It also supports an admin login system for secure access.

## Features

- View all books
- Filter books by bestseller status
- Admin login system
- Add new books to the catalog
- Edit existing book details
- Delete books from the catalog

## Requirements

- Node.js (v16 or higher)
- MongoDB (You need a MongoDB instance running locally or remotely)

## Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>

2. Navigate into the project directory:
   ```base
   cd <project-directory>

3.Install the required dependencies:
  ```base
  npm install
  ```

4. Ensure that MongoDB is running on your local machine or configure your database connection.

## File Structure

```base
/project-directory
|-- /models
|   |-- bookSchema.js     # MongoDB schema for book data
|
|-- /configs
|   |-- database.js       # Database connection configuration
|
|-- /views
|   |-- index.ejs         # Home page view
|   |-- login.ejs         # Admin login page view
|   |-- addbook.ejs       # Add book page view
|   |-- viewdata.ejs      # View books page for admins
|   |-- editbook.ejs      # Edit book page view
|
|-- /public
|   |-- /css              # Stylesheets
|   |-- /images           # Image assets
|
|-- app.js                # Main application entry point
|-- package.json          # Project metadata and dependencies
```

## Demo & Live-link

1. Home Page [![image](https://github.com/user-attachments/assets/678255a5-bc65-44df-b15c-87f3e482a434)]


## How to Use

**For Admin**:

- Navigate to /login to log in with the admin credentials (username: Jainam, password: Jainam@123).
- After login, you'll be redirected to the /addbook page to add new books.
- To manage the books, go to /viewdata, where you can edit or delete books.
- Logout via the /logout route.

## License

- This project is licensed under the MIT License - see the LICENSE file for details.

