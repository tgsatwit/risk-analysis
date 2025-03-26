"use client";

import React from 'react';
import { useSetup } from '@/lib/setup-context';
import { Accordion } from '@/components/ui/accordion';
import { FileText, CheckCircle2, ListTodo, Folder } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function OverviewStep() {
  const { state, updateState } = useSetup();

  React.useEffect(() => {
    // Mark this step as viewed when component mounts
    if (!state.completedSteps.includes(1)) {
      updateState({
        completedSteps: [...state.completedSteps, 1]
      });
    }
  }, [state.completedSteps, updateState]);

  const accordionItems = [
    {
      id: 'implementation-process',
      title: '1. Implementation Process',
      icon: <Folder className="h-5 w-5 text-primary" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm">The implementation consists of three main phases:</p>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Phase 1: Prepare SharePoint Environment</h4>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Create a dedicated SharePoint site for hosting process documentation</li>
                <li>Upload process PDFs to a dedicated document library</li>
                <li>Upload reference documents (risk taxonomy, controls framework, etc.)</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Phase 2: Set Up Copilot Studio Agent</h4>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Follow the detailed instructions in the deployment guide</li>
                <li>Configure the agent with the system prompt, knowledge sources, and starter prompts</li>
                <li>Test with sample process documents before full deployment</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Phase 3: Roll Out to Users</h4>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Share the user guide with the risk and compliance team</li>
                <li>Consider conducting training sessions on effective use of the agent</li>
                <li>Establish a feedback mechanism for continuous improvement</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'required-resources',
      title: '2. Required Resources',
      icon: <FileText className="h-5 w-5 text-primary" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm">This wizard will present all the resources you need for implementation:</p>
          
          <div className="space-y-4">
            <div className="border rounded-md p-4 space-y-2">
              <h4 className="text-sm font-medium">Core Configuration Files</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><span className="font-medium">System Prompt</span> - Base instructions for the Copilot agent</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><span className="font-medium">Starter Prompts</span> - Conversation starters for the agent</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><span className="font-medium">Deployment Guide</span> - Step-by-step setup instructions</span>
                </li>
              </ul>
            </div>

            <div className="border rounded-md p-4 space-y-2">
              <h4 className="text-sm font-medium">Templates & Reference</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><span className="font-medium">Process Analysis Template</span> - Output format for assessments</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><span className="font-medium">Risk Taxonomy</span> - Organization&apos;s risk category definitions</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><span className="font-medium">Controls Framework</span> - Standard controls for risk types</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'assessment-process',
      title: '3. The 6-Step Risk Assessment Process',
      icon: <ListTodo className="h-5 w-5 text-primary" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm">The Copilot agent is designed to guide users through this structured analysis approach:</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="border rounded-md p-3 bg-gray-50">
              <h4 className="text-sm font-medium">1. Process Summary</h4>
              <p className="text-xs text-muted-foreground">Provide an executive summary of the process documentation</p>
            </div>
            
            <div className="border rounded-md p-3 bg-gray-50">
              <h4 className="text-sm font-medium">2. Process Details Table</h4>
              <p className="text-xs text-muted-foreground">Extract key process steps, roles, systems, and other components</p>
            </div>
            
            <div className="border rounded-md p-3 bg-gray-50">
              <h4 className="text-sm font-medium">3. Failure Point Analysis</h4>
              <p className="text-xs text-muted-foreground">Identify what could go wrong at each step of the process</p>
            </div>
          
            <div className="border rounded-md p-3 bg-gray-50">
              <h4 className="text-sm font-medium">4. Risk Consolidation</h4>
              <p className="text-xs text-muted-foreground">Consolidate failure points into a formal risk register with categorization</p>
            </div>
            
            <div className="border rounded-md p-3 bg-gray-50">
              <h4 className="text-sm font-medium">5. Expected Controls</h4>
              <p className="text-xs text-muted-foreground">Recommend appropriate controls for each identified risk</p>
            </div>
            
            <div className="border rounded-md p-3 bg-gray-50">
              <h4 className="text-sm font-medium">6. Gap Analysis</h4>
              <p className="text-xs text-muted-foreground">Compare expected controls to what&apos;s documented in the process</p>
            </div>
          </div>
        </div>
      ),
    }
  ];

  return (
    <div className="space-y-6">
      <Alert className="bg-blue-50 border-blue-100">
        <AlertDescription className="text-sm text-blue-700">
          This wizard will guide you through implementing a CPS 230 Risk Assessment Copilot for your Australian superannuation company.
        </AlertDescription>
      </Alert>

      <Accordion items={accordionItems} defaultOpen="implementation-process" />
    </div>
  );
} 