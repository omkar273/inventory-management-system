# Inventory Management System 📦🚀

[See all projects ](https://omkarsonawane.netlify.app)


Welcome to our cutting-edge Inventory Management System, seamlessly integrated with Alan AI's Conversational AI SDK. Elevate your inventory game by predicting sales, identifying top-performing products, and managing billing and payments—all powered by AI magic. Let's embark on this journey together!

## Key Features

- **AI-ML Integration:** Leverage predictive analytics for precise sales forecasts and insights into product performance.
- **Billing and Payments:** Streamline financial processes with seamlessly integrated billing and payment functionalities.
- **User-Friendly Interface:** Enjoy an intuitive and delightful user experience for efficient navigation.

## Getting Started

### Prerequisites

Ensure you have Node.js installed on your machine.

### Installation

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/omkar273/inventory-management-system
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

### Configuration

1. **Firebase Setup:**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/u/0/).
   - Add a new web app to your project and copy the Firebase config.
   - Navigate to `src/firebase/config.js` and replace the existing config with your own.

   ```javascript
   const firebaseConfig = {
     apiKey: "...",
     authDomain: "...",
     projectId: "...",
     storageBucket: "...",
     messagingSenderId: "...",
     appId: "...",
     measurementId: "....",
   };

    ```

   
Copy this config navigate to
```
src / firebase / config.js
```

and replace the config there with your own


### Running the App

1. **Start the Server:**
    ```bash
    npm start
    ```

2. **Open in Browser:**
    Visit `http://localhost:3000` to access the inventory management website.

