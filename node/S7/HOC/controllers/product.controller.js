const productService = require('../services/product.service');
module.exports.getAllProducts = async function (req, res) {
	try {
	  let product = await productService.getAllProducts();
	  res.json({
		  message: "Get all products",
		  product,
	  });
	} catch (err) {
	  console.log(err);
	  res.status(500).json({
		  message: "Error when get all products",
		  error: err.message,
	  });
	}
}

module.exports.getProductById = async function (req, res) {
	res.json({
		message: "GET ONE successfully",
	});
}

module.exports.createProduct = async function (req, res) {
	res.json({
		message: "POST successfully",
	});
}

module.exports.updateProduct = async function (req, res) {
	res.json({
        message: "PUT successfully",
    });
}

module.exports.deleteProduct = async function (req, res) {
	res.json({
        message: "DELETE successfully",
    });
}