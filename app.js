const express = require("express");
const db = require("./configs/database");
const adminModel = require("./models/adminSchema");
const Book = require("./models/bookSchema");
const app = express();
const port = 8059;
let users = [];
let loginUser = {
  username: "Jainam",
  password: "Jainam@123",
};

app.set("view engine", "ejs"); 
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true })); 

// ---------------------- Home Route ----------------------
app.get("/", (req, res) => {
  Book.find({})  // Fetch all books
    .then((allBooks) => {
      const bestSeller = allBooks.filter(book => book.bestseller === true);
      const popular = allBooks.filter(book => book.bestseller === false);

      console.log("All Books:", allBooks); // Log to check the data
      res.render("index", { bestSeller, popular });
    })
    .catch((err) => {
      console.error(err);
      res.send("Error fetching books");
    });
});


// ---------------------- Login Route ----------------------
app.get("/login", (req, res) => {
  res.render("login", { error: null }); 
});

// ---------------------- Book Form Route ----------------------
app.get("/bookform", (req, res) => {
  return res.render("bookform"); 
});

// ---------------------- Logout Route ----------------------
app.get("/logout", (req, res) => {
  res.redirect("/");  // Redirect to the home page after logout
});


// Route to render the Edit form (GET request)
app.get('/book/edit/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      res.render('editBook', { book });  // Pass book data to the template
    })
    .catch(err => {
      console.error(err);
      res.redirect('/viewdata');  // Redirect if there's an error
    });
});


// Route to handle the Edit form submission (POST request)
app.post('/book/update/:id', (req, res) => {
  const { bookName, author, price, description, imageUrl } = req.body;
  
  Book.findByIdAndUpdate(req.params.id, { bookName, author, price, description, imageUrl }, { new: true })
    .then(updatedBook => {
      return res.redirect('/viewdata');  // Redirect to the viewdata page after the update
    })
    .catch(err => {
      console.error(err);
      return res.redirect('/viewdata');  // Handle error by redirecting back to the book list page
    });
});


// ---------------------- Book List Route ----------------------
app.get("/viewdata", (req, res) => {
  Book.find({})
    .then((books) => {
      res.render("viewdata", { books }); 
    })
    .catch((err) => {
      console.log(err.message);
      res.render("viewdata", { books: [] }); 
    });
});

// Route to delete a book (DELETE request)
app.get('/book/delete/:id', (req, res) => {
  Book.findByIdAndDelete(req.params.id)
      .then(deletedBook => {
        return res.redirect(req.get("Referrer") || '/viewdata'); 
      })
      .catch(err => {
          console.error(err);
          return res.redirect(req.get("Referrer") || '/viewdata'); 
      });
});


// ---------------------- Login Authentication (POST) ----------------------
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "Jainam" && password === "Jainam@123") {
    return res.render("addbook"); 
  } else {
    res.render("login", { error: "Invalid username or password" }); 
  }
});

// ---------------------- Add Book Form Route ----------------------
app.get("/addbook", (req, res) => {
  res.render("addbook");  // Serve the form to add a book
});

// add book routes
app.post('/addbook', (req, res) => {
  const { bookName, author, price, description, imageUrl, bestseller } = req.body;

  const newBook = {
      bookName,
      author,
      price,
      description,
      imageUrl,
      bestseller: bestseller === 'on', // Checkbox value will be 'on' if checked
  };

  Book.create(newBook)  // Save the new book to the database
    .then(() => {
      return res.redirect('/addbook');  // Redirect to the book list page after adding the book
    })
    .catch((err) => {
      console.error(err);
      return res.redirect('/addbook');  // Handle error by redirecting back to the book list page
    });
});


// ---------------------- Start Server ----------------------
app.listen(port, (err) => {
  if (!err) {
    console.log("Server started on this Port");
    console.log("http://localhost:" + port); 
  }
});