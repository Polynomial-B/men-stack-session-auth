// Make environment variables available to the app
const dotenv = require("dotenv");
dotenv.config();
// Import express and create instance of express
const express = require("express");
const app = express();
// Import
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");

const authController = require("./controllers/auth.js")


// ENSURES THAT PORT NUMBER ISN'T HARDCODED, i.e. can be changed
const port = process.env.PORT || 3000; 
// THE SAME AS THE BELOW (TERNARY):
// const port = process.env.PORT ? process.env.PORT : 3000;
// SIMPLIFIED:
        // let port = null;
        // if (process.env.PORT) {
        //     port = process.env.PORT;
        // } else {
        //     port = 3000;
        //     }
        // }



mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`MongoDB connected to ${mongoose.connection.name}`);
})

// ? MIDDLEWARE TO PARSE INCOMING REQUESTS WITH JSON PAYLOADS
// ? i.e. to parse URL-encoded data from forms
// Request body, rather than taking the data in a query string
// Otherwise our data would appear in the URL
app.use(express.urlencoded( { extended: false}) )

// Middleware for using HTTP verbs, such as PUT or DELETE, in places where client doesn't support it
app.use(methodOverride("_method"));

// Morgan for logging HTTP requests
app.use(morgan("dev"));
// ? Middleware end --------------------------------------------------


// ! Use auth controller for any request that begins with /auth
// below authController is our ENDPOINT
app.use("/auth", authController);


app.get("/", async (req, res) => {
    res.render("index.ejs");
})




app.listen(port, () => {
    console.log(`Express app is ready on port ${port}!`);
})



