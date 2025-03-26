"use client";

import React from 'react';
import { useSetup } from '@/lib/setup-context';
import { CheckCircle2, MessageSquare, User, Bot } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Accordion } from '@/components/ui/accordion';

export function ExampleStep() {
  const { state, updateState } = useSetup();

  React.useEffect(() => {
    // Mark this step as viewed when component mounts
    if (!state.completedSteps.includes(6)) {
      updateState({
        completedSteps: [...state.completedSteps, 6]
      });
    }
  }, []);

  const accordionItems = [
    {
      id: 'conversation-example',
      title: 'Conversation Example',
      icon: <MessageSquare className="h-5 w-5 text-primary" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm">
            This example demonstrates a typical workflow with the Copilot, showing how users can step through the 6-step risk assessment process.
          </p>
          <p className="text-sm">
            <Link href="/docs/sample-process-member-onboarding" className="text-blue-600 hover:underline">
              View the sample Member Onboarding process document
            </Link> that is used in this example.
          </p>

          <div className="space-y-4 mt-4">
            {/* Message 1 */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-blue-500" />
              </div>
              <div className="flex-1 bg-blue-50 p-3 rounded-lg">
                <p className="text-sm">
                  Can you analyze this member onboarding process for CPS 230 risks?
                </p>
              </div>
            </div>

            {/* Message 2 */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-purple-500" />
              </div>
              <div className="flex-1 bg-purple-50 p-3 rounded-lg">
                <p className="text-sm mb-2">
                  I&apos;d be happy to help analyze the member onboarding process for CPS 230 compliance. I&apos;ll start with a summary of the process, and then we can work through the 6-step assessment approach. Would you like me to begin with the Process Summary?
                </p>
              </div>
            </div>

            {/* Message 3 */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-blue-500" />
              </div>
              <div className="flex-1 bg-blue-50 p-3 rounded-lg">
                <p className="text-sm">
                  Yes, please provide a process summary.
                </p>
              </div>
            </div>

            {/* Message 4 - Step 1 */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-purple-500" />
              </div>
              <div className="flex-1 bg-purple-50 p-3 rounded-lg">
                <p className="text-sm font-medium mb-2">
                  Step 1: Process Summary
                </p>
                <p className="text-sm mb-3">
                  The Member Onboarding process is a multi-step workflow for registering new members into the superannuation fund. It begins with the receipt of a member application form and ends with the member being fully onboarded with access to their account.
                </p>
                <p className="text-sm mb-3">
                  Key steps include application receipt, identity verification, compliance checks, account creation, welcome communication, and documentation archival. The process involves multiple teams including Member Services, Compliance, and IT.
                </p>
                <p className="text-sm">
                  Critical dependencies include the KYC verification system, member database, and document management system. The process is governed by APRA regulations, AML/CTF requirements, and internal compliance policies.
                </p>
              </div>
            </div>

            {/* Message 5 */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-blue-500" />
              </div>
              <div className="flex-1 bg-blue-50 p-3 rounded-lg">
                <p className="text-sm">
                  Thanks. Now please create the Process Details Table.
                </p>
              </div>
            </div>

            {/* Message 6 - Step 2 */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-purple-500" />
              </div>
              <div className="flex-1 bg-purple-50 p-3 rounded-lg">
                <p className="text-sm font-medium mb-2">
                  Step 2: Process Details Table
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-2 py-1 text-left">Process Step</th>
                        <th className="border border-gray-300 px-2 py-1 text-left">Purpose</th>
                        <th className="border border-gray-300 px-2 py-1 text-left">Key Activities</th>
                        <th className="border border-gray-300 px-2 py-1 text-left">Systems</th>
                        <th className="border border-gray-300 px-2 py-1 text-left">Roles</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-2 py-1">1. Application Receipt</td>
                        <td className="border border-gray-300 px-2 py-1">Capture member application</td>
                        <td className="border border-gray-300 px-2 py-1">Receive form, log application, initial check</td>
                        <td className="border border-gray-300 px-2 py-1">CRM System</td>
                        <td className="border border-gray-300 px-2 py-1">Member Services</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-1">2. Identity Verification</td>
                        <td className="border border-gray-300 px-2 py-1">Verify applicant identity</td>
                        <td className="border border-gray-300 px-2 py-1">KYC check, ID verification</td>
                        <td className="border border-gray-300 px-2 py-1">KYC System</td>
                        <td className="border border-gray-300 px-2 py-1">Compliance Team</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-1">3. Account Creation</td>
                        <td className="border border-gray-300 px-2 py-1">Create member account</td>
                        <td className="border border-gray-300 px-2 py-1">Create profile, assign ID, setup access</td>
                        <td className="border border-gray-300 px-2 py-1">Member Database</td>
                        <td className="border border-gray-300 px-2 py-1">IT Team</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-2">Table shortened for example purposes.</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-md border border-gray-200 space-y-3">
            <h3 className="text-sm font-medium">Conversation continues with the remaining steps:</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Step 3: Failure Point Analysis</p>
                  <p className="text-xs text-gray-600">Identifying what could go wrong at each process step</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Step 4: Risk Consolidation</p>
                  <p className="text-xs text-gray-600">Creating a formal risk register with categorized risks</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Step 5: Expected Controls</p>
                  <p className="text-xs text-gray-600">Recommending controls for each identified risk</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Step 6: Gap Analysis</p>
                  <p className="text-xs text-gray-600">Comparing expected controls to documentation and identifying gaps</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'conversation-best-practices',
      title: 'Conversation Best Practices',
      icon: <CheckCircle2 className="h-5 w-5 text-primary" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <MessageSquare className="h-4 w-4 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Use Clear Prompts</p>
                <p className="text-xs text-gray-500">Ask for specific steps in the assessment process</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <MessageSquare className="h-4 w-4 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Share Process Documents</p>
                <p className="text-xs text-gray-500">Reference specific documents by name or SharePoint link</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <MessageSquare className="h-4 w-4 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Iterate Through Steps</p>
                <p className="text-xs text-gray-500">Work through the 6 steps sequentially for best results</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <MessageSquare className="h-4 w-4 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Ask Follow-up Questions</p>
                <p className="text-xs text-gray-500">Request clarification or deeper analysis if needed</p>
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
        <AlertDescription className="text-sm text-blue-700">
          Sample conversation demonstrating how to use the CPS 230 Risk Assessment Copilot.
        </AlertDescription>
      </Alert>

      <Accordion items={accordionItems} defaultOpen="conversation-example" />
    </div>
  );
} 