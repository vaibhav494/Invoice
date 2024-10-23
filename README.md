
# Project Setup Guide

## Running the Application

Follow these steps to run the application:

### 1. Run the Client
Navigate to the client folder and start the development server:
```bash
npm run dev
```

### 2. Run the Server
In the server folder, start the server using Nodemon or Node:
```bash
nodemon index
```
**OR**
```bash
node index
```

### 3. Run Ngrok
Start Ngrok to expose your local server, enabling it to receive Clerk webhooks:
```bash
ngrok http [YOUR_SERVER_PORT_NUMBER]
```
> Replace `[YOUR_SERVER_PORT_NUMBER]` with your actual server port number.  
> Retrieve the Ngrok URL from your account and configure it as the webhook endpoint in Clerk.

---

## Required Setup

Before running the application, ensure the following configurations are in place:

### 1. Clerk
- Set up Clerk for user authentication.
- Configure webhooks in Clerk to send user data to the Ngrok URL.

### 2. Ngrok
- Use Ngrok to expose your local server, allowing it to receive webhooks from Clerk.
- Sign in to your Ngrok account to access your personalized Ngrok settings.