const http = require("http");
const fs = require("fs");

//#region to read files
let mainHTML = "";
fs.readFile("../Client-side/pages/main.html", "utf-8", (err, data) => {
  if (err) {
    console.log("There was an error reading the file");
  } else {
    mainHTML = data;
  }
});

let welcomeHTML = fs.readFileSync("../Client-side/pages/welcome.html", "utf-8");
let style1CSS = fs.readFileSync("../Client-side/Styles/style.css", "utf-8");
let scriptJS = fs.readFileSync("../Client-side/Scripts/script.js", "utf-8");
let Image1 = fs.readFileSync("../Client-side/Images/image1.jpg", "utf-8");
let favIcon1 = fs.readFileSync("../Client-side/Icons/favicon.ico", "utf-8");
//#end region

http
  .createServer((req, res) => {
    //#region GET
    if (req.method == "GET") {
      switch (req.url) {
        case "/":
        case "/main.html":
        case "/Pages/main.html":
        case "/Client-side/Pages/main.html":
          res.setHeader("Content-Type", "text/html");

          res.write(mainHTML);
          break;
        case "/style.css":
        case "/Styles/style.css":
        case "/Client-side/Styles/style.css":
          res.setHeader("Content-Type", "text/css");
          res.write(style1CSS);
          break;
        case "/script.js":
        case "/Scripts/script.js":
        case "/Client-side/Scripts/script.js":
          res.setHeader("Content-Type", "text/javascript");
          res.write(scriptJS);
          break;
        case "/image1.jpg":
        case "/Images/image1.jpg":
        case "/Client-side/Images/image1.jpg":
          res.setHeader("Content-Type", "image/jpeg");
          res.write(Image1);
          break;
        case "/favicon.ico":
        case "/Icons/favicon.ico":
        case "/Client-side/Icons/favicon.ico":
          res.setHeader("Content-Type", "image/vnd.microsoft.icon");
          res.write(favIcon1);
          break;
        default:
          if (req.url.includes("welcome.html")) {
            res.setHeader("Content-Type", "text/html");
            res.write(welcomeHTML);
          } else res.write("Invalid URL !!");
          break;
      }
      res.end();
    }
    //#endregion

    //#region POST
    else if (req.method == "POST") {
      let UserName = "";
      req.on("data", (data) => {
        // console.log(data.toString());
        let userData = data.toString(); //userName=mostafa&email=mostafa%40gmail.com&mobileNo=01156460644&address=dkldfd

        let name = userData.split("&")[0].split("=")[1]; // Extracting the name parameter
        name = name.replace(/\+/g, " "); // Replace + with space
        UserName = decodeURIComponent(name); // Decode the URL-encoded name

        email = decodeURIComponent(userData.split("&")[1].split("=")[1]);
        phoneNum = userData.split("&")[2].split("=")[1];

        let address = userData.split("&")[3].split("=")[1]; // Extracting the address parameter
        address = address.replace(/\+/g, " "); // Replace + with space
        address = decodeURIComponent(address); // Decode the URL-encoded address

        res.setHeader("Content-Type", "text/html");
        let File = welcomeHTML
          .replace("{UserName}", UserName)
          .replace("{email}", email)
          .replace("{phoneNum}", phoneNum)
          .replace("{address}", address);
        res.write(File);
      }); //1)

      req.on("end", () => {
        res.end();
      }); //2)

      req.on("error", () => {
        console.log("Error");
      }); //1,2,3
      req.on("close", () => {
        console.log("Closed");
      }); //3)
    }
    //#endregion
    //#region PUT
    else if (req.method == "PUT") {
    }
    //#endregion
    //#region PATCH
    else if (req.method == "PATCH") {
    }
    //#endregion
    //#region DELETE
    else if (req.method == "DELETE") {
    }
    //#endregion
    //#region Default
    else {
      res.end("Please Check ur Method [GET- POST - PATCH - PUT - DELETE]");
    }
    //#endregion
  })
  .listen(7000, () => {
    console.log("http://localhost:7000");
  });
