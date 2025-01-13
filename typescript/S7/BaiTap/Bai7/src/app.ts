import ProductManager from "./services/ProductManager.js";
import { showMenu } from "./utils/menu.js";
import Book from "./models/Book.js";
import { getValidInput } from "./utils/inputUtils.js";
class Main {
    private productManager: ProductManager<Book>;

    constructor() {
        this.productManager = new ProductManager();
    }

    start(): void {
        let running = true;
        while (running) {
            const option = Number(prompt(showMenu()));
            switch (option) {
                case 1:
                    const id = parseInt(getValidInput("Nhập ID: ", (input) => !isNaN(parseInt(input)) && this.productManager.isIdUnique(parseInt(input))));
                    const name = getValidInput("Nhập tên: ", (input) => input.trim() !== "");
                    const price = parseFloat(getValidInput("Nhập giá: ", (input) => !isNaN(parseFloat(input)) && parseFloat(input) > 0));
                    const category = getValidInput("Nhập thể loại: ", (input) => input.trim() !== "");
                    const book = new Book(id, name, price, category);
                    this.productManager.addProduct(book);
                    console.log("Sách đã được thêm: " + book.getDetails());
                    break;

                case 2:
                    const removeId = parseInt(prompt("Nhập ID sách cần xóa: ")!);
                    this.productManager.removeProductById(removeId);
                    console.log("Sách đã được xóa.");
                    break

                case 3:
                    console.log("Danh sách sách:");
                    this.productManager.listProducts().forEach(product => console.log(product.getDetails()));
                    break;

                case 4:
                    const searchKey = prompt("Tìm theo thuộc tính (id/name/category): ")!;
                    const searchValue = prompt("Nhập giá trị: ")!;
                    const result = searchKey === "id" ?
                        this.productManager.findProductBy("id" as keyof Book, parseInt(searchValue) as unknown as (() => number)) :
                        this.productManager.findProductBy(searchKey as keyof Book, searchKey === "id" ? parseInt(searchValue) : searchKey === "price" ? parseFloat(searchValue) : searchValue as any);
                    console.log(result ? result.getDetails() : "Không tìm thấy sách.");
                    break;

                case 5:
                    const filterKey: keyof Book = "category" as keyof Book; 
                    const filterValue = prompt("Nhập thể loại: ")!;
                    const filtered = this.productManager.filterProductsBy(filterKey, () => filterValue);
                    console.log(filtered.length > 0 ? filtered.map(product => product.getDetails()) : "Không có sách nào.");
                    break;
                case 6:
                    console.log(`Tổng giá trị sách: $${this.productManager.calculateTotalValue()}`);
                    break;
                case 7: 
                    const discountRate = parseFloat(prompt("Nhập phần trăm giảm giá: ")!);
                    console.log("Danh sách giá sau giảm:");
                    this.productManager.listProducts().forEach(product => {
                        console.log(`${product.getName()}: $${product.calculateDiscount(discountRate)}`); 
                    });
                    break;
                case 8:
                    running = false;
                    console.log("Đã thoát chương trình.");
                    break;
                default:
                    console.log("Lựa chọn không hợp lệ.");
            }
        }
    }
}

const app = new Main();
app.start();