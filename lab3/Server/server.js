const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 7000;
const path = require("path");
const bodyParser = require("body-parser");

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/pages/main.html"));
});

app.post("/welcome.html", (req, res) => {
  // Extract form data from request body
  const userName = req.body.userName;
  const email = req.body.email;
  const phoneNum = req.body.mobileNo;
  const address = req.body.address;

  // Read the content of the welcome page file
  fs.readFile(
    path.join(__dirname, "../Client/pages/welcome.html"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      // Replace placeholders in the HTML content with actual values
      const welcomePage = data
        .replace("{UserName}", userName)
        .replace("{email}", email)
        .replace("{phoneNum}", phoneNum)
        .replace("{address}", address);

      // Send the dynamically generated HTML as the response
      res.send(welcomePage);
    }
  );
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
