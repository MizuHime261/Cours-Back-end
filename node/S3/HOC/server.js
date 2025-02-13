const express =require('express');
const fs= require('fs');
const bodyParser=require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("Hello World");
});
app.get("/users",(req,res)=>{
    let user=fs.readFileSync('data/user.json',{encoding:'utf-8'});
    user=JSON.parse(user);
    res.json(user);
});
app.get("/users/:id",(req,res)=>{
    let user=fs.readFileSync('data/user.json',{encoding:'utf-8'});
    user=JSON.parse(user);
    let userId=req.params.id;
    let userFilter=user.filter(user=>user.id==userId);
    if(userFilter.length==0){
        res.json({message:"Not found"});
    }
    res.json(userFilter);
});

app.post("/users",(req,res)=>{
    console.log(req.body);
    // Đọc dữ liệu từ file user.json
    let users = fs.readFileSync('data/user.json', { encoding: 'utf-8' });
    users = JSON.parse(users);

    // Lấy ID lớn nhất hiện có
    let newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;

    // Tạo user mới với ID tự động tăng
    let newUser = { ...req.body, id: newId };
    
    // Thêm user mới vào danh sách
    users.push(newUser);

    // Ghi lại dữ liệu vào file user.json
    fs.writeFileSync('data/user.json', JSON.stringify(users, null, 4));

    // Phản hồi về client
    res.json({ message: "User created successfully", user: newUser });
});

app.put("/users/:id",(req,res)=>{
    // req.body --> Toàn bộ thông tin cập nhật về đối tượng
    let users = fs.readFileSync("data/user.json", { encoding: "utf-8" });
    users = JSON.parse(users);
    // req.params.id --> Thông tin về id của user cần phần phải cập nhật
    let userId = req.params.id;
    // Tìm kiếm user với id client gửi lên
    let userIndex = users.findIndex((user) => user.id == userId);
    // Nếu không thấy --> response --> User not found
    if (userIndex == -1) {
        res.json({ message: "User not found" });
        return;
    }
    // Nếu tìm thấy --> Tiến hành cập nhật lại user đó với thông
    // tin nằm trong req.body
    users[userIndex] = { ...users[userIndex], ...req.body };
    // Ghi lại vào file
    fs.writeFileSync("data/user.json", JSON.stringify(users, null, 2));
    // response message --> Cập nhật thành công
    res.send("Update user");
});
app.delete("/api/v1/users/:id",(req,res)=>{
    // Trích xuất id từ req.params.id
    let userId = req.params.id;

    // Đọc dữ liệu từ file users.json
    let users = fs.readFileSync('data/user.json', { encoding: 'utf-8' });
    users = JSON.parse(users);

    // Tìm kiếm xem có tồn tại user với id client gửi lên không
    let userIndex = users.findIndex(user => user.id == userId);

    // Nếu không tìm thấy --> Trả về lỗi "User not found"
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    // Nếu tìm thấy --> Tiến hành xoá user
    users.splice(userIndex, 1);

    // Ghi lại dữ liệu vào file users.json
    fs.writeFileSync('data/user.json', JSON.stringify(users));

    // Phản hồi về client
    res.json({ message: "User deleted successfully" });
});
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});