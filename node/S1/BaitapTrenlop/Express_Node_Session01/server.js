const { createServer } = require('node:http');
const fs = require('fs').promises;
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer(async (req, res) => {
  res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/html; charset=utf-8');

  // Exercise 1
  // try {
  //   // Đọc nội dung file read-this.txt
  //   const readThisContent = fs.readFileSync('txt/read-this.txt', 'utf8');
  //   console.log('Nội dung file read-this.txt:');
  //   console.log(readThisContent);

  //   // Đọc nội dung file input.txt
  //   const inputContent = fs.readFileSync('txt/input.txt', 'utf8');
  //   console.log('Nội dung file input.txt:');
  //   console.log(inputContent);

  //   // Đọc nội dung file append.txt
  //   const appendContent = fs.readFileSync('txt/append.txt', 'utf8');
  //   console.log('Nội dung file append.txt:');
  //   console.log(appendContent);

  //   // Kết hợp nội dung hai file input.txt và append.txt
  //   const finalContent = inputContent + appendContent;

  //   // Ghi kết quả vào file final.txt
  //   fs.writeFileSync('txt/final.txt', finalContent, 'utf8');
  //   console.log('Dữ liệu đã được ghi vào file final.txt.');

  //   // Phản hồi thành công
  //   res.end('<h1>Hoàn thành!</h1>');
  // } catch (error) {
  //   console.error('Đã xảy ra lỗi:', error);
  //   res.end('<h1>Đã xảy ra lỗi khi xử lý file. Vui lòng kiểm tra console.</h1>');
  // }



  // Exercise 2
  // fs.readFile('txt/read-this.txt', 'utf8', (err, readThisContent) => {
  //   if(err) {
  //     console.error('Lỗi đọc file read-this.txt:', err);
  //     res.end('<h1>Đã xảy ra lỗi khi đọc file read-this.txt. Vui lòng kiểm tra console.</h1>');
  //     return;
  //   }
  //   console.log('Nội dung file read-this.txt:');
  //   console.log(readThisContent);

  //   fs.readFile('txt/input.txt', 'utf8', (err, inputContent) => {
  //     if(err) {
  //       console.error('Lỗi đọc file input.txt:', err);
  //       res.end('<h1>Đã xảy ra lỗi khi đọc file input.txt. Vui lòng kiểm tra console.</h1>');
  //       return;
  //     }
  //     console.log('Nội dung file input.txt:');
  //     console.log(inputContent);

  //     fs.readFile('txt/append.txt', 'utf8', (err, appendContent) => {
  //       if(err) {
  //         console.error('Lỗi đọc file append.txt:', err);
  //         res.end('<h1>Đã xảy ra lỗi khi đọc file append.txt. Vui lòng kiểm tra console.</h1>');
  //         return;
  //       }
  //       console.log('Nội dung file append.txt:');
  //       console.log(appendContent);

  //       const finalContent = inputContent + appendContent;
  //       fs.writeFile('txt/final.txt', finalContent, 'utf8', (err)=> {
  //         if(err) {
  //           console.error('Lỗi ghi file final.txt:', err);
  //           res.end('<h1>Đã xảy ra lỗi khi ghi file final.txt. Vui lòng kiểm tra console.</h1>');
  //           return;
  //         }
  //         console.log('Dữ liệu đã được ghi vào file final.txt.');
  //         res.end('<h1>Hoàn thành!</h1>');
  //       });
  //     });
  //   });
  // });

  // Exercise 3
  //blocking: "chặn" chương trình chính cho đến khi thực hiện xong, trong thời gian đó các tác vụ không thể thực hiện được
  //non-blocking: không chặn chương trình chính, cho phép thực hiện các tác vụ khác trong thời gian đợi

  // Exercise 4
  // 1. Chạy lệnh: npm init
  //      Nhập các thông tin cần thiết:
  //      package name: Tên mặc định hoặc tự đặt
  //      version: Tùy chọn(1.0.0 hoặc giữ mặc định)
  //      entry point: server.js(hoặc giữ mặc định index.js)
  // 2. Cài nodemon: npm install nodemon --save-dev
  // 3. Thêm script vào package.json:
  //      "scripts": {
  //        "start": "node server.js",
  //        }
  // 4. Chạy server: npm run start

  // Exercise 5
    // if (req.url === "/") {
    //   res.end("<h1>This is homepage</h1>");
    // } else if(req.url === "/overview") {
    //   res.end("<h1> This is overview page</h1>");
    // } else if(req.url === "/product") {
    //   res.end("<h1> This is product page</h1>");
    // } else {
    //   res.end("<h1>PAGE NOT FOUND</h1>");
    // }



    // Exercise 6
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    try {
      // Đọc dữ liệu từ file data.json và back-up-data.json
      const dataFilePath = path.join(__dirname, 'dev-data', 'data.json');
      const backupDataFilePath  = path.join(__dirname, 'dev-data', 'backup-data.json');

      const data = await fs.readFile(dataFilePath, 'utf8');
      const backupData = await fs.readFile(backupDataFilePath, 'utf8');
  
      // Log dữ liệu ra màn hình console
      console.log('Dữ liệu từ file data.json:', data);
      console.log('Dữ liệu từ file back-up-data.json:', backupData);
  
      // Parse dữ liệu JSON thành đối tượng JavaScript
      const jsonData = JSON.parse(data);
      const backupJsonData = JSON.parse(backupData);
      
      if (req.url === '/') {
        res.end(JSON.stringify({ message: 'Welcome to the homepage' }));
      } else if (req.url === '/api') {
        // Trả về toàn bộ dữ liệu từ file data.json
        const combinedData = {
          data: jsonData,
          backup: backupJsonData
        };
        res.end(JSON.stringify(combinedData));
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'PAGE NOT FOUND' }));
      }
    } catch (err) {
      // Nếu có lỗi khi đọc file
      console.error('Lỗi khi đọc file:', err);
      res.statusCode = 500;
      res.end(JSON.stringify({ message: 'Lỗi khi đọc file' }));
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});