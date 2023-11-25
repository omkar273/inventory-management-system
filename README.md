# Inventory Management with Alan AI 📦🚀

Welcome to our innovative Inventory Management project, seamlessly integrated with Alan AI's Conversational AI SDK. Elevate your inventory game by predicting sales, identifying top-performing products, and managing billing and payments—all with the power of AI. Let's get started!

## Features

- **AI-ML Integration:** Leverage predictive analytics for accurate sales forecasts and product performance insights.
- **Billing and Payments:** Streamline financial processes with integrated billing and payment functionalities.
- **User-Friendly Interface:** Enjoy an intuitive and delightful user experience for efficient navigation.
- **Seamless Voice Interaction:** Alan AI SDK ensures effortless integration for voice commands and human-like conversations.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- MongoDB and NucliaDB for stable data management.

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

1. **Create a new firebase project**
[firebase console](https://console.firebase.google.com/u/0/)
3. **Add a new web app in that project **
   After adding new web app in your project section you will get a config similar to this
  ```shell
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
Copy this anf navigate to
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

