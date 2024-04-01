const http = require("http");
http
  .createServer((req, res) => {
    const requestUrl = req.url;
    if (requestUrl != "/favicon.ico") {
      let requestArr = requestUrl.split("/");
      let operation = requestArr[1];
      //   console.log(operation);
      let result = parseFloat(requestArr[2]);
      for (let i = 3; i < requestArr.length; i++) {
        switch (operation) {
          case "sum":
            result = result + parseFloat(requestArr[i]);
            break;
          case "sub":
            result = result - parseFloat(requestArr[i]);
            break;
          case "mult":
            result = parseFloat(requestArr[i]) * result;
            break;
          case "div":
            result = result / parseFloat(requestArr[i]);
            break;
          default:
            console.log("invalid operation");
            break;
        }
      }
      res.write(result.toString());
      const fs = require("fs");
      fs.writeFile("reults.txt", result.toString(), () => {});
    }
    res.end();
  })
  .listen(7000);
