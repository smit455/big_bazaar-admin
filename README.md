# Admin Panel for E-commerce Project

## Overview
This is the admin panel for an e-commerce platform built using **Next.js** and **TypeScript**. The admin panel allows administrators to manage the online store effectively. Key features include creating and managing stores, billboards, products, and orders, as well as managing product attributes like colors, sizes, and prices. The panel also includes an overview page for quick insights into the platform's performance and data.

## Features
- **User Authentication**: Secure registration and login using Clerk.
- **Store Management**: Create and manage stores for the e-commerce platform.
- **Billboard Management**: Add and update promotional billboards displayed on the user site.
- **Product Management**: Add, update, and delete products with attributes like colors, sizes, and prices.
- **Order Management**: Track and manage customer orders.
- **Overview Page**: Get quick insights into sales, orders, and other key metrics.
- **Stripe Integration**: Secure and seamless payment processing using Stripe.

## Technologies Used
- **Framework**: Next.js
- **Language**: TypeScript
- **Authentication**: Clerk for user registration and login
- **Styling**: CSS/SCSS or a CSS-in-JS solution like Tailwind CSS 
- **Database**: Prisma
- **Payment**: Stripe

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/smit455/big_bazaar-admin.git
   cd big_bazaar-admin-admin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the necessary environment variables. Example:
   ```env
   DATABASE_URL=your-database-url
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-public-key
   CLERK_SECRET_KEY=your-secret-key
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
   STRIPE_API_KEY=your-key
   STRIPE_WEBHOOK_SECRET=your-secret
   FRONTEND_STORE_URL=your-store-url
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.

## Scripts
- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm start`: Start the production server
- `npm run lint`: Run linting
- `npm run postinstall`: For prisma generate

## Key Features Description

### 1. User Authentication
The admin panel uses Clerk for secure user registration and login. This ensures only authorized personnel can access the admin features.

### 2. Overview Page
The overview page provides a snapshot of the platform's performance, including sales, orders, and other essential metrics.

### 3. Store Management
Admins can create, update, and delete stores. Each store serves as a container for products, billboards, and orders.

### 4. Billboard Management
Billboards allow admins to highlight promotional content. Admins can add, update, and remove billboards.

### 5. Product Management
Admins can:
- Add new products with details like name, description, price, and inventory.
- Manage product attributes such as colors and sizes.
- Update or delete existing products.

### 6. Order Management
Admins can view and manage customer orders, including order status updates (e.g., processing, shipped, delivered).

### 7. Stripe Integration
Stripe is integrated for payment processing. It securely handles transactions and webhook events to ensure smooth financial operations.


---
