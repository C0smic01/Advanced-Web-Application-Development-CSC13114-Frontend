# 📧 Email Dashboard - React Authentication & Email Client

A beautiful, modern email dashboard built with React, featuring secure authentication (Email/Password + Google Sign-In) and a polished 3-column email interface.

![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.3.4-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.7-cyan?logo=tailwindcss)

## ✨ Features

### 🔐 Authentication
- **Email + Password Login** with client-side validation
- **Google Sign-In Integration** (OAuth mock)
- **JWT Token Management** (Access + Refresh tokens)
- **Protected Routes** with automatic redirect
- **Automatic Token Refresh** with concurrency handling
- **Session Persistence** across page refreshes

### 📬 Email Dashboard
- **3-Column Layout**
  - Sidebar: Mailbox/folder navigation with unread counts
  - Email List: Paginated email list with search and quick actions
  - Email Detail: Full email view with attachments and reply options
- **Real-time Actions**
  - Mark as read/unread
  - Star/unstar emails
  - Delete emails
  - Reply, Reply All, Forward
- **Beautiful UI/UX**
  - Modern gradient design with custom fonts (DM Sans, Sora)
  - Smooth animations and transitions
  - Responsive layout (desktop-first)
  - Custom scrollbars and hover effects
  - Glass morphism effects

## 🛠️ Tech Stack

- **Frontend Framework:** React 18.3.1
- **Build Tool:** Vite 5.3.4
- **Styling:** Tailwind CSS 3.4.7
- **Routing:** React Router DOM 6.26.0
- **Icons:** Lucide React 0.263.1
- **State Management:** React Context API
- **API Client:** Custom implementation with automatic refresh

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Modern web browser

### Installation

1. **Clone or download the repository**
```bash
cd email-dashboard-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 🔑 Demo Credentials

Use these credentials to test the application:

- **Email:** `demo@example.com`
- **Password:** `password123`

Or click "Sign in with Google" for a simulated Google OAuth flow.

## 📱 Usage

### Login Flow
1. Navigate to `/login`
2. Enter credentials or use Google Sign-In
3. Upon successful authentication, you'll be redirected to `/inbox`
4. Access token is stored in-memory, refresh token in localStorage

### Email Dashboard
1. **Sidebar (Left)**: Browse mailboxes (Inbox, Starred, Sent, etc.)
2. **Email List (Middle)**: View all emails in selected mailbox
3. **Email Detail (Right)**: Read full email content, download attachments

### Token Management
- **Access Token**: Stored in-memory (expires in 15 minutes)
- **Refresh Token**: Stored in localStorage (expires in 7 days)
- **Automatic Refresh**: When access token expires, refresh token is used automatically
- **Concurrency Handling**: Multiple failed requests trigger only one refresh call
- **Force Logout**: If refresh token expires, user is logged out automatically

## 🏗️ Project Structure

```
email-dashboard-app/
├── public/                # Static assets
├── src/
│   ├── components/
│   │   ├── auth/         # Authentication components
│   │   │   ├── LoginPage.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── dashboard/    # Dashboard components
│   │   │   ├── EmailDashboard.jsx (Main 3-column layout)
│   │   │   ├── Sidebar.jsx
│   │   │   ├── EmailList.jsx
│   │   │   └── EmailDetail.jsx
│   │   └── common/       # Reusable components
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       └── Avatar.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx  # Authentication state management
│   ├── data/
│   │   └── mockData.js      # Mock email data
│   ├── utils/
│   │   └── api.js          # API client & token management
│   ├── App.jsx             # Main app with routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🔒 Security Considerations

### Token Storage

**Access Token (In-Memory)**
- ✅ Most secure option
- ✅ Not accessible via XSS
- ✅ Lost on page refresh (by design)
- ❌ Requires refresh on reload

**Refresh Token (localStorage)**
- ⚠️ Persistent across sessions
- ⚠️ Vulnerable to XSS attacks
- ✅ Enables seamless user experience
- ✅ Long-lived (7 days)

**Why this approach?**
- Access tokens are short-lived (15 min) and kept in-memory for maximum security
- Refresh tokens allow users to stay logged in without frequent re-authentication
- In production, consider using HttpOnly cookies for refresh tokens (requires backend support)

### Security Features Implemented
1. **Client-side form validation**
2. **Error handling** for auth failures
3. **Automatic token refresh** before expiry
4. **Protected routes** requiring authentication
5. **HTTPS recommended** for production deployment

### Production Recommendations
- [ ] Store refresh tokens in **HttpOnly Secure cookies**
- [ ] Implement **CSRF protection** (if using cookies)
- [ ] Add **rate limiting** for login attempts
- [ ] Enable **2FA** for sensitive accounts
- [ ] Use **HTTPS** for all connections
- [ ] Implement **token rotation** on refresh
- [ ] Add **device fingerprinting** for security

## 🎨 Design Philosophy

This application follows a **modern, sophisticated design** with:

- **Typography**: DM Sans (body) + Sora (display) for elegance
- **Colors**: Primary gradient (indigo → purple → pink) with depth
- **Animations**: Smooth transitions, fade-ins, and micro-interactions
- **Layout**: Generous whitespace, clear visual hierarchy
- **Accessibility**: Keyboard navigation, focus states, semantic HTML

The UI avoids generic "AI-generated" aesthetics by:
- Using distinctive font choices (not Inter/Roboto)
- Implementing custom color gradients
- Adding thoughtful animations and hover effects
- Creating depth with shadows and glass morphism

## 📝 API Endpoints (Mock)

All API calls are mocked for demonstration:

```javascript
// Authentication
POST   /api/auth/login           // Email/password login
POST   /api/auth/google          // Google OAuth
POST   /api/auth/refresh         // Refresh access token
POST   /api/auth/logout          // Logout

// Emails
GET    /api/mailboxes            // List mailboxes
GET    /api/mailboxes/:id/emails // List emails in mailbox
GET    /api/emails/:id           // Get email detail
POST   /api/emails/:id/toggle-read
POST   /api/emails/:id/toggle-star
POST   /api/emails/:id/delete
POST   /api/emails/send          // Send new email
```

## 🚀 Deployment

### Recommended Platforms

**Netlify** (Easiest)
```bash
npm run build
# Drag and drop 'dist' folder to Netlify
```

**Vercel**
```bash
npm run build
vercel --prod
```

**Firebase Hosting**
```bash
npm run build
firebase deploy
```

### Environment Variables
For production deployment with real backend:

```env
VITE_API_URL=https://your-backend-api.com
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## 🧪 Testing Scenarios

1. **Login Flow**
   - ✅ Valid credentials → successful login
   - ✅ Invalid credentials → error message
   - ✅ Google Sign-In → simulated OAuth flow
   - ✅ Form validation → inline error messages

2. **Token Management**
   - ✅ Access token stored in-memory
   - ✅ Refresh token persists in localStorage
   - ✅ Automatic refresh on 401 error
   - ✅ Force logout on refresh failure
   - ✅ Session persists across page refresh

3. **Email Operations**
   - ✅ Browse mailboxes
   - ✅ View email list with pagination
   - ✅ Read full email content
   - ✅ Mark as read/unread
   - ✅ Star/unstar emails
   - ✅ Delete emails
   - ✅ View attachments

4. **UI/UX**
   - ✅ Responsive layout
   - ✅ Smooth animations
   - ✅ Loading states
   - ✅ Error handling
   - ✅ Empty states

## 📄 License

This project is created for educational purposes as part of a React authentication assignment.

## 👤 Author

**Student ID:** 22120409

## 📚 Assignment Compliance

This project fulfills all requirements for **G03 - React Authentication + Email Dashboard Mockup**:

✅ **Authentication**
- [x] Email/Password login with validation
- [x] Google Sign-In integration
- [x] JWT token management (access + refresh)
- [x] Token refresh mechanism
- [x] Protected routes

✅ **Email Dashboard**
- [x] 3-column layout (folders, list, detail)
- [x] Mock API for emails
- [x] Mailbox navigation
- [x] Email list with actions
- [x] Full email detail view
- [x] Compose/Reply/Forward UI

✅ **UI/UX**
- [x] Beautiful, modern design
- [x] Responsive layout
- [x] Animations and transitions
- [x] Form validation
- [x] Error handling
- [x] Loading states

✅ **Technical Requirements**
- [x] React 18.3.1
- [x] Vite build tool
- [x] Tailwind CSS styling
- [x] React Router for routing
- [x] Context API for state management
- [x] Clean code organization

---

**Built with ❤️ using React + Vite + Tailwind CSS**
