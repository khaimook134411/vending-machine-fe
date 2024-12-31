# Vending Machine Frontend

This repository contains the frontend of the vending machine application, built with [Next.js](https://nextjs.org/), [React](https://react.dev/), and styled with [Tailwind CSS](https://tailwindcss.com/). It serves as the user interface for managing vending machine operations and interacting with the backend.

## Features
- Styled with Tailwind CSS for rapid UI development
- Axios integration for API calls to the backend

## Prerequisites
Before running this project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 20 or above recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/khaimook134411/vending-machine-fe.git
cd vending-machine-fe
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Application
To start the development server:
```bash
npm run dev
```
This will start the application on `http://localhost:4000`.

### 4. Build for Production
To create a production-ready build:
```bash
npm run build
```
Start the production server:
```bash
npm run start
```

## Project Structure
```
/
├── src/
   ├── app/              # Next.js pages (routes)
       ├── globals.css   # Global and Tailwind CSS styles
   ├── components/       # Reusable React components
   ├── data/             # Data model
├── public/              # Static assets
├── package.json         # Project configuration and dependencies
├── next.config.js       # Next.js configuration
```

## Scripts
The following npm scripts are available:
- `npm run dev`: Start the development server on port 4000
- `npm run build`: Build the application for production
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint to lint your code

## Environment Variables
This application uses environment variables for configuration. Create a `.env.local` file in the root directory with the following:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```
Replace `http://localhost:3000` with the URL of your backend service.

## Backend Integration
This frontend application is designed to work with the [backend repository](https://github.com/khaimook134411/vending-machine-be). Ensure the backend is running before interacting with the frontend.

## Development Workflow
- **Adding Dependencies:** Use `npm install <package>` to add new dependencies.
- **Styling:** Use Tailwind CSS utility classes for styling.
- **API Integration:** Use Axios for making API calls to the backend.
