export const mockMailboxes = [
  {
    id: "inbox",
    name: "Inbox",
    icon: "inbox",
    unreadCount: 12,
    color: "blue",
  },
  {
    id: "starred",
    name: "Starred",
    icon: "star",
    unreadCount: 3,
    color: "yellow",
  },
  {
    id: "sent",
    name: "Sent",
    icon: "send",
    unreadCount: 0,
    color: "green",
  },
  {
    id: "drafts",
    name: "Drafts",
    icon: "file-text",
    unreadCount: 2,
    color: "gray",
  },
  {
    id: "archive",
    name: "Archive",
    icon: "archive",
    unreadCount: 0,
    color: "purple",
  },
  {
    id: "trash",
    name: "Trash",
    icon: "trash-2",
    unreadCount: 0,
    color: "red",
  },
  {
    id: "work",
    name: "Work",
    icon: "briefcase",
    unreadCount: 5,
    color: "indigo",
  },
  {
    id: "personal",
    name: "Personal",
    icon: "user",
    unreadCount: 2,
    color: "pink",
  },
];

export const mockEmails = [
  {
    id: "1",
    mailbox: "inbox",
    from: {
      name: "Sarah Johnson",
      email: "sarah.j@techcorp.com",
      avatar: "SJ",
    },
    to: ["you@example.com"],
    cc: [],
    subject: "Q4 Marketing Campaign Results & Analysis",
    preview:
      "Hey team, I wanted to share the final results from our Q4 marketing campaign. The numbers exceeded our expectations...",
    body: `
      <div>
        <p>Hey team,</p>
        <p>I wanted to share the final results from our Q4 marketing campaign. The numbers exceeded our expectations across all key metrics:</p>
        <ul>
          <li>Email open rate: 34.5% (↑12% from Q3)</li>
          <li>Click-through rate: 8.2% (↑15% from Q3)</li>
          <li>Conversion rate: 3.8% (↑20% from Q3)</li>
          <li>Total revenue: $485K (↑28% from Q3)</li>
        </ul>
        <p>The personalization strategy we implemented really paid off. I'll be preparing a detailed presentation for next week's meeting.</p>
        <p>Let me know if you have any questions!</p>
        <p>Best,<br/>Sarah</p>
      </div>
    `,
    timestamp: new Date("2024-11-22T09:30:00"),
    isRead: false,
    isStarred: true,
    hasAttachments: true,
    attachments: [
      {
        id: "a1",
        name: "Q4_Campaign_Results.pdf",
        size: "2.4 MB",
        type: "application/pdf",
      },
      {
        id: "a2",
        name: "Analytics_Dashboard.xlsx",
        size: "1.1 MB",
        type: "application/vnd.ms-excel",
      },
    ],
  },
  {
    id: "2",
    mailbox: "inbox",
    from: {
      name: "GitHub",
      email: "noreply@github.com",
      avatar: "GH",
    },
    to: ["you@example.com"],
    cc: [],
    subject: "[security] Your SSH key was just added",
    preview:
      "A new SSH key was added to your account. If you believe this was done in error, please contact support immediately...",
    body: `
      <div>
        <h2>New SSH Key Added</h2>
        <p>A new SSH key was added to your account at 2024-11-22 08:15 UTC.</p>
        <p><strong>Key fingerprint:</strong> SHA256:abc123def456ghi789jkl012mno345pqr678stu901vwx234</p>
        <p>If you believe this was done in error, please <a href="#">contact support</a> immediately and change your password.</p>
        <p>Best regards,<br/>The GitHub Team</p>
      </div>
    `,
    timestamp: new Date("2024-11-22T08:15:00"),
    isRead: false,
    isStarred: false,
    hasAttachments: false,
    attachments: [],
  },
  {
    id: "3",
    mailbox: "inbox",
    from: {
      name: "Michael Chen",
      email: "m.chen@designstudio.com",
      avatar: "MC",
    },
    to: ["you@example.com"],
    cc: ["team@designstudio.com"],
    subject: "Design System Update - New Components Available",
    preview:
      "Hi everyone! I just pushed the latest version of our design system to production. Here's what's new...",
    body: `
      <div>
        <p>Hi everyone!</p>
        <p>I just pushed the latest version of our design system to production. Here's what's new:</p>
        <h3>New Components:</h3>
        <ul>
          <li>Advanced data tables with sorting and filtering</li>
          <li>Toast notification system</li>
          <li>Loading skeletons for better perceived performance</li>
          <li>Date picker with range selection</li>
        </ul>
        <h3>Updates:</h3>
        <ul>
          <li>Improved accessibility across all components</li>
          <li>Dark mode support for remaining components</li>
          <li>Better TypeScript definitions</li>
        </ul>
        <p>Check out the <a href="#">updated documentation</a> for usage examples.</p>
        <p>Michael</p>
      </div>
    `,
    timestamp: new Date("2024-11-21T16:45:00"),
    isRead: true,
    isStarred: true,
    hasAttachments: false,
    attachments: [],
  },
  {
    id: "4",
    mailbox: "inbox",
    from: {
      name: "LinkedIn",
      email: "messages@linkedin.com",
      avatar: "LI",
    },
    to: ["you@example.com"],
    cc: [],
    subject: "You appeared in 47 searches this week",
    preview:
      "Your profile has been showing up in recruiter searches. Update your profile to increase your visibility...",
    body: `
      <div>
        <h2>Your Weekly Profile Views</h2>
        <p>Your profile appeared in <strong>47 searches</strong> this week. That's 23% more than last week!</p>
        <p>Top search terms that led to your profile:</p>
        <ul>
          <li>Senior Frontend Developer</li>
          <li>React Expert</li>
          <li>UI/UX Engineer</li>
        </ul>
        <p>Want to increase your visibility? <a href="#">Update your profile</a> with your latest achievements.</p>
      </div>
    `,
    timestamp: new Date("2024-11-21T12:00:00"),
    isRead: false,
    isStarred: false,
    hasAttachments: false,
    attachments: [],
  },
  {
    id: "5",
    mailbox: "inbox",
    from: {
      name: "Emily Rodriguez",
      email: "emily.r@startup.io",
      avatar: "ER",
    },
    to: ["you@example.com"],
    cc: ["investors@startup.io"],
    subject: "Series A Fundraising Update - Exciting News!",
    preview:
      "I'm thrilled to announce that we've successfully closed our Series A round! Here are the details...",
    body: `
      <div>
        <p>Team,</p>
        <p>I'm thrilled to announce that we've successfully closed our Series A round!</p>
        <h3>Key Highlights:</h3>
        <ul>
          <li>💰 Raised: $15M</li>
          <li>🎯 Valuation: $75M</li>
          <li>🤝 Lead Investor: Sequoia Capital</li>
          <li>📈 Growth Plan: Expanding team by 50 people</li>
        </ul>
        <p>This funding will allow us to accelerate product development and expand into European markets.</p>
        <p>Thank you all for your incredible work that made this possible!</p>
        <p>Cheers,<br/>Emily</p>
      </div>
    `,
    timestamp: new Date("2024-11-21T10:30:00"),
    isRead: false,
    isStarred: true,
    hasAttachments: true,
    attachments: [
      {
        id: "a3",
        name: "Series_A_Deck.pdf",
        size: "8.7 MB",
        type: "application/pdf",
      },
    ],
  },
  {
    id: "6",
    mailbox: "work",
    from: {
      name: "David Kim",
      email: "d.kim@techcorp.com",
      avatar: "DK",
    },
    to: ["you@example.com"],
    cc: [],
    subject: "Code Review Request - Authentication Module",
    preview:
      "Could you please review the PR for the new authentication module? I've implemented JWT tokens with refresh logic...",
    body: `
      <div>
        <p>Hi,</p>
        <p>Could you please review the PR for the new authentication module?</p>
        <p>I've implemented:</p>
        <ul>
          <li>JWT tokens with access/refresh token pattern</li>
          <li>OAuth2 integration (Google + GitHub)</li>
          <li>Rate limiting for login attempts</li>
          <li>Session management with Redis</li>
        </ul>
        <p>PR Link: <a href="#">#247 - Authentication Refactor</a></p>
        <p>The tests are passing, but I'd appreciate your feedback on the security implementation.</p>
        <p>Thanks!<br/>David</p>
      </div>
    `,
    timestamp: new Date("2024-11-20T15:20:00"),
    isRead: true,
    isStarred: false,
    hasAttachments: false,
    attachments: [],
  },
  {
    id: "7",
    mailbox: "personal",
    from: {
      name: "Netflix",
      email: "info@netflix.com",
      avatar: "NF",
    },
    to: ["you@example.com"],
    cc: [],
    subject: "New releases just for you 🎬",
    preview:
      "Check out these new shows and movies we think you'll love based on your viewing history...",
    body: `
      <div>
        <h2>New On Netflix</h2>
        <p>Based on your viewing history, we think you'll enjoy:</p>
        <h3>Trending Now:</h3>
        <ul>
          <li>The Crown - Season 6</li>
          <li>Stranger Things - Final Season</li>
          <li>Black Mirror - New Episodes</li>
        </ul>
        <p><a href="#">Start watching now</a></p>
      </div>
    `,
    timestamp: new Date("2024-11-20T08:00:00"),
    isRead: true,
    isStarred: false,
    hasAttachments: false,
    attachments: [],
  },
  {
    id: "8",
    mailbox: "inbox",
    from: {
      name: "Alex Morgan",
      email: "alex.m@agency.com",
      avatar: "AM",
    },
    to: ["you@example.com"],
    cc: [],
    subject: "Meeting Rescheduled - Project Kickoff",
    preview:
      "Hi! I need to reschedule our project kickoff meeting due to a client emergency. Would Wednesday at 2 PM work for you?",
    body: `
      <div>
        <p>Hi!</p>
        <p>I need to reschedule our project kickoff meeting due to a client emergency that came up.</p>
        <p>Original time: Tuesday, Nov 23 at 10 AM<br/>
        New proposed time: Wednesday, Nov 24 at 2 PM</p>
        <p>Would this work for you? If not, please let me know your availability for the rest of the week.</p>
        <p>Apologies for the inconvenience!</p>
        <p>Best,<br/>Alex</p>
      </div>
    `,
    timestamp: new Date("2024-11-19T17:45:00"),
    isRead: false,
    isStarred: false,
    hasAttachments: false,
    attachments: [],
  },
  {
    id: "9",
    mailbox: "work",
    from: {
      name: "Jessica Lee",
      email: "j.lee@techcorp.com",
      avatar: "JL",
    },
    to: ["you@example.com", "team@techcorp.com"],
    cc: [],
    subject: "Team Lunch Tomorrow - Mexican Restaurant",
    preview:
      "Hey team! Just confirming our lunch plans for tomorrow at La Fiesta at 12:30 PM. Who's in?",
    body: `
      <div>
        <p>Hey team!</p>
        <p>Just confirming our lunch plans for tomorrow:</p>
        <p><strong>When:</strong> Tomorrow (Nov 23) at 12:30 PM<br/>
        <strong>Where:</strong> La Fiesta Mexican Restaurant<br/>
        <strong>Address:</strong> 123 Main Street</p>
        <p>Please reply by EOD today so I can make a reservation for the right number of people.</p>
        <p>Current headcount: 8 people</p>
        <p>See you there!<br/>Jessica</p>
      </div>
    `,
    timestamp: new Date("2024-11-19T14:20:00"),
    isRead: true,
    isStarred: false,
    hasAttachments: false,
    attachments: [],
  },
  {
    id: "10",
    mailbox: "inbox",
    from: {
      name: "Stack Overflow",
      email: "notifications@stackoverflow.com",
      avatar: "SO",
    },
    to: ["you@example.com"],
    cc: [],
    subject: "Your answer has received 25 upvotes!",
    preview:
      'Congratulations! Your answer to "How to implement JWT authentication in React" has received 25 upvotes...',
    body: `
      <div>
        <h2>Your Answer is Popular!</h2>
        <p>Congratulations! Your answer has received <strong>25 upvotes</strong> and has been marked as the accepted answer.</p>
        <p><strong>Question:</strong> "How to implement JWT authentication in React?"</p>
        <p>You've earned 265 reputation points and the following badges:</p>
        <ul>
          <li>🏆 Good Answer</li>
          <li>⭐ Helpful</li>
        </ul>
        <p><a href="#">View your answer</a></p>
      </div>
    `,
    timestamp: new Date("2024-11-19T11:00:00"),
    isRead: true,
    isStarred: false,
    hasAttachments: false,
    attachments: [],
  },
];

// Mock users for auth
export const mockUsers = [
  {
    id: "1",
    email: "demo@example.com",
    password: "password123",
    name: "Demo User",
    avatar: "DU",
  },
];
