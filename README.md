
# Task Manager Application

A modern, responsive task management application built with React that helps users organize, prioritize, and track their tasks effectively.

## Live Demo

**URL**: https://lovable.dev/projects/adf46a8a-8e35-43a9-a4f7-bd23aae171ed

## Features

- **User Authentication**: Secure login and registration system
- **Task Management**: Create, edit, and delete tasks
- **Kanban Board**: Organize tasks in a visual To-Do, In Progress, and Completed columns
- **Drag & Drop**: Intuitively move tasks between status columns
- **Task Prioritization**: Set Low, Medium, or High priorities for your tasks
- **Due Dates**: Assign and track deadlines for better time management
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technologies Used

- **Frontend**: React, TypeScript, React Router DOM
- **State Management**: React Context API
- **UI Components**: shadcn/ui component library
- **Styling**: Tailwind CSS for modern, responsive design
- **Data Fetching**: TanStack React Query

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

## Usage Guide

1. **Registration/Login**: Create a new account or login with demo credentials
   - Demo Email: test@example.com
   - Demo Password: password123

2. **Dashboard**: View your tasks organized by status (To-Do, In Progress, Completed)

3. **Creating Tasks**: Click the "Add Task" button to create a new task with title, description, priority, and due date

4. **Managing Tasks**: Drag and drop tasks between columns to update their status, or edit/delete tasks using the task card options

## Project Structure

```
src/
├── components/         # Reusable UI components
├── context/            # React Context for state management
├── hooks/              # Custom React hooks
├── pages/              # Main application pages
├── lib/                # Utility functions and helpers
└── index.css           # Global styles
```

## Deployment

This project can be deployed using the built-in deployment feature in Lovable:
1. Open [Lovable](https://lovable.dev/projects/adf46a8a-8e35-43a9-a4f7-bd23aae171ed) 
2. Click on Share -> Publish

## Custom Domain Setup

To use a custom domain with your application, refer to the [Custom domains documentation](https://docs.lovable.dev/tips-tricks/custom-domain/)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide Icons](https://lucide.dev/)
