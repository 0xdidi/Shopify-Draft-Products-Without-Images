# Shopify Draft Products Without Images

This repository contains a script that automatically sets Shopify products without images (either product or variant images) to draft status. The script is configured to run daily via GitHub Actions.

## How It Works

1. The script uses the Shopify API to fetch all products from your store
2. It checks each product to see if it has any images (either product-level or variant-level)
3. Any published product without images is set to draft status
4. The script runs automatically once per day via GitHub Actions

## Setup Instructions

### 1. Create Shopify API Access

1. Log in to your Shopify admin panel
2. Go to Apps > Develop apps
3. Click "Create an app"
4. Give the app a name (e.g., "Draft Products Automation")
5. Configure the app with Admin API access
6. Set necessary scopes:
   - `read_products` 
   - `write_products`
7. Install the app in your store
8. Save the API key, API secret key, and your shop name

### 2. Set Up GitHub Secrets

Add the following secrets to your GitHub repository:

1. `SHOPIFY_SHOP_NAME`: Your shop name (example: your-store.myshopify.com)
2. `SHOPIFY_API_KEY`: The API key from your Shopify app
3. `SHOPIFY_API_PASSWORD`: The API password (or access token) from your Shopify app

### 3. Deploy to GitHub

1. Clone this repository
2. Push to your own GitHub repository
3. The GitHub Action will automatically run on schedule (2:00 AM UTC daily)
4. You can also manually trigger the workflow from the "Actions" tab

## Manual Execution

If you want to run the script locally:

1. Clone the repository
2. Create a `.env` file with the following content:
   ```
   SHOPIFY_SHOP_NAME=your-store.myshopify.com
   SHOPIFY_API_KEY=your_api_key
   SHOPIFY_API_PASSWORD=your_api_password
   ```
3. Install dependencies: `npm install`
4. Run the script: `npm start`

## Customization

- To change the schedule, edit the cron expression in `.github/workflows/shopify-draft-products.yml`
- To modify the script behavior, edit `script.js`

## Troubleshooting

If you encounter issues:

1. Check the GitHub Actions logs for detailed error messages
2. Verify your Shopify API credentials are correct
3. Make sure your API app has the necessary permissions
4. Check if you've hit Shopify API rate limits (current implementation includes basic pagination to handle large stores)
