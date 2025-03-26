"use client";

import React from 'react';
import { useSetup } from '@/lib/setup-context';
import { Bot, FileText, Workflow, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function WelcomeStep() {
  const { state, updateState } = useSetup();

  React.useEffect(() => {
    // Mark this step as viewed when component mounts
    if (!state.completedSteps.includes(0)) {
      updateState({
        completedSteps: [...state.completedSteps, 0]
      });
    }
  }, [state.completedSteps, updateState]);

  function handleNext() {
    updateState({
      currentStep: state.currentStep + 1,
    });
  }

  return (
    <div className="space-y-6">
      <Alert className="bg-blue-50 border-blue-100">
        <AlertDescription className="text-blue-700">
          <p className="font-medium mb-1">CPS 230 Risk Assessment Copilot</p>
          <p className="text-sm">This wizard will guide you through the process of setting up a specialized AI Copilot for conducting operational risk assessments in compliance with APRA CPS 230 requirements.</p>
          <p className="text-sm mt-2">The CPS 230 Risk Assessment Copilot uses a structured 6-step methodology to analyze business processes, identify risks, and recommend appropriate controls, helping your organization achieve and maintain regulatory compliance.</p>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-md p-4">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="h-5 w-5 text-violet-500" />
            <h3 className="font-medium">AI-Powered Risk Assessment</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            The Copilot agent helps your risk and compliance team analyze business processes systematically, identifying operational risks and control gaps in alignment with APRA CPS 230 requirements.
          </p>
        </div>

        <div className="border rounded-md p-4">
          <div className="flex items-center gap-2 mb-2">
            <Workflow className="h-5 w-5 text-green-500" />
            <h3 className="font-medium">Structured Methodology</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Follow a consistent 6-step approach: Process Summary, Process Details, Failure Points, Risk Register, Expected Controls, and Gap Analysis.
          </p>
        </div>

        <div className="border rounded-md p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-orange-500" />
            <h3 className="font-medium">Built-In Templates</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Includes ready-to-use templates for system prompts, risk taxonomy, controls framework, and output formats aligned with regulatory requirements.
          </p>
        </div>

        <div className="border rounded-md p-4">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-5 w-5 text-red-500" />
            <h3 className="font-medium">APRA CPS 230 Compliance</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Designed specifically for Australian superannuation companies to meet operational risk management requirements under CPS 230.
          </p>
        </div>
      </div>

      <div className="border rounded-md p-5">
        <h3 className="font-medium mb-4">Prerequisites</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="min-w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-xs font-medium text-blue-700">1</span>
            </div>
            <div>
              <p className="text-sm font-medium">Microsoft 365 Subscription</p>
              <p className="text-sm text-muted-foreground">With access to Microsoft Copilot Studio and SharePoint</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="min-w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-xs font-medium text-blue-700">2</span>
            </div>
            <div>
              <p className="text-sm font-medium">Process Documentation</p>
              <p className="text-sm text-muted-foreground">Digital copies of your business process documents (Word, PDF)</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="min-w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-xs font-medium text-blue-700">3</span>
            </div>
            <div>
              <p className="text-sm font-medium">SharePoint Environment</p>
              <p className="text-sm text-muted-foreground">Ability to create or use an existing SharePoint site</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="min-w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-xs font-medium text-blue-700">4</span>
            </div>
            <div>
              <p className="text-sm font-medium">Administrative Access</p>
              <p className="text-sm text-muted-foreground">Permissions to create Copilot agents and manage SharePoint content</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button className="flex items-center gap-1" onClick={handleNext}>
            Start Setup
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
} 