"use client";

import React from 'react';
import { useSetup } from '@/lib/setup-context';
import { 
  Users, 
  GraduationCap,
  MessageSquare,
  ClipboardCheck,
  Share2,
  BookOpen,
  RefreshCw,
  ShieldCheck
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { Accordion } from '@/components/ui/accordion';

export function DeploymentStep() {
  const { state, updateState } = useSetup();

  React.useEffect(() => {
    // Mark this step as viewed when component mounts
    if (!state.completedSteps.includes(5)) {
      updateState({
        completedSteps: [...state.completedSteps, 5]
      });
    }
  }, []);

  const accordionItems = [
    {
      id: 'share-access',
      title: '1. Share Access',
      icon: <Share2 className="h-5 w-5 text-primary" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-3">
            Grant access to the Copilot for your risk and compliance team.
          </p>
          <div className="bg-gray-50 p-4 rounded-md border space-y-3">
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
              <li>
                <span className="font-medium">Microsoft Teams:</span> Add the Copilot as an app in your team's channels
              </li>
              <li>
                <span className="font-medium">Direct Link:</span> Share the direct URL to the Copilot
              </li>
              <li>
                <span className="font-medium">SharePoint:</span> Add a link to the Copilot on your risk management SharePoint page
              </li>
              <li>
                <span className="font-medium">Email Announcement:</span> Send an announcement email with access instructions
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'share-documentation',
      title: '2. Share Documentation',
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-3">
            Distribute the user guide and other supporting documentation.
          </p>
          <div className="bg-gray-50 p-4 rounded-md border">
            <div className="space-y-4">
              <div className="pb-3 border-b border-gray-200">
                <h4 className="text-sm font-medium mb-2">User Guide</h4>
                <p className="text-xs text-gray-500">
                  Share the comprehensive user guide that explains how to use the Copilot effectively, with examples of different request types and the 6-step assessment approach.
                </p>
                <div className="mt-2">
                  <Link href="/docs/user-guide" className="text-xs text-blue-600 hover:underline">
                    View User Guide Template
                  </Link>
                </div>
              </div>
              
              <div className="pb-3 border-b border-gray-200">
                <h4 className="text-sm font-medium mb-2">Quick Start Guide</h4>
                <p className="text-xs text-gray-500">
                  Create a 1-2 page quick reference document with key commands and examples for new users.
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">FAQ Document</h4>
                <p className="text-xs text-gray-500">
                  Prepare answers to common questions about the Copilot's capabilities, limitations, and best practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'training-sessions',
      title: '3. Conduct Training Sessions',
      icon: <GraduationCap className="h-5 w-5 text-primary" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-3">
            Train your team on effective use of the Copilot agent.
          </p>
          <div className="bg-gray-50 p-4 rounded-md border">
            <div className="space-y-4">
              <div className="pb-3 border-b border-gray-200">
                <h4 className="text-sm font-medium mb-1">Introductory Workshops</h4>
                <p className="text-xs text-gray-500">Schedule 1-hour workshops to introduce the Copilot's features and functionality.</p>
              </div>
              
              <div className="pb-3 border-b border-gray-200">
                <h4 className="text-sm font-medium mb-1">Hands-On Exercises</h4>
                <p className="text-xs text-gray-500">Provide sample process documents for users to practice with during training.</p>
              </div>
              
              <div className="pb-3 border-b border-gray-200">
                <h4 className="text-sm font-medium mb-1">Advanced User Training</h4>
                <p className="text-xs text-gray-500">More in-depth sessions for power users who will be conducting regular assessments.</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Recording & Materials</h4>
                <p className="text-xs text-gray-500">Record training sessions and make them available for future reference.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'feedback-mechanism',
      title: '4. Establish Feedback Mechanism',
      icon: <MessageSquare className="h-5 w-5 text-primary" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-3">
            Create a process for collecting user feedback and continuous improvement.
          </p>
          <div className="bg-gray-50 p-4 rounded-md border space-y-3">
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
              <li>
                <span className="font-medium">Regular Check-ins:</span> Schedule monthly check-ins with key users
              </li>
              <li>
                <span className="font-medium">Feedback Form:</span> Create a simple form for users to submit improvement suggestions
              </li>
              <li>
                <span className="font-medium">Usage Analytics:</span> Monitor usage patterns to identify adoption issues
              </li>
              <li>
                <span className="font-medium">Issue Tracking:</span> Establish a process for logging and addressing issues
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'maintenance-governance',
      title: '5. Maintenance & Governance',
      icon: <ShieldCheck className="h-5 w-5 text-primary" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <RefreshCw className="h-4 w-4 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Regular Updates</p>
                <p className="text-xs text-gray-500">Review and update reference materials as regulations change</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <ClipboardCheck className="h-4 w-4 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Knowledge Base Maintenance</p>
                <p className="text-xs text-gray-500">Keep process documentation library current</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Users className="h-4 w-4 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">User Community</p>
                <p className="text-xs text-gray-500">Encourage sharing of best practices among users</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Compliance Oversight</p>
                <p className="text-xs text-gray-500">Ensure ongoing alignment with AI governance policies</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <Alert className="bg-blue-50 border-blue-100">
        <AlertDescription className="text-blue-700">
          A successful deployment involves proper user training and support to ensure adoption and effective use of the Copilot.
        </AlertDescription>
      </Alert>

      <Accordion items={accordionItems} defaultOpen="share-access" />
    </div>
  );
} 