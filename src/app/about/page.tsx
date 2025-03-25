"use client";

import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileText, Github, Home } from 'lucide-react';

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="container py-10">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>About CPS 230 Risk Assessment Copilot</CardTitle>
            <CardDescription>
              A custom Microsoft Copilot Studio agent for APRA CPS 230 compliance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Project Overview</h3>
              <p className="text-muted-foreground">
                The CPS 230 Risk Assessment Copilot is a custom Microsoft Copilot Studio agent designed 
                for Australian superannuation companies to comply with APRA CPS 230 requirements. It helps 
                risk and compliance teams analyze business processes for operational risks and controls.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Structured 6-step methodology for risk assessment</li>
                <li>Integration with SharePoint for document access</li>
                <li>Industry-specific risk taxonomy and controls framework</li>
                <li>Automated process summarization and failure point analysis</li>
                <li>Control recommendations based on risk categories</li>
                <li>Gap analysis between expected and documented controls</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Technology Stack</h3>
              <p className="text-muted-foreground">
                Built using Microsoft Copilot Studio, SharePoint integration, and Microsoft 365 environment.
                This setup application is created with Next.js, Tailwind CSS, and Shadcn UI components.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 pt-4">
              <Button asChild variant="outline" className="flex items-center gap-2">
                <a href="https://github.com/yourusername/risk-agent-setup" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  GitHub Repository
                </a>
              </Button>
              
              <Button asChild variant="outline" className="flex items-center gap-2">
                <a href="/documentation.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="h-5 w-5" />
                  Documentation
                </a>
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Return to Setup
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
} 