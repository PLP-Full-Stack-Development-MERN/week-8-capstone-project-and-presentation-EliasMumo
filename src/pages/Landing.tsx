
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { CheckCircle, ArrowRight } from 'lucide-react';

const Landing = () => {
  const { user } = useAuth();

  const features = [
    {
      title: "Task Organization",
      description: "Organize tasks with a Kanban-style board to visualize workflow"
    },
    {
      title: "Priority Management",
      description: "Set priorities and due dates to stay on top of important tasks"
    },
    {
      title: "Drag & Drop Interface",
      description: "Intuitive drag and drop functionality for easy task management"
    },
    {
      title: "Progress Tracking",
      description: "Track task progress from To-Do to Completed with ease"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <div className="relative bg-gradient-to-b from-background to-secondary/20 px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 animate-fade-in">
            Effortlessly Manage Your Tasks
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
            A beautifully designed task management application that helps you organize, prioritize, and track your tasks effectively.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <Link to={user ? "/dashboard" : "/login"}>
              <Button size="lg" className="w-full sm:w-auto">
                {user ? "Go to Dashboard" : "Get Started"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            {!user && (
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Designed for Simplicity and Productivity
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-start p-4 rounded-lg border border-border animate-fade-in"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="py-16 px-4 bg-gradient-to-t from-background to-secondary/20 mt-auto">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Ready to boost your productivity?
          </h2>
          <Link to={user ? "/dashboard" : "/register"}>
            <Button size="lg" className="animate-fade-in">
              {user ? "Go to Dashboard" : "Sign Up Now"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Task Manager. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
