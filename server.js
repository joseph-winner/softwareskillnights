const express = require('express');
const path = require('path');

// Initialize Express app
const app = express();

// INITIALIZE FIREBASE
var admin = require("firebase-admin");
var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Body parser middleware
app.use(express.urlencoded({ extended: false }));



// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Set the public directory
app.use("/public", express.static("public"));
app.use("/css", express.static(__dirname + '/public/css'))
app.use("/js", express.static(__dirname + '/public/js'))
app.use("/img", express.static(__dirname + '/public/img'))

// Attendance Router
app.get('/attendinglist', async (req, res) => {
  try {
    // Query Firestore to get the total number of attendees
    const attendeesSnapshot = await db.collection('users').get();
    const totalAttendees = attendeesSnapshot.size;

    // Render the attendinglist.ejs file and pass the total number of attendees
    res.render('attendinglist', { totalAttendees });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// FORM ROUTER
app.get("/form", (req,res) =>{
    res.render("eventreg")
})

// POST route to handle the form submission
app.post('/register', async (req, res) => {
    try {
      const user = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        techStack: req.body.techStack,
        teamType: req.body.teamType,
        teamName: req.body.teamName,
        consent: req.body.consent === 'on' ? true : false
      };
  
      // Save the user information to Firebase Firestore
      await db.collection('users').add(user);
  
      // Redirect the user to another page
      res.redirect('/attendinglist');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });


  app.get('/dashboard', async (req, res) => {
    try {
      // Query Firestore to get all attendees
      const attendeesSnapshot = await db.collection('users').get();
      const attendees = attendeesSnapshot.docs.map(doc => doc.data());

      // Render the attendees.ejs file and pass the attendees data
      res.render('client-side', { attendees });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

// Start the server
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
