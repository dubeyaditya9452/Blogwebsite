# Blogspherse - Blog Website

A full-stack blog website built with React, Node.js, Express, and MongoDB.

## Features

- User Authentication (Login/Register)
- Responsive Design
- Modern UI with Tailwind CSS
- Secure Password Handling
- MongoDB Database Integration

## Tech Stack

**Frontend:**
- React
- React Router DOM
- Axios
- Tailwind CSS

**Backend:**
- Node.js
- Express
- MongoDB
- JWT Authentication
- Bcrypt

## Installation

1. Clone the repository
```bash
git clone [your-repo-url]
cd Blogwebsite
```

2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up MongoDB
- Install MongoDB Compass
- Connect to mongodb://localhost:27017

4. Start the Application
```bash
# Start backend (from root directory)
cd backend
npm run dev

# Start frontend (in another terminal)
cd frontend
npm run dev
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blogwebsite
JWT_SECRET=your-secret-key
```

## API Endpoints

### Auth Routes
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/) 