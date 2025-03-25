"use client";

import React from 'react';
import Link from 'next/link';
import { GanttChart, Settings, Info, Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <GanttChart className="h-6 w-6" />
            <h1 className="text-xl font-semibold tracking-tight truncate">
              <Link href="/">CPS 230 Risk Copilot Setup</Link>
            </h1>
          </div>
          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/about">
                <Info className="h-5 w-5" />
                <span className="sr-only">About</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/yourusername/risk-agent-setup" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/settings">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className={cn("flex-1 w-full", className)}>
        {children}
      </main>
      <footer className="border-t bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between py-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CPS 230 Risk Assessment Copilot
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
} 