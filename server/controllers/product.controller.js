import ApiResponse from "../handlers/response.handler.js";
import shopify from "../services/shopify.service.js";

export const getProducts = async (req, res) => {
  try {
    // Extract and validate the limit and page parameters from the query
    let { limit, page } = req.query;
    limit = parseInt(limit, 10);
    page = parseInt(page, 10);

    // Default to 10 if limit is not provided or invalid
    if (isNaN(limit) || limit <= 0) {
      limit = 10;
    }

    // Default to 1 if page is not provided or invalid
    if (isNaN(page) || page <= 0) {
      page = 1;
    }

    console.log(`Fetching products with limit: ${limit} and page: ${page}`);

    // Initialize the parameters for fetching products
    let params = { limit };

    // Loop through pages to get the correct set of products
    for (let i = 1; i < page; i++) {
      const products = await shopify.product.list(params);
      params = products.nextPageParameters;

      // If there are no more pages, break early
      if (!params) {
        return ApiResponse.notFound(res, "No more products found");
      }
    }

    // Fetch the products for the requested page
    const products = await shopify.product.list(params);

    // Log the number of products fetched
    console.log(`Number of products fetched: ${products.length}`);

    // Check if products are found and respond accordingly
    if (products && products.length > 0) {
      ApiResponse.success(res, 200, "Products found successfully", {
        count: products.length,
        products,
      });
    } else {
      ApiResponse.notFound(res, "No products found");
    }
  } catch (error) {
    // Log the error and send error response
    console.error("Error fetching products:", error);
    ApiResponse.error(res, error.message, error.statusCode || 500);
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await shopify.product.get(id);
    if (product) {
      return ApiResponse.success(
        res,
        200,
        "Product found successfully",
        product,
      );
    }
    return ApiResponse.notFound(res, "Product not found");
  } catch (err) {
    return ApiResponse.error(
      res,
      err.message || "Internal Server Error",
      err.statusCode || 500,
    );
  }
};
