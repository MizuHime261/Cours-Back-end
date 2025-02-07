// npm init -- initialization (Khởi tạo)
const { createServer } = require("node:http");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
  //   let readThisContent = fs
  //     .readFileSync("./txt/read-this.txt", { encoding: "utf8" })
  //     .toString();
  //   let inputContent = fs
  //     .readFileSync("./txt/input.txt", { encoding: "utf8" })
  //     .toString();

  //   let appendContent = fs
  //     .readFileSync("./txt/append.txt", { encoding: "utf8" })
  //     .toString(); // 1000s
  //   // readFile (THAM KHẢO THÊM)

  //   let finalContent = inputContent + appendContent;
  //   //
  //   fs.writeFileSync("./txt/final.txt", "Hello world");
  // writeFile (THAM KHẢO THÊM)

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf8");

  if (req.url === "/") {
    res.end("<h1>Đây là trang chủ</h1>");
  } else if (req.url === "/overview") {
    res.end("<h1>Đây là trang overview</h1>");
  } else if (req.url === "/product") {
    res.end("<h1>Đây là trang product</h1>");
  } else if (req.url.startsWith("/api")) {
    // Tách nhỏ url theo dấu /
    let urlArr = req.url.split("/");
    if (urlArr.length === 2) {
      let data = JSON.parse(fs.readFileSync("./dev-data/data.json"));
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
    } else {
      let id = urlArr[urlArr.length - 1];
      let data = JSON.parse(fs.readFileSync("./dev-data/data.json"));
      let productData = data.find(function (element, index) {
        return element.id === +id;
      });
      if (productData) {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(productData));
      } else {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({}));
      }
    }
  } else {
    res.statusCode = 404;
    res.end("<h1>Đây là trang NOT FOUND</h1>");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
