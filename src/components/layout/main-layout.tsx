"use client";

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main className={cn("flex-1 w-full", className)}>
        <div className="max-w-screen-2xl mx-auto w-full">
          {children}
        </div>
      </main>
      <footer className="border-t bg-white py-3 mt-auto">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CPS 230 Risk Assessment Copilot
          </p>
        </div>
      </footer>
    </div>
  );
} 