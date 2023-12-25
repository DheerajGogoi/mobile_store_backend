# Mobile Ordering Website Backend

This repository contains the backend code for the Mobile Ordering Website.

## Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/DheerajGogoi/mobile_store_backend.git
   
2. **Navigate to the project directory:**
  
    ```bash
    cd mobile-ordering-backend

3. **Install dependencies:**

    ```bash
    npm install

5. Create a .env file in the project root with the following content:

   ```code
   SECRET_KEY=your-secret-key-for-jwt
   DB_URL=mongodb://localhost:27017/mobile_ordering_db
   PORT=3000
  Replace your-secret-key-for-jwt with your desired secret key.

6. **Start the backend server:**

   ```bash
   node index.js
