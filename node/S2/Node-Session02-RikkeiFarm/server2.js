// Import necessary modules
const { createServer } = require('http');
const fs = require('fs');
const url = require('url');
const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (req.url === '/' || req.url === '/overview') {
        let data = JSON.parse(fs.readFileSync('./dev-data/data.json', { encoding: 'utf-8' }));
        let product = fs.readFileSync('./templates/single-product.html', { encoding: 'utf-8' });

        data = data.map(function (el) {
            return product
                .replaceAll("{{productName}}", el.productName)
                .replaceAll("{{quantity}}", el.quantity)
                .replaceAll("{{image}}", el.image)
                .replaceAll("{{image1}}", el.image)
                .replaceAll("{{price}}", el.price)
                .replaceAll("{{id}}", el.id);
        });

        let overviewtemplate = fs.readFileSync('./templates/overview.html', { encoding: 'utf-8' });
        overviewtemplate = overviewtemplate.replaceAll("{{content}}", data.join(""));
        res.end(overviewtemplate);
    } else if (req.url.startsWith('/product/')) {
        const urlArr = req.url.split("/");
        const id = urlArr[urlArr.length - 1];

        const data = JSON.parse(fs.readFileSync('./dev-data/data.json', { encoding: 'utf-8' }));
        const productData = data.find(el => el.id == id) || data[0];

        if (productData) {
            let producttemplate = fs.readFileSync('./templates/product.html', { encoding: 'utf-8' });
            producttemplate = producttemplate
                .replaceAll("{{productName}}", productData.productName)
                .replaceAll("{{quantity}}", productData.quantity)
                .replaceAll("{{image}}", productData.image)
                .replaceAll("{{organic}}", productData.organic ? 'Organic' : 'Non-organic')
                .replaceAll("{{from}}", productData.from)
                .replaceAll("{{nutrients}}", productData.nutrients)
                .replaceAll("{{description}}", productData.description)
                .replaceAll("{{price}}", productData.price)
                .replaceAll("{{id}}", productData.id);

            res.end(producttemplate);
        } else {
            res.statusCode = 404;
            res.end('<h1>Product not found</h1>');
        }
    } else if (req.url === '/product') {
        const data = JSON.parse(fs.readFileSync('./dev-data/data.json', { encoding: 'utf-8' }));
        const firstProduct = data[0];

        if (firstProduct) {
            let producttemplate = fs.readFileSync('./templates/product.html', { encoding: 'utf-8' });
            producttemplate = producttemplate
                .replaceAll("{{productName}}", firstProduct.productName)
                .replaceAll("{{quantity}}", firstProduct.quantity)
                .replaceAll("{{image}}", firstProduct.image)
                .replaceAll("{{organic}}", firstProduct.organic ? 'Organic' : 'Non-organic')
                .replaceAll("{{from}}", firstProduct.from)
                .replaceAll("{{nutrients}}", firstProduct.nutrients)
                .replaceAll("{{description}}", firstProduct.description)
                .replaceAll("{{price}}", firstProduct.price)
                .replaceAll("{{id}}", firstProduct.id);

            res.end(producttemplate);
        } else {
            res.statusCode = 404;
            res.end('<h1>No products available</h1>');
        }
    } else if (req.url.startsWith('/search')) {
        const queryObject = url.parse(req.url, true).query;
        const searchQuery = queryObject.p ? queryObject.p.toLowerCase() : '';

        const data = JSON.parse(fs.readFileSync('./dev-data/data.json', { encoding: 'utf-8' }));
        const productData = data.find(el => el.productName.toLowerCase() === searchQuery);

        if (productData) {
            res.writeHead(302, { Location: `/product/${productData.id}` });
            res.end();
        } else {
            let searchTemplate = fs.readFileSync('./templates/search.html', { encoding: 'utf-8' });
            searchTemplate = searchTemplate.replace("{{message}}", "NOT FOUND");
            res.end(searchTemplate);
        }
    } else if (req.url === '/create' && req.method === "GET") {
        let create = fs.readFileSync('./templates/create.html', { encoding: 'utf-8' });
        res.end(create);
    } else if (req.url === '/create' && req.method === "POST") {
        let data = "";
        req
            .on("error", (err) => {
                console.error(err);
            })
            .on("data", (chunk) => {
                data += chunk.toString();
            })
            .on("end", () => {
                let queryString = url.parse(`?${data}`, true).query;
                let errorMessage = null;
                if (!queryString.productName || !queryString.quantity || !queryString.image || !queryString.price || !queryString.from || !queryString.nutrients || !queryString.description) {
                    // Set error message if fields are missing
                    errorMessage = "Please fill out all fields.";
                }
    
                if (errorMessage) {
                    // Render create form with the error message
                    let createTemplate = fs.readFileSync('./templates/create.html', { encoding: 'utf-8' });
                    createTemplate = createTemplate.replace("{{errorMessage}}", errorMessage);
                    res.end(createTemplate);
                    return;
                }

                let currentData = JSON.parse(fs.readFileSync('./dev-data/data.json', { encoding: 'utf-8' }));
                let newId = currentData.length > 0 ? Math.max(...currentData.map(fruit => Number(fruit.id))) + 1 : 1;
                let newFruit = {
                    id: newId.toString(),
                    productName: queryString.productName,
                    image: queryString.image,
                    from: queryString.from,
                    nutrients: queryString.nutrients,
                    quantity: queryString.quantity,
                    price: queryString.price,
                    organic: queryString.organic === 'on', // If checkbox is checked, it's organic
                    description: queryString.description
                };
                
                currentData.push(newFruit);
                fs.writeFileSync('./dev-data/data.json', JSON.stringify(currentData, null, 2));
                
                // Create backup
                fs.writeFileSync('./dev-data/data-backup.json', JSON.stringify(currentData, null, 2));

                // Redirect to overview page
                res.writeHead(302, { Location: '/' });
                res.end();
            });
    } else {
        res.statusCode = 404;
        res.end('<h1>Page not found</h1>');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});