let ul = document.getElementById("myUL");

// Promise trong JS
fetch("http://localhost:3000/todos")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log(data);
    // Sử dụng logic Javascript DOM để render data
    // get từ server về ra màn hình HTML
    data = data.map(function (e, i) {
      return `<li ${e.status ? "class='checked'" : ""} id="${e.id}">
        ${e.content}
        <span class="close">&#10005;</span>
      </li>`;
    });

    for (let li of data) {
      ul.innerHTML = ul.innerHTML + li;
    }
    // Lấy các phần tử HTML sang bên JS

    // Sử dụng các phương thức DOM để hiển thị dữ liệu (map)
    // sang HTML đã được lấy sang JS
    // Click on a close button to hide the current list item
    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
        let id = div.id;
        console.log(id);
        // Gửi 1 delete request có đính kèm id của phần tử muốn
        // xoá lên server
        fetch(`http://localhost:3000/todos/${id}`, {
          method: "DELETE",
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            console.log(data);
          })
          .catch();
      };
    }
  })
  .catch();

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  };
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector("ul");
list.addEventListener(
  "click",
  function (ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
      let status = ev.target.className === "checked" ? true : false;
      let id = ev.target.id;

      fetch(`http://localhost:3000/todos/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ status: status }),
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          console.log(data);
        })
        .catch(function () {});
    }
  },
  false
);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
    // Lấy thông tin từ input và gửi lên server
    // Thông qua POST request /todos
    fetch("http://localhost:3000/todos", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ content: inputValue }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(data);
        document.getElementById("myInput").value = "";

        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
        li.id = data.id;

        for (i = 0; i < close.length; i++) {
          close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
            let deleteId = div.id;
            fetch(`http://localhost:3000/todos/${deleteId}`, {
              method: "DELETE",
            })
              .then(function (res) {
                return res.json();
              })
              .then(function (data) {
                console.log(data);
              })
              .catch();
          };
        }
      })
      .catch(function () {});
  }
}