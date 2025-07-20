# ZenDoc - Healthcare Management Platform

<div align="center">
  <img src="public/next.svg" alt="ZenDoc Logo" width="200" height="50">

  **A comprehensive healthcare management platform facilitating online medical consultations and appointment scheduling**

  [![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Material-UI](https://img.shields.io/badge/MUI-7.2.0-007FFF?style=flat-square&logo=mui)](https://mui.com/)
  [![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.8.2-764ABC?style=flat-square&logo=redux)](https://redux-toolkit.js.org/)

</div>

## 🏥 About ZenDoc

ZenDoc is a modern healthcare management platform that bridges the gap between healthcare providers and patients through digital transformation. The platform makes healthcare more accessible through online consultations, streamlined appointment management, and comprehensive medical record keeping.

### 🎯 Key Features

- **🏥 Multi-Role Dashboard System** - Separate interfaces for patients, doctors, admins, and super admins
- **📅 Appointment Management** - Complete scheduling, booking, and management system
- **👨‍⚕️ Doctor Profiles & Specialties** - Comprehensive doctor information with specialty categorization
- **📹 Video Consultations** - Integrated video calling functionality for remote consultations
- **💳 Health Plans** - Various healthcare plan options with detailed comparison features
- **👥 User Management** - Complete user lifecycle management with role-based access control
- **💰 Payment Integration** - Secure payment processing for consultations and services
- **📋 Medical Records** - Patient history and comprehensive medical record management
- **📊 Analytics Dashboard** - Detailed insights and reporting for administrators

## 🚀 Technology Stack

### Frontend Framework
- **Next.js 15.3.5** with App Router architecture
- **React 19** with TypeScript for type safety
- **Material-UI (MUI) v7** as the primary component library

### State Management
- **Redux Toolkit** with RTK Query for efficient API calls
- **React Hook Form** with Zod validation for robust form handling
- **Redux Persist** for state persistence

### Development Tools
- **TypeScript** for static type checking
- **ESLint** for code linting
- **Husky** for Git hooks
- **Motion** for smooth animations

### Additional Libraries
- **Agora React UIKit** for video calling functionality
- **Day.js** for date manipulation
- **JWT Decode** for authentication
- **Sonner** for toast notifications

## 🏗️ Project Structure

```
zendoc-frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (public)/          # Public pages (landing, auth)
│   │   ├── (dashboard)/       # Protected dashboard routes
│   │   └── (profile)/         # User profile management
│   ├── components/            # Reusable UI components
│   │   ├── Dashboard/         # Dashboard-specific components
│   │   ├── Forms/            # Form components (PH-prefixed)
│   │   ├── Shared/           # Common components
│   │   └── UI/               # Feature-specific UI components
│   ├── redux/                # State management
│   │   ├── features/         # Feature-based Redux slices
│   │   └── api/              # RTK Query API definitions
│   ├── types/                # TypeScript type definitions
│   ├── utils/                # Utility functions
│   ├── services/             # API services
│   └── assets/               # Static assets
├── public/                   # Public static files
└── docs/                     # Documentation
```

## 🛠️ Setup & Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm
- **Git**

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Zihad550/zendoc-frontend.git
   cd zendoc-frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Environment Configuration**

   Create a `.env.local` file in the root directory:
   ```env
   # Backend API Configuration
   NEXT_PUBLIC_BACKEND_API_URL=http://localhost:8000/api/v1

   # Video Call Configuration
   NEXT_PUBLIC_VIDEO_CALL_APP_ID=your_agora_app_id

   # Additional environment variables as needed
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server with Turbopack |
| `pnpm build` | Build the application for production |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint for code linting |
| `pnpm type:check` | Run TypeScript type checking |
| `pnpm test` | Run tests in watch mode |
| `pnpm test:run` | Run tests once |
| `pnpm test:coverage` | Run tests with coverage report |

## 👥 User Roles & Features

### 🏥 Patient Dashboard
- Book and manage appointments
- View medical history and records
- Access video consultations
- Manage personal profile and preferences
- View and select health plans

### 👨‍⚕️ Doctor Dashboard
- Manage appointment schedules
- Conduct video consultations
- Update profile and specialties
- View patient information
- Manage availability and time slots

### 🔧 Admin Dashboard
- Manage doctors and their profiles
- Oversee appointment scheduling
- Manage specialties and categories
- Monitor system activities
- Generate reports and analytics

### ⚡ Super Admin Dashboard
- Complete user management system
- Advanced analytics and reporting
- System configuration and settings
- Bulk operations and data management
- Security and access control

## 🚀 Deployment

### Production Build

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Environment Variables

Ensure all required environment variables are set in your production environment:

- `NEXT_PUBLIC_BACKEND_API_URL` - Backend API endpoint
- `NEXT_PUBLIC_VIDEO_CALL_APP_ID` - Agora video call app ID

## 🤝 Contributing

We welcome contributions to ZenDoc! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Use TypeScript for all new code
- Write tests for new features
- Use PH-prefixed components for custom form elements
- Follow the established project structure
- Ensure all tests pass before submitting PR

## 📝 Code Style & Conventions

- **TypeScript** - Strict type checking required
- **Component Naming** - PascalCase for components, camelCase for utilities
- **File Organization** - Feature-based organization
- **Form Components** - Use PH prefix (PHForm, PHInput, PHModal)
- **State Management** - Redux Toolkit with feature-based slices
- **Styling** - Material-UI components with theme system

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [https://zendoc-frontend.vercel.app](https://zendoc-frontend.vercel.app)
- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/Zihad550/zendoc-frontend/issues)

## 📞 Support

For support and questions:

- **Email**: jehadhossain008@gmail.com
- **Documentation**: Check the [docs/](docs/) directory
- **Issues**: Create an issue on GitHub

---

<div align="center">
  <p>Built with ❤️ by Jehad Hossain(Zihad550)</p>
  <p>Making healthcare accessible through technology</p>
</div>
