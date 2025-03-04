const knex = require('../config/database');

module.exports.getAllProducts = async function () {
    try {
        const rawProducts = await knex('Product as p')
            .select(
                'p.id',
                'p.productName',
                'p.status',
                'l.description as listing_description',
                'l.price as listing_price',
                'l.rate as listing_rate',
                'c.commentId',
                'c.content as commentContent',
                't.tagId',
                't.tagName'
            )
            .leftJoin('Listing as l', 'p.id', 'l.productId')
            .leftJoin('Comment as c', 'p.id', 'c.productId')
            .leftJoin('Product_Tag as pt', 'p.id', 'pt.productId')
            .leftJoin('Tag as t', 'pt.tagId', 't.tagId');

        // Gom nhóm dữ liệu thành object
        const productMap = {};

        rawProducts.forEach(row => {
            if (!productMap[row.id]) {
                productMap[row.id] = {
                    id: row.id,
                    productName: row.productName,
                    status: row.status,
                    listing: row.listing_description ? {
                        description: row.listing_description,
                        price: row.listing_price,
                        rate: row.listing_rate
                    } : null,
                    comments: [],
                    tags: []
                };
            }

            // Thêm comment nếu có
            if (row.commentId && !productMap[row.id].comments.some(c => c.commentId === row.commentId)) {
                productMap[row.id].comments.push({
                    commentId: row.commentId,
                    content: row.commentContent
                });
            }

            // Thêm tag nếu có
            if (row.tagId && !productMap[row.id].tags.some(t => t.tagId === row.tagId)) {
                productMap[row.id].tags.push({
                    tagId: row.tagId,
                    tagName: row.tagName
                });
            }
        });

        return Object.values(productMap); // Chuyển object thành array
    } catch (err) {
        console.error("Error fetching products:", err);
        throw err;
    }
};