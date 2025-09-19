# Library Management System

A modern React-based library management system for organizing and tracking your personal book collection.

## Features

- **Dashboard** - Overview with statistics and key metrics
- **Book Collection** - Browse and manage your books with filters
- **Master Books** - Complete book management with detailed information
- **Stock Management** - Track book inventory and stock levels
- **Requirements** - Manage needed books and purchase planning

## Technologies Used

- React 18 with modern hooks
- React Router for navigation
- Tailwind CSS for styling
- Framer Motion for animations
- Radix UI components
- Lucide React icons
- Vite for build tooling

## Local Development

1. **Prerequisites**: Node.js 18+ and npm

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## GitHub Pages Deployment

This project is configured for GitHub Pages deployment:

1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Set source to "GitHub Actions"
4. The workflow will automatically build and deploy your app

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, cards, etc.)
│   ├── books/          # Book-related components
│   ├── dashboard/      # Dashboard components
│   └── requirements/   # Requirements components
├── pages/              # Page components
├── entities/           # Data models and storage
├── lib/                # Utilities and helpers
└── main.jsx           # Application entry point
```

## Data Storage

The app uses localStorage for data persistence. In a production environment, you would typically replace this with a proper backend API.

## License

MIT License - feel free to use this project as a starting point for your own library management system.