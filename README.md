# Task Manager - Full Stack Web Application

A production-ready mini web application built with React, Node.js, Express, and MongoDB. Features secure JWT authentication and a complete task management system.

## 🌐 Tech Stack

### Frontend
- **React.js** (Vite) - Modern React framework with fast build tooling
- **Tailwind CSS** - Utility-first CSS framework for clean, modern UI
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing

### Backend
- **Node.js + Express** - Server framework
- **MongoDB + Mongoose** - Database and ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## 📁 Project Structure

```
.
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service functions
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── package.json
│   └── vite.config.js
│
└── server/                 # Express backend
    ├── config/             # Configuration files
    ├── controllers/        # Route controllers
    ├── middleware/         # Custom middleware
    ├── models/             # Mongoose models
    ├── routes/             # API routes
    ├── server.js           # Entry point
    └── package.json
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp env.example .env
   ```

4. **Configure environment variables in `.env`:**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   CLIENT_URL=http://localhost:5173
   ```

   **Note:** For MongoDB Atlas, use:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
   ```

5. **Start MongoDB:**
   - If using local MongoDB, ensure the service is running
   - If using MongoDB Atlas, your connection string is ready

6. **Start the server:**
   ```bash
   npm run dev
   ```
   Or for production:
   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

## 📡 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/signup` | Register a new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/profile` | Get user profile | Private |
| PUT | `/api/auth/profile` | Update user profile | Private |

### Task Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/tasks` | Create a new task | Private |
| GET | `/api/tasks` | Get all tasks (with filters) | Private |
| PUT | `/api/tasks/:id` | Update a task | Private |
| DELETE | `/api/tasks/:id` | Delete a task | Private |

### Query Parameters (GET /api/tasks)
- `status` - Filter by status (`pending` or `completed`)
- `search` - Search in title and description

### Request/Response Examples

#### Signup
```json
POST /api/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

#### Create Task
```json
POST /api/tasks
Headers: { "Authorization": "Bearer jwt_token" }
{
  "title": "Complete project",
  "description": "Finish the task manager app",
  "status": "pending"
}

Response:
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "task": {
      "_id": "task_id",
      "title": "Complete project",
      "description": "Finish the task manager app",
      "status": "pending",
      "createdBy": "user_id",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication with 1-day expiration
- **Password Hashing**: bcrypt with salt rounds for secure password storage
- **Input Validation**: Server-side validation using express-validator
- **Protected Routes**: Middleware to protect sensitive endpoints
- **CORS Configuration**: Configured for secure cross-origin requests
- **Error Handling**: Proper error handling without exposing sensitive information

## 💻 Frontend Features

### Public Pages
- **Signup Page**: User registration with form validation
- **Login Page**: User authentication

### Protected Pages
- **Dashboard**: Main application interface
  - User profile display
  - Task list with cards
  - Create task modal
  - Edit task functionality
  - Delete task with confirmation
  - Search tasks by title/description
  - Filter tasks by status (pending/completed)
  - Responsive design for mobile and desktop
  - Logout functionality

### UI/UX Features
- Clean, modern design with Tailwind CSS
- Responsive layout (mobile-first approach)
- Card-based task display
- Top navigation bar
- Form validation with error messages
- Loading states
- Modal dialogs for task creation/editing

## 🏗️ Architecture

### Backend Architecture
- **MVC Pattern**: Separation of concerns with Models, Views (Controllers), and Routes
- **Middleware**: Authentication and validation middleware
- **Error Handling**: Centralized error handling
- **Environment Variables**: Secure configuration management

### Frontend Architecture
- **Component-Based**: Reusable React components
- **Service Layer**: API calls abstracted in service files
- **Protected Routes**: Route protection with React Router
- **Axios Interceptors**: Automatic JWT token attachment and error handling

## 📦 How to Scale for Production

### Backend Scaling

1. **Environment Variables:**
   - Use strong, random JWT_SECRET
   - Set NODE_ENV=production
   - Use secure MongoDB connection strings
   - Configure proper CORS origins

2. **Database:**
   - Use MongoDB Atlas or managed MongoDB service
   - Implement database indexing for performance
   - Set up database backups
   - Consider read replicas for high traffic

3. **Security:**
   - Implement rate limiting (express-rate-limit)
   - Add helmet.js for security headers
   - Use HTTPS only
   - Implement request size limits
   - Add input sanitization

4. **Performance:**
   - Implement caching (Redis)
   - Add compression middleware
   - Use PM2 for process management
   - Implement logging (Winston, Morgan)
   - Add monitoring (Sentry, New Relic)

5. **Deployment:**
   - Use containerization (Docker)
   - Deploy to cloud platforms (AWS, Heroku, DigitalOcean)
   - Set up CI/CD pipelines
   - Use environment-specific configurations

### Frontend Scaling

1. **Build Optimization:**
   - Use production build (`npm run build`)
   - Implement code splitting
   - Optimize bundle size
   - Use CDN for static assets

2. **State Management:**
   - Consider Redux or Zustand for complex state
   - Implement proper state caching

3. **Performance:**
   - Implement lazy loading for routes
   - Optimize images and assets
   - Use React.memo for expensive components
   - Implement virtual scrolling for large lists

4. **Deployment:**
   - Deploy to Vercel, Netlify, or AWS S3
   - Configure proper environment variables
   - Set up custom domain with SSL

### Additional Production Considerations

1. **Testing:**
   - Add unit tests (Jest)
   - Add integration tests
   - Add E2E tests (Cypress, Playwright)

2. **Documentation:**
   - API documentation (Swagger/OpenAPI)
   - Code documentation
   - Deployment guides

3. **Monitoring:**
   - Error tracking
   - Performance monitoring
   - User analytics
   - Uptime monitoring

4. **Features to Add:**
   - Email verification
   - Password reset functionality
   - Task categories/tags
   - Task due dates
   - Task priorities
   - User avatars
   - Real-time updates (WebSockets)
   - File attachments
   - Task sharing/collaboration

## 🧪 Testing the Application

1. **Start both servers:**
   - Backend: `cd server && npm run dev`
   - Frontend: `cd client && npm run dev`

2. **Test Authentication:**
   - Sign up with a new account
   - Login with credentials
   - Verify JWT token is stored

3. **Test Task Management:**
   - Create a new task
   - Edit task details
   - Change task status
   - Search for tasks
   - Filter by status
   - Delete a task

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

For support, please open an issue in the repository.

---

**Built with ❤️ using modern web technologies**
