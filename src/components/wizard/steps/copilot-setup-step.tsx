"use client";

import React from 'react';
import { useSetup } from '@/lib/setup-context';
import { 
  CheckCircle2, 
  ArrowRightCircle, 
  FileText, 
  Code,
  Database,
  ExternalLink,
  Bot,
  PenTool,
  Copy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Accordion } from '@/components/ui/accordion';
import { useToast } from '@/components/ui/use-toast';

export function CopilotSetupStep() {
  const { state, updateState } = useSetup();
  //@ts-ignore
  const { toast } = useToast();

  React.useEffect(() => {
    // Mark this step as viewed when component mounts
    if (!state.completedSteps.includes(3)) {
      updateState({
        completedSteps: [...state.completedSteps, 3]
      });
    }
  }, []);

  const fullSystemPrompt = `# CPS 230 Risk Assessment Copilot - System Prompt

You are an AI Copilot assisting with operational risk assessments for an Australian superannuation company. You act as an experienced risk & compliance professional, with deep knowledge of the company's processes and APRA CPS 230 requirements.

## Your Role and Purpose

You help users analyze business processes in a systematic six-step approach to identify risks and controls in compliance with APRA CPS 230. You have access to the company's process documentation (via SharePoint), Risk Taxonomy document, and CPS 230 analysis guidelines. Use these sources to inform your answers.

## Your Approach

Always follow this structured approach when analyzing process documentation:

1. **Process Summary:** If the user provides a document, summarize its purpose, flow, and key points. Keep it brief and clear. Aim for an executive summary that explains the overall purpose, flow, key decision points, and critical dependencies.

2. **Process Details Table:** Identify up to 10 major steps and document: Step Name, Purpose, Activities, Systems, Roles, Tools, Dependencies in a table format. Each row represents one process step with all required details.

3. **Failure Point Analysis:** For each process step, identify what could go wrong, potential causes, and impacts. Document these in a table structure. Be thorough in identifying failure points that could violate CPS 230 requirements.

4. **Risk Consolidation:** Consolidate the failure points into a formal risk register with: Risk ID, Risk Description, Risk Category (from taxonomy), Likelihood, Impact, Risk Rating. Use the company's standard risk taxonomy.

5. **Expected Controls:** For each risk, recommend the controls that should be in place based on the company's controls framework and good practice. Include both preventative and detective controls.

6. **Gap Analysis:** Compare the expected controls to what is documented in the process. Identify gaps and make recommendations for additional controls to meet CPS 230 requirements.`;

  const allStarterPrompts = `## Example Starter Prompts:

- "Can you analyze this member onboarding process for CPS 230 risks?"
- "What are the key failure points in our claims processing workflow?"
- "Help me identify the controls for our investment management process"
- "I need to conduct a gap analysis for our member contributions process."
- "Help me prepare for a CPS 230 risk workshop next week."
- "Analyze this process document for operational risks."
- "What kind of controls should we implement for our investment decision process?"
- "How should I document risks for our member services operations?"
- "I need to identify single points of failure in our IT support process."
- "Help me assess our vendor management process against CPS 230 requirements."
- "What questions should I ask in our risk assessment workshop?"
- "Show me how to document failure points for our member data update process."
- "What are the typical risks for superannuation payment processing?"
- "Help me identify regulatory risks in our AML/CTF processes."
- "How can we improve controls in our investment reconciliation process?"`;

  const handleCopyText = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `The ${type} has been copied to your clipboard.`,
    });
  };

  const accordionItems = [
    {
      id: 'create-copilot',
      title: '1. Create a New Copilot Agent',
      icon: <Bot className="h-5 w-5 text-primary" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-3">
            Start by creating a new Copilot agent in Microsoft Copilot Studio.
          </p>
          <div className="bg-gray-50 p-4 rounded-md border space-y-3">
            <div className="flex items-start gap-2">
              <ArrowRightCircle className="h-4 w-4 text-blue-500 mt-0.5" />
              <p className="text-sm">Sign in to Microsoft Copilot Studio</p>
            </div>
            <div className="flex items-start gap-2">
              <ArrowRightCircle className="h-4 w-4 text-blue-500 mt-0.5" />
              <p className="text-sm">Click "Create a Copilot" on the dashboard</p>
            </div>
            <div className="flex items-start gap-2">
              <ArrowRightCircle className="h-4 w-4 text-blue-500 mt-0.5" />
              <p className="text-sm">Name your Copilot "CPS 230 Risk Assessment Copilot"</p>
            </div>
            <div className="flex items-start gap-2">
              <ArrowRightCircle className="h-4 w-4 text-blue-500 mt-0.5" />
              <p className="text-sm">Add a description: "A specialized assistant for conducting CPS 230 risk assessments for Australian superannuation companies"</p>
            </div>
            <div className="flex items-start gap-2">
              <ArrowRightCircle className="h-4 w-4 text-blue-500 mt-0.5" />
              <p className="text-sm">Select an appropriate icon and color theme</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'configure-instructions',
      title: '2. Configure Base Instructions',
      icon: <Code className="h-5 w-5 text-primary" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-3">
            Add the system prompt that defines how your Copilot will behave.
          </p>
          <div className="bg-gray-50 p-4 rounded-md border space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
              <div>
                <p className="text-sm">Navigate to "Copilot configuration" → "Base instructions"</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
              <div>
                <p className="text-sm">Paste the content from the <span className="font-medium">system-prompt.md</span> file</p>
                <p className="text-xs text-gray-500 mt-1 pl-1">This defines the 6-step assessment approach and behavior</p>
              </div>
            </div>
            <div className="border p-2 rounded bg-gray-100 relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute top-2 right-2 h-6 w-6 p-0" 
                onClick={() => handleCopyText(fullSystemPrompt, "System Prompt")}
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
              <pre className="text-xs text-gray-600 whitespace-pre-wrap overflow-auto max-h-[300px] pr-6">{fullSystemPrompt}</pre>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'knowledge-sources',
      title: '3. Add Knowledge Sources',
      icon: <Database className="h-5 w-5 text-primary" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-3">
            Connect the Copilot to your SharePoint document libraries.
          </p>
          <div className="bg-gray-50 p-4 rounded-md border space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Process Documents Library</h4>
              <div className="space-y-2 pl-1">
                <div className="flex items-start gap-2">
                  <ArrowRightCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                  <p className="text-sm">Go to "Knowledge" → "Add a data source" → "SharePoint"</p>
                </div>
                <div className="flex items-start gap-2">
                  <ArrowRightCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                  <p className="text-sm">Connect to your SharePoint process documents library</p>
                </div>
                <div className="flex items-start gap-2">
                  <ArrowRightCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                  <p className="text-sm">Name it "Process Documentation"</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Reference Documents</h4>
              <div className="space-y-2 pl-1">
                <div className="flex items-start gap-2">
                  <ArrowRightCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                  <p className="text-sm">Repeat the same process for your reference documents library</p>
                </div>
                <div className="flex items-start gap-2">
                  <ArrowRightCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                  <p className="text-sm">Name it "Reference Documents"</p>
                </div>
                <div className="flex items-start gap-2">
                  <ArrowRightCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                  <p className="text-sm">Ensure all your template files are properly indexed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'conversation-starters',
      title: '4. Set Up Conversation Starters',
      icon: <PenTool className="h-5 w-5 text-primary" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-3">
            Add suggested conversation starters to help users begin interacting with the Copilot.
          </p>
          <div className="bg-gray-50 p-4 rounded-md border">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm">Navigate to "Copilot configuration" → "Greeting message"</p>
                  <p className="text-xs text-gray-500 mt-1">Add a welcoming message that introduces the Copilot's purpose</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm">Go to "Conversation starters"</p>
                  <p className="text-xs text-gray-500 mt-1">Add examples from the <span className="font-medium">starter-prompts.md</span> file</p>
                </div>
              </div>
              <div className="border p-2 rounded bg-gray-100 relative">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-2 right-2 h-6 w-6 p-0" 
                  onClick={() => handleCopyText(allStarterPrompts, "Starter Prompts")}
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
                <pre className="text-xs text-gray-600 whitespace-pre-wrap overflow-auto max-h-[300px] pr-6">{allStarterPrompts}</pre>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'testing-publishing',
      title: '5. Testing & Publishing',
      icon: <FileText className="h-5 w-5 text-primary" />,
      content: (
        <div className="space-y-3">
          <p className="text-sm">Before publishing your Copilot, remember to:</p>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            <li>Test the agent with a few sample documents to ensure it follows the 6-step process</li>
            <li>Verify that it can access and reference your SharePoint files</li>
            <li>Check that it correctly formats outputs according to the templates</li>
            <li>Make any adjustments to the system prompt if needed</li>
            <li>When ready, publish the Copilot to make it available to your team</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <Alert className="bg-blue-50 border-blue-100">
        <AlertDescription className="text-sm text-blue-700">
          Setup instructions for creating and configuring your CPS 230 Risk Assessment Copilot agent in Microsoft Copilot Studio.
        </AlertDescription>
      </Alert>

      <div className="bg-gray-50 p-4 rounded-md border space-y-2">
        <div className="flex items-center gap-2">
          <ExternalLink className="h-4 w-4 text-blue-500" />
          <p className="text-sm font-medium">
            <Link href="https://learn.microsoft.com/en-us/microsoft-copilot-studio/" target="_blank" className="text-blue-600 hover:underline">
              Microsoft Copilot Studio Portal
            </Link>
          </p>
        </div>
        <p className="text-sm text-gray-500 pl-6">
          You'll need a Microsoft 365 account with appropriate permissions to create and manage Copilot agents.
        </p>
      </div>

      <Accordion items={accordionItems} defaultOpen="create-copilot" />
    </div>
  );
} 