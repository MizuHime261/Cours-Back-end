document.addEventListener("DOMContentLoaded", () => {
    fetchBooks();
});

let currentPage = 1;
const limit = 10;

async function fetchBooks() {
    const searchQuery = document.getElementById("search").value;
    const minPrice = document.getElementById("minPrice").value;
    const maxPrice = document.getElementById("maxPrice").value;
    const minRate = document.getElementById("minRate").value;
    const maxRate = document.getElementById("maxRate").value;
    const authorName = document.getElementById("authorName").value;
    const sortField = document.getElementById("sortField").value;
    const sortOrder = document.getElementById("sortOrder").value;
    
    let url = `/books?page=${currentPage}&limit=${limit}`;
    if (searchQuery) url += `&title=${searchQuery}`;
    if (minPrice) url += `&minPrice=${minPrice}`;
    if (maxPrice) url += `&maxPrice=${maxPrice}`;
    if (minRate) url += `&minRate=${minRate}`;
    if (maxRate) url += `&maxRate=${maxRate}`;
    if (authorName) url += `&author_name=${authorName}`;
    if (sortField) url += `&sort=${sortField}&order=${sortOrder}`;
    
    const bookList = document.getElementById("book-list");
    const message = document.getElementById("message");
    bookList.innerHTML = "<p>Đang tải dữ liệu...</p>";
    message.innerHTML = "";
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Không thể lấy dữ liệu từ server");
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error("Lỗi tải dữ liệu sách:", error);
        message.innerHTML = "<p class='error'>Lỗi tải dữ liệu, vui lòng thử lại sau.</p>";
        bookList.innerHTML = "";
    }
}

function displayBooks(books) {
    const bookList = document.getElementById("book-list");
    const message = document.getElementById("message");
    bookList.innerHTML = "";
    
    if (books.length === 0) {
        message.innerHTML = "<p class='warning'>Không tìm thấy sách phù hợp.</p>";
        return;
    }
    
    books.forEach(book => {
        const li = document.createElement("li");
        li.innerHTML = `
            <h3>${book.title}</h3>
            <p>Tác giả: ${book.authorName}</p>
            <p>Danh mục: ${book.categoryName}</p>
            <p>Giá: ${book.price} VNĐ</p>
            <p>Đánh giá: ${book.rate}</p>
            <p>Đánh giá của độc giả:</p>
            <ul>
                ${book.reviews.map(review => `<li>${review.content}</li>`).join('')}
            </ul>
        `;
        bookList.appendChild(li);
    });
    document.getElementById("page-info").textContent = `Trang ${currentPage}`;
}

function searchBook() {
    currentPage = 1;
    fetchBooks();
}

function filterBooks() {
    currentPage = 1;
    fetchBooks();
}

function sortBooks() {
    currentPage = 1;
    fetchBooks();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchBooks();
    }
}

function nextPage() {
    currentPage++;
    fetchBooks();
}