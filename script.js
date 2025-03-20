// script.js
require('dotenv').config();
const Shopify = require('shopify-api-node');

// Initialize Shopify API client
const shopify = new Shopify({
  shopName: process.env.SHOPIFY_SHOP_NAME,
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_API_PASSWORD,
  apiVersion: '2023-10' // Update this to the latest API version
});

// Function to check if a product has any images
function hasImages(product) {
  // Check if product has main images
  if (product.images && product.images.length > 0) {
    return true;
  }
  
  // Check if any variants have images
  if (product.variants && product.variants.length > 0) {
    for (const variant of product.variants) {
      if (variant.image_id) {
        return true;
      }
    }
  }
  
  return false;
}

// Main function to find and set products to draft
async function setProductsWithoutImagesToDraft() {
  console.log('Starting to check products without images...');
  
  try {
    let productCount = 0;
    let draftedCount = 0;
    let params = { limit: 250 }; // Maximum allowed by Shopify API
    
    // Loop through all products using pagination
    do {
      const products = await shopify.product.list(params);
      productCount += products.length;
      
      if (products.length === 0) break;
      
      // Process each product
      for (const product of products) {
        // Skip already drafted products
        if (product.status === 'draft') continue;
        
        // Check if product has any images
        if (!hasImages(product)) {
          console.log(`Setting product to draft: ${product.title} (ID: ${product.id})`);
          
          // Update product status to draft
          await shopify.product.update(product.id, {
            status: 'draft'
          });
          
          draftedCount++;
        }
      }
      
      // Setup for next page if there are more products
      params = products.length === 250 ? { limit: 250, since_id: products[products.length - 1].id } : null;
      
    } while (params !== null);
    
    console.log(`Process complete! Checked ${productCount} products, set ${draftedCount} products to draft.`);
    
  } catch (error) {
    console.error('An error occurred:', error.message);
    process.exit(1);
  }
}

// Run the main function
setProductsWithoutImagesToDraft();
