const express = require("express");
const db = require("./configs/database");
const Book = require("./models/bookSchema");
const app = express();
const port = 8059;

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('views', 'views');

// Track admin login state
let isAdminLoggedIn = false;

// ---------------------- Home Route ----------------------
app.get("/", (req, res) => {
  Book.find({})
    .then((allBooks) => {
      const bestSeller = allBooks.filter(book => book.bestseller === true);
      const popular = allBooks.filter(book => book.bestseller === false);
      res.render("index", { bestSeller, popular });
    })
    .catch((err) => {
      console.error(err);
      res.send("Error fetching books");
    });
});

// ---------------------- Login & Logout ----------------------
app.get("/login", (req, res) => res.render("login", { error: null }));
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (isAdminLoggedIn) {
    return res.render("login", { error: "Admin is already logged in. Please log out first." });
  }
  if (username === "Jainam" && password === "Jainam@123") {
    isAdminLoggedIn = true;
    return res.redirect("/addbook");
  } else {
    res.render("login", { error: "Invalid username or password" });
  }
});
app.get("/logout", (req, res) => {
  isAdminLoggedIn = false;
  res.redirect("/");
});

// ---------------------- View Data (Admin) ----------------------
app.get("/viewdata", (req, res) => {
  if (!isAdminLoggedIn) return res.redirect("/login");
  Book.find({})
    .then((books) => res.render("viewdata", { books }))
    .catch((err) => {
      console.log(err.message);
      res.render("viewdata", { books: [] });
    });
});

// ---------------------- view All Data -----------------------
app.get('/view-all', async (req, res) => {
  try {
    const allBooks = await Book.find(); // Fetch all books
    res.render('view-all', { allBooks });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// ---------------------- Edit Book (GET) ----------------------
app.get('/book/edit/:id', (req, res) => {
  if (!isAdminLoggedIn) return res.redirect("/login");
  Book.findById(req.params.id)
    .then((book) => res.render('editbook', { book }))
    .catch((err) => {
      console.log(err.message);
      res.render('editbook', { book: null });
    });
});

// ---------------------- Edit Book (POST) ----------------------
app.post('/book/edit/:id', (req, res) => {
  if (!isAdminLoggedIn) return res.redirect("/login");
  const { bookName, author, price, description, imageUrl, bestseller } = req.body;
  Book.findByIdAndUpdate(req.params.id, {
    bookName,
    author,
    price,
    description,
    imageUrl,
    bestseller: bestseller === 'on'
  })
    .then(() => res.redirect('/viewdata'))
    .catch((err) => {
      console.log(err.message);
      res.redirect('/viewdata');

    });
});

// ---------------------- Delete Book ----------------------
app.get('/book/delete/:id', (req, res) => {
  if (!isAdminLoggedIn) return res.redirect("/login");
  Book.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/viewdata'))
    .catch((err) => {
      console.log(err.message);
      res.redirect('/viewdata');
    });
});

// ---------------------- Add Book ----------------------
app.get("/addbook", (req, res) => {
  if (!isAdminLoggedIn) return res.redirect("/login"); // ✅ Redirect to login instead
  return res.render("addbook");
});


app.post('/addbook', (req, res) => {
  if (!isAdminLoggedIn) return res.redirect("/login");
  const { bookName, author, price, description, imageUrl, bestseller } = req.body;
  Book.create({
    bookName,
    author,
    price,
    description,
    imageUrl,
    bestseller: bestseller === 'on'
  })
    .then(() => res.redirect('/addbook'))
    .catch((err) => {
      console.error(err);
      res.redirect('/addbook');
    });
});

// POST: Update the book
app.post('/book/update/:id', (req, res) => {
  let { id, bestseller } = req.body;
  bestseller = bestseller === "on";

  Book.findByIdAndUpdate(id, req.body)
    .then(() => {
      console.log("✅ Book Updated Successfully!");
      res.redirect('/viewdata'); // Redirect to book list
    })
    .catch((err) => {
      console.error(err.message);
      res.redirect('/viewdata'); // Redirect even if there’s an error
    });
});


// ---------------------- Start Server ----------------------
app.listen(port, (err) => {
  if (!err) {
    console.log("Server started on this Port");
    console.log("http://localhost:" + port);
  }
});
