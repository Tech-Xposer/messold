import Shopify from "shopify-api-node";
import dotenv from "dotenv";
dotenv.config();

const { SHOPIFY_STORE_DOMAIN, SHOPIFY_API_KEY, SHOPIFY_ACCESS_TOKEN } =
  process.env;

if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_API_KEY || !SHOPIFY_ACCESS_TOKEN) {
  throw new Error("Missing Shopify environment variables.");
}

const shopify = new Shopify({
  shopName: SHOPIFY_STORE_DOMAIN,
  accessToken: SHOPIFY_ACCESS_TOKEN,
});
if (process.env.NODE_ENV === "dev") {
  async function testShopifyConnection() {
    try {
      const shop = await shopify.shop.get();
      console.log(`Connected to Shopify store: ${shop.name}`);
    } catch (error) {
      console.error("Error connecting to Shopify:", error.message);
    }
  }
  testShopifyConnection();
}

export default shopify;
