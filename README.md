# Clap - A Chat Application

This is a simple chat application built using React, Express, Prisma, and Socket.IO.

## Features

- **Real-time Communication**: Utilizes Socket.IO for real-time communication between users.
- **Authentication**: Users can sign up and log in securely using JWT authentication.
- **User Profiles**: Users can view their profiles and update their information.
- **Group Chats**: Users can create and join group chats to communicate with multiple users.
- **Message History**: Chat history is stored in a database for users to access their old messages.
- **Responsive Design**: The application is responsive and works well on different devices.

## Installation

1. Clone the repository:

```
https://github.com/CodeSumeet/clap.git
```

2. Install dependencies:

```
cd chat-application
npm install
```

3. Set up the environment variables:

Create a `.env` file in the root directory and add the following variables:

```
PORT=3001
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
```

Replace `your_database_url` with your PostgreSQL database URL and `your_secret_key` with a secret key for JWT authentication.

4. Run the application:

```
npm start
```

## Usage

1. Sign up for an account or log in if you already have one.
2. Create or join group chats to start communicating with other users.
3. View your profile and update your information if needed.
4. Start chatting in real-time with other users.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.
