"use client";

import React from 'react';
import { useSetup } from '@/lib/setup-context';
import { Database, FolderOpen, Upload, Lock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Accordion } from '@/components/ui/accordion';

export function SharePointStep() {
  const { state, updateState } = useSetup();

  React.useEffect(() => {
    // Mark this step as viewed when component mounts
    if (!state.completedSteps.includes(2)) {
      updateState({
        completedSteps: [...state.completedSteps, 2]
      });
    }
  }, []);

  const accordionItems = [
    {
      id: 'dedicated-site',
      title: '1. Create a Dedicated SharePoint Site',
      icon: <Database className="h-5 w-5 text-primary" />,
      content: (
        <div className="space-y-3">
          <p className="text-sm">This site will host all the process documentation and reference materials needed by the Copilot agent.</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="rounded-full border h-5 w-5 flex items-center justify-center mt-0.5">
                <span className="text-xs">1</span>
              </div>
              <span>Log in to SharePoint Admin Center</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full border h-5 w-5 flex items-center justify-center mt-0.5">
                <span className="text-xs">2</span>
              </div>
              <span>Create a new site with a descriptive name (e.g., &ldquo;CPS230-Risk-Assessment&rdquo;)</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full border h-5 w-5 flex items-center justify-center mt-0.5">
                <span className="text-xs">3</span>
              </div>
              <span>Configure site permissions for your risk and compliance team</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'document-libraries',
      title: '2. Create Document Libraries',
      icon: <FolderOpen className="h-5 w-5 text-primary" />,
      content: (
        <div className="space-y-3">
          <p className="text-sm">Organize your content in separate document libraries for easy access and management.</p>
          <div className="space-y-4">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Process Documents Library</h4>
              <p className="text-xs text-muted-foreground">For your business process documentation</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Reference Documents Library</h4>
              <p className="text-xs text-muted-foreground">For templates, risk taxonomy, and controls framework files</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Assessment Outputs Library (optional)</h4>
              <p className="text-xs text-muted-foreground">For storing completed risk assessments</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'upload-documents',
      title: '3. Upload Documents',
      icon: <Upload className="h-5 w-5 text-primary" />,
      content: (
        <div className="space-y-3">
          <p className="text-sm">Upload all necessary documents to their respective libraries.</p>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Process Documents</h4>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>All business process documentation PDFs</li>
              <li>Use consistent naming conventions for better organization</li>
              <li>Consider adding metadata for improved searchability</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Reference Documents</h4>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Risk taxonomy document</li>
              <li>Controls framework</li>
              <li>Process analysis template</li>
              <li>CPS 230 assessment guidelines</li>
              <li>Any other reference materials needed by the agent</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'configure-permissions',
      title: '4. Configure Permissions',
      icon: <Lock className="h-5 w-5 text-primary" />,
      content: (
        <div className="space-y-3">
          <p className="text-sm">Ensure the right permissions are set for security and access.</p>
          <div className="space-y-4">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Microsoft Copilot Studio Access</h4>
              <p className="text-xs text-muted-foreground">Ensure the service account for Copilot Studio has read access to the document libraries</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium">User Access</h4>
              <p className="text-xs text-muted-foreground">Grant appropriate permissions to risk and compliance team members</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">SharePoint Best Practices</h4>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Use clear, descriptive file names that indicate process type</li>
              <li>Consider adding version control for documents that change frequently</li>
              <li>Create a consistent folder structure if organizing documents in subfolders</li>
              <li>Test access with the service account before configuring the Copilot agent</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Alert className="bg-blue-50 border-blue-100">
        <AlertDescription className="text-sm text-blue-700">
          A properly structured SharePoint environment is essential for the Copilot agent to access and analyze your process documents.
        </AlertDescription>
      </Alert>

      <Accordion items={accordionItems} defaultOpen="dedicated-site" />
    </div>
  );
} 