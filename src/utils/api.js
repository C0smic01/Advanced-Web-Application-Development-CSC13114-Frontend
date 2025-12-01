import { mockUsers, mockEmails, mockMailboxes } from '../data/mockData';

// Simulated network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Token storage
let accessToken = null;
let refreshToken = localStorage.getItem('refreshToken');

// API Configuration
const API_CONFIG = {
  ACCESS_TOKEN_EXPIRY: 15 * 60 * 1000, // 15 minutes
  REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// Token management
export const tokenManager = {
  getAccessToken: () => accessToken,
  setAccessToken: (token) => {
    accessToken = token;
  },
  getRefreshToken: () => refreshToken,
  setRefreshToken: (token) => {
    refreshToken = token;
    if (token) {
      localStorage.setItem('refreshToken', token);
    } else {
      localStorage.removeItem('refreshToken');
    }
  },
  clearTokens: () => {
    accessToken = null;
    refreshToken = null;
    localStorage.removeItem('refreshToken');
  }
};

// Generate mock JWT token
const generateToken = (type = 'access') => {
  const expiry = type === 'access' 
    ? Date.now() + API_CONFIG.ACCESS_TOKEN_EXPIRY
    : Date.now() + API_CONFIG.REFRESH_TOKEN_EXPIRY;
  
  return btoa(JSON.stringify({
    type,
    expiry,
    random: Math.random().toString(36)
  }));
};

// Validate token
const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decoded = JSON.parse(atob(token));
    return decoded.expiry > Date.now();
  } catch {
    return false;
  }
};

// Auth API
export const authAPI = {
  // Email + Password login
  login: async (email, password) => {
    await delay(800);
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    const newAccessToken = generateToken('access');
    const newRefreshToken = generateToken('refresh');
    
    tokenManager.setAccessToken(newAccessToken);
    tokenManager.setRefreshToken(newRefreshToken);
    
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar
      },
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    };
  },
  
  // Google Sign-In (mock)
  googleSignIn: async (credential) => {
    await delay(1000);
    
    // In a real app, this would validate the Google credential with the backend
    // For now, we'll just create a mock user from the Google data
    const mockGoogleUser = {
      id: '2',
      email: 'google.user@gmail.com',
      name: 'Google User',
      avatar: 'GU'
    };
    
    const newAccessToken = generateToken('access');
    const newRefreshToken = generateToken('refresh');
    
    tokenManager.setAccessToken(newAccessToken);
    tokenManager.setRefreshToken(newRefreshToken);
    
    return {
      user: mockGoogleUser,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    };
  },
  
  // Refresh access token
  refreshAccessToken: async () => {
    await delay(300);
    
    const currentRefreshToken = tokenManager.getRefreshToken();
    
    if (!isTokenValid(currentRefreshToken)) {
      tokenManager.clearTokens();
      throw new Error('Refresh token expired');
    }
    
    const newAccessToken = generateToken('access');
    tokenManager.setAccessToken(newAccessToken);
    
    return {
      accessToken: newAccessToken
    };
  },
  
  // Logout
  logout: async () => {
    await delay(200);
    tokenManager.clearTokens();
    return { success: true };
  },
  
  // Get current user (validate session)
  getCurrentUser: async () => {
    await delay(300);
    
    const token = tokenManager.getAccessToken();
    
    if (!isTokenValid(token)) {
      throw new Error('Session expired');
    }
    
    // Return mock user
    return {
      id: '1',
      email: 'demo@example.com',
      name: 'Demo User',
      avatar: 'DU'
    };
  }
};

// Email API
export const emailAPI = {
  // Get mailboxes
  getMailboxes: async () => {
    await delay(400);
    
    const token = tokenManager.getAccessToken();
    if (!isTokenValid(token)) {
      throw new Error('Unauthorized');
    }
    
    return mockMailboxes;
  },
  
  // Get emails for a mailbox
  getEmails: async (mailboxId, { page = 1, limit = 50 } = {}) => {
    await delay(600);
    
    const token = tokenManager.getAccessToken();
    if (!isTokenValid(token)) {
      throw new Error('Unauthorized');
    }
    
    const filteredEmails = mockEmails.filter(email => email.mailbox === mailboxId);
    const start = (page - 1) * limit;
    const end = start + limit;
    
    return {
      emails: filteredEmails.slice(start, end),
      total: filteredEmails.length,
      page,
      limit
    };
  },
  
  // Get email by ID
  getEmail: async (emailId) => {
    await delay(400);
    
    const token = tokenManager.getAccessToken();
    if (!isTokenValid(token)) {
      throw new Error('Unauthorized');
    }
    
    const email = mockEmails.find(e => e.id === emailId);
    if (!email) {
      throw new Error('Email not found');
    }
    
    return email;
  },
  
  // Mark email as read/unread
  toggleRead: async (emailId, isRead) => {
    await delay(300);
    
    const token = tokenManager.getAccessToken();
    if (!isTokenValid(token)) {
      throw new Error('Unauthorized');
    }
    
    const email = mockEmails.find(e => e.id === emailId);
    if (email) {
      email.isRead = isRead;
    }
    
    return { success: true };
  },
  
  // Toggle star
  toggleStar: async (emailId, isStarred) => {
    await delay(300);
    
    const token = tokenManager.getAccessToken();
    if (!isTokenValid(token)) {
      throw new Error('Unauthorized');
    }
    
    const email = mockEmails.find(e => e.id === emailId);
    if (email) {
      email.isStarred = isStarred;
    }
    
    return { success: true };
  },
  
  // Delete email
  deleteEmail: async (emailId) => {
    await delay(400);
    
    const token = tokenManager.getAccessToken();
    if (!isTokenValid(token)) {
      throw new Error('Unauthorized');
    }
    
    const index = mockEmails.findIndex(e => e.id === emailId);
    if (index !== -1) {
      mockEmails[index].mailbox = 'trash';
    }
    
    return { success: true };
  },
  
  // Send email (mock)
  sendEmail: async (emailData) => {
    await delay(800);
    
    const token = tokenManager.getAccessToken();
    if (!isTokenValid(token)) {
      throw new Error('Unauthorized');
    }
    
    const newEmail = {
      id: String(Date.now()),
      mailbox: 'sent',
      from: {
        name: 'Demo User',
        email: 'demo@example.com',
        avatar: 'DU'
      },
      to: emailData.to,
      cc: emailData.cc || [],
      subject: emailData.subject,
      body: emailData.body,
      preview: emailData.body.substring(0, 100) + '...',
      timestamp: new Date(),
      isRead: true,
      isStarred: false,
      hasAttachments: false,
      attachments: []
    };
    
    mockEmails.unshift(newEmail);
    
    return { success: true, email: newEmail };
  }
};

// API Client with automatic refresh
export class APIClient {
  constructor() {
    this.refreshPromise = null;
  }
  
  async request(apiCall) {
    try {
      return await apiCall();
    } catch (error) {
      if (error.message === 'Unauthorized' || error.message === 'Session expired') {
        // Try to refresh token
        try {
          if (!this.refreshPromise) {
            this.refreshPromise = authAPI.refreshAccessToken();
          }
          
          await this.refreshPromise;
          this.refreshPromise = null;
          
          // Retry the original request
          return await apiCall();
        } catch (refreshError) {
          // Refresh failed, force logout
          tokenManager.clearTokens();
          window.location.href = '/login';
          throw new Error('Session expired. Please login again.');
        }
      }
      
      throw error;
    }
  }
}

export const apiClient = new APIClient();
