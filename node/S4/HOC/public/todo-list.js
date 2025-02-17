document.addEventListener("DOMContentLoaded", function () { 
  const apiUrl = "http://localhost:3000/todos";
  const ul = document.getElementById("myUL");

  function loadTodo() {
    fetch(apiUrl)
      .then(res => res.json())
      .then(todos => {
        ul.innerHTML = "";
        todos.sort((a, b) => a.order - b.order); // Sắp xếp theo thứ tự
        todos.forEach(todo => addTodoToList(todo));
        enableDragAndDrop(); // Kích hoạt kéo thả
      })
      .catch(err => console.error("Error fetching todos:", err));
  }

  function addTodoToList(todo) {
    const li = document.createElement("li");
    li.draggable = true;
    li.dataset.id = todo.id;
    li.classList.add("draggable");
  
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.content;
    textSpan.onclick = () => toggleTodo(todo.id, !todo.status);
  
    if (todo.status) {
      li.classList.add("checked");
    }
  
    // Ô nhập ẩn ban đầu
    const input = document.createElement("input");
    input.type = "text";
    input.value = todo.content;
    input.classList.add("edit-input");
    input.style.display = "none";
  
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        saveEdit(todo.id, input, textSpan);
      }
    });
  
    input.addEventListener("blur", () => {
      saveEdit(todo.id, input, textSpan);
    });

    // Nút xóa
    const deleteBtn = document.createElement("SPAN");
  deleteBtn.className = "close";
  deleteBtn.textContent = "\u00D7";
  deleteBtn.onclick = () => deleteTodo(todo.id);

    // Nút chỉnh sửa
    const editBtn = document.createElement("BUTTON");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => {
    textSpan.style.display = "none";
    input.style.display = "inline-block";
    input.focus();
  };

    // Sự kiện hoàn thành todo
    textSpan.onclick = () => toggleTodo(todo.id, !todo.status);

    li.appendChild(textSpan);
    li.appendChild(input);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
  }

  function enableDragAndDrop() {
    let draggedItem = null;

    document.querySelectorAll(".draggable").forEach(item => {
      item.addEventListener("dragstart", function () {
        draggedItem = item;
        setTimeout(() => item.classList.add("dragging"), 0);
      });

      item.addEventListener("dragend", function () {
        setTimeout(() => {
          draggedItem.classList.remove("dragging");
          draggedItem = null;
          saveNewOrder(); // Lưu thứ tự mới
        }, 0);
      });
    });

    ul.addEventListener("dragover", function (e) {
      e.preventDefault();
      const afterElement = getDragAfterElement(ul, e.clientY);
      if (afterElement == null) {
        ul.appendChild(draggedItem);
      } else {
        ul.insertBefore(draggedItem, afterElement);
      }
    });
  }

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".draggable:not(.dragging)")];
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  function saveNewOrder() {
    const todos = [...document.querySelectorAll(".draggable")].map((item, index) => ({
      id: item.dataset.id,
      order: index + 1
    }));

    fetch(apiUrl + "/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todos)
    })
      .then(() => loadTodo()) // Cập nhật danh sách sau khi lưu
      .catch(err => console.error("Error saving new order:", err));
  }

  document.querySelector(".addBtn").addEventListener("click", function () {
    const input = document.getElementById("myInput");
    const content = input.value.trim();
    if (!content) {
      alert("You must write something!");
      return;
    }
    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    })
      .then(res => res.json())
      .then(todo => {
        addTodoToList(todo);
        enableDragAndDrop();
        input.value = "";
      })
      .catch(err => console.error("Error adding todo:", err));
  });

  function deleteTodo(id) {
    fetch(`${apiUrl}/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(() => {
        document.querySelector(`[data-id="${id}"]`).remove();
        reorderTodos(); // Cập nhật lại ID
      })
      .catch(err => console.error("Error deleting todo:", err));
  }

  function reorderTodos() {
    const todos = [...document.querySelectorAll(".draggable")].map((item, index) => ({
      id: item.dataset.id,
      content: item.querySelector("span").textContent,
      status: item.classList.contains("checked"),
      order: index + 1
    }));

    fetch(apiUrl + "/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todos)
    })
      .then(() => loadTodo()) // Tải lại danh sách sau khi cập nhật
      .catch(err => console.error("Error reordering todos:", err));
  }

  function toggleTodo(id, status) {
    fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    })
      .then(res => res.json())
      .then(() => loadTodo())
      .catch(err => console.error("Error toggling todo:", err));
  }

  function updateTodo(id, newContent) {
    fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newContent })
    })
      .then(res => res.json())
      .then(() => loadTodo())
      .catch(err => console.error("Error updating todo:", err));
  }

  function saveEdit(id, input, textSpan) {
    const newContent = input.value.trim();
    if (newContent && newContent !== textSpan.textContent) {
      updateTodo(id, newContent);
    }
    textSpan.textContent = newContent || textSpan.textContent;
    textSpan.style.display = "inline";
    input.style.display = "none";
  }

  loadTodo();
});