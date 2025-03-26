"use client";

import React, { useState } from 'react';
import { WizardLayout } from './wizard-layout';
import { CPS230_SETUP_STEPS, AGENT_SYSTEM_PROMPTS } from '@/lib/cps230-constants';
import { Accordion } from '@/components/ui/accordion';
import { Clipboard, ClipboardCheck, FolderTree, Bot, CheckCircle, Info, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CPS230SetupWizard() {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  
  const handleCopyPrompt = (key: string) => {
    const prompt = AGENT_SYSTEM_PROMPTS[key as keyof typeof AGENT_SYSTEM_PROMPTS];
    if (prompt) {
      navigator.clipboard.writeText(prompt);
      setCopiedPrompt(key);
      setTimeout(() => setCopiedPrompt(null), 2000);
    }
  };

  // Step 0: SharePoint Structure
  const SharePointStructureStep = () => {
    const accordionItems = [
      {
        id: 'create-folders',
        title: '1. Create Main Folders',
        icon: <FolderTree className="h-5 w-5" />,
        content: (
          <div className="space-y-3">
            <p>Create a dedicated SharePoint site or document library named "CPS230_RiskAssessments"</p>
            <p>Within it, create two main sections:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Global References Folder</strong> (/CPS230_Global/): Stores enterprise-wide reference documents such as Risk Taxonomy, ORMF, and CPS 230 Guidelines.</li>
              <li><strong>Processes Folder</strong> (/Processes/): Contains a subfolder for each business process under assessment.</li>
            </ul>
          </div>
        )
      },
      {
        id: 'upload-documents',
        title: '2. Upload Global Reference Documents',
        icon: <FileText className="h-5 w-5" />,
        content: (
          <div className="space-y-3">
            <p>Upload the following files to /CPS230_Global/:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>CPS230_Risk_Taxonomy.docx</strong> (or .pdf): Enterprise risk category definitions</li>
              <li><strong>Operational_Risk_Management_Framework.docx</strong>: ORMF documentation</li>
              <li><strong>CPS230_Regulatory_Guidelines.pdf</strong>: Official regulatory guidelines</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">These files should not have process-specific prefixes since they apply to all processes. Ensure they are the latest approved versions.</p>
          </div>
        )
      },
      {
        id: 'process-folders',
        title: '3. Process Folder Structure',
        icon: <FolderTree className="h-5 w-5" />,
        content: (
          <div className="space-y-3">
            <p>For each business process, create a subfolder with this naming convention:</p>
            <div className="bg-slate-50 p-2 rounded my-2">
              <code>/Processes/P[ID] [ProcessName]/</code>
            </div>
            <p>Example: <code>/Processes/P123 CustomerOnboarding/</code></p>
            <p className="text-sm text-muted-foreground mt-2">Use a unique process ID (e.g., P123) and a concise process name. All outputs for each process will be stored in its dedicated folder.</p>
          </div>
        )
      },
      {
        id: 'file-naming',
        title: '4. File Naming Convention',
        icon: <FileText className="h-5 w-5" />,
        content: (
          <div className="space-y-3">
            <p>All output files from Copilot agents should follow this naming scheme:</p>
            <div className="bg-slate-50 p-2 rounded my-2">
              <code>&lt;ProcessID&gt;_&lt;ProcessName&gt;_Step&lt;Number&gt;_&lt;ContentDescription&gt;.docx</code>
            </div>
            <p className="text-sm text-muted-foreground mt-2">This naming convention ensures consistency and traceability across all processes. The file progression (Step1 through Step6) provides a clear audit trail.</p>
          </div>
        )
      },
      {
        id: 'folder-structure',
        title: '5. Recommended Folder Structure',
        icon: <FolderTree className="h-5 w-5" />,
        content: (
          <div className="space-y-3">
            <pre className="bg-slate-50 p-3 rounded text-sm overflow-auto">
{`CPS230_RiskAssessments/
├── CPS230_Global/
│   ├── CPS230_Risk_Taxonomy.pdf
│   ├── Operational_Risk_Management_Framework.docx
│   └── CPS230_Regulatory_Guidelines.pdf
└── Processes/
    ├── P123 CustomerOnboarding/
    │   ├── P123_CustomerOnboarding_Step1_ProcessSummary.docx
    │   ├── P123_CustomerOnboarding_Step2_ProcessDetail.docx
    │   ├── P123_CustomerOnboarding_Step3_FailurePoints.docx
    │   ├── P123_CustomerOnboarding_Step4_RiskConsolidation.docx
    │   ├── P123_CustomerOnboarding_Step5_ExpectedControls.docx
    │   └── P123_CustomerOnboarding_Step6_ControlGapAnalysis.docx
    ├── P124 LoanApproval/
    │   └── ...
    └── ...`}
            </pre>
          </div>
        )
      },
      {
        id: 'documentation-standards',
        title: '6. Documentation Standards',
        icon: <Info className="h-5 w-5" />,
        content: (
          <div className="space-y-3">
            <p className="text-sm">All agent outputs should follow these standards:</p>
            <ul className="text-sm list-disc pl-6 space-y-1">
              <li>Use Word (.docx) format for all outputs</li>
              <li>Use Heading 2 style for primary section titles</li>
              <li>Use Calibri 11pt for all body text and table content</li>
              <li>Format tables with bold column headers</li>
              <li>Use bullet points for multiple items within cells</li>
              <li>Save each step as a new file to maintain version history</li>
            </ul>
          </div>
        )
      }
    ];

    return (
      <div className="space-y-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">SharePoint Folder Structure Setup</h2>
          <p className="text-muted-foreground">
            Set up the SharePoint folder structure and file naming conventions for your CPS 230 risk assessment.
          </p>
        </div>
        
        <Accordion items={accordionItems} />
      </div>
    );
  };

  // Step 1-6: Copilot Agent Creation Steps
  const AgentCreationStep = ({ agentNumber, title, description, promptKey }: { agentNumber: number, title: string, description: string, promptKey: string }) => {
    const accordionItems = [
      {
        id: 'agent-creation',
        title: '1. Create Agent in Copilot Studio',
        icon: <Bot className="h-5 w-5" />,
        content: (
          <div className="space-y-3">
            <ol className="list-decimal pl-6 space-y-2">
              <li>Log in to <a href="https://copilotstudio.microsoft.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Microsoft Copilot Studio</a></li>
              <li>Click "New" and select "Copilot"</li>
              <li>Name your Copilot: <code>CPS230 {title}</code></li>
              <li>Description: <code>{description}</code></li>
              <li>Click "Create"</li>
              <li>Go to "Generative conversations" in the left sidebar</li>
              <li>Click on "System message"</li>
              <li>Copy and paste the system prompt below</li>
              <li>Configure knowledge sources to include your SharePoint process documentation:
                <ul className="list-disc pl-6 mt-1 text-sm">
                  <li>Click on "Add" under Knowledge sources</li>
                  <li>Select "SharePoint" as the source type</li>
                  <li>Connect to your SharePoint site containing the process documentation</li>
                  <li>For Agent 1 & 2: Point to both process docs and the global reference folder</li>
                  <li>For Agents 3-6: Ensure they can access both current and previous step outputs</li>
                </ul>
              </li>
              <li>Save and publish your Copilot</li>
            </ol>
          </div>
        )
      },
      {
        id: 'system-prompt',
        title: '2. System Prompt',
        icon: <Clipboard className="h-5 w-5" />,
        content: (
          <div className="space-y-3">
            <div className="relative">
              <div className="bg-slate-50 p-4 rounded border text-sm max-h-60 overflow-y-auto">
                <pre className="whitespace-pre-wrap font-mono text-xs">
                  {AGENT_SYSTEM_PROMPTS[promptKey as keyof typeof AGENT_SYSTEM_PROMPTS]}
                </pre>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="absolute top-2 right-2"
                onClick={() => handleCopyPrompt(promptKey)}
              >
                {copiedPrompt === promptKey ? (
                  <><ClipboardCheck className="h-4 w-4 mr-1" /> Copied</>
                ) : (
                  <><Clipboard className="h-4 w-4 mr-1" /> Copy</>
                )}
              </Button>
            </div>
          </div>
        )
      },
      {
        id: 'starter-prompts',
        title: '3. Suggested Starter Prompts',
        icon: <Info className="h-5 w-5" />,
        content: (
          <div className="space-y-2">
            {agentNumber === 1 && (
              <>
                <div className="bg-slate-50 p-2 rounded border text-sm">
                  "Give me an executive summary of the [Process Name]."
                </div>
                <div className="bg-slate-50 p-2 rounded border text-sm">
                  "Summarize the [Process Name] process for a CPS 230 risk workshop."
                </div>
              </>
            )}
            {agentNumber === 2 && (
              <>
                <div className="bg-slate-50 p-2 rounded border text-sm">
                  "Create a process detail table for [Process Name] as per CPS 230 template."
                </div>
                <div className="bg-slate-50 p-2 rounded border text-sm">
                  "List all the steps of [Process Name] with purpose, actors, systems, etc., in a table."
                </div>
              </>
            )}
            {agentNumber === 3 && (
              <>
                <div className="bg-slate-50 p-2 rounded border text-sm">
                  "What are the potential failure points in each step of [Process Name]?"
                </div>
                <div className="bg-slate-50 p-2 rounded border text-sm">
                  "Analyze [Process Name] for vulnerabilities or things that could go wrong at each step."
                </div>
              </>
            )}
            {agentNumber === 4 && (
              <>
                <div className="bg-slate-50 p-2 rounded border text-sm">
                  "Consolidate the failure points into a risk register for [Process Name]."
                </div>
                <div className="bg-slate-50 p-2 rounded border text-sm">
                  "Generate a CPS 230 risk register: list top risks for [Process Name], with statements and categories."
                </div>
              </>
            )}
            {agentNumber === 5 && (
              <>
                <div className="bg-slate-50 p-2 rounded border text-sm">
                  "For each risk in our register, list expected controls with their type and category."
                </div>
                <div className="bg-slate-50 p-2 rounded border text-sm">
                  "What controls should we have for the risks identified in [Process Name]?"
                </div>
              </>
            )}
            {agentNumber === 6 && (
              <>
                <div className="bg-slate-50 p-2 rounded border text-sm">
                  "Check the process for evidence of the expected controls for [Process Name] and identify any gaps."
                </div>
                <div className="bg-slate-50 p-2 rounded border text-sm">
                  "Perform a control gap analysis for [Process Name] based on our expected controls."
                </div>
              </>
            )}
          </div>
        )
      }
    ];

    return (
      <div className="space-y-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Create {title}</h2>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>
        
        <Accordion items={accordionItems} />
      </div>
    );
  };

  const renderStep = (currentStep: number) => {
    switch (currentStep) {
      case 0:
        return <SharePointStructureStep />;
      case 1:
        return <AgentCreationStep agentNumber={1} title="Process Summary Agent" description="Executive overview of business process" promptKey="processSummary" />;
      case 2:
        return <AgentCreationStep agentNumber={2} title="Process Detail Table Agent" description="Detailed breakdown of process steps" promptKey="processDetailTable" />;
      case 3:
        return <AgentCreationStep agentNumber={3} title="Failure Point Analysis Agent" description="Identification of potential failure scenarios" promptKey="failurePointAnalysis" />;
      case 4:
        return <AgentCreationStep agentNumber={4} title="Risk Consolidation Agent" description="Consolidated risk register creation" promptKey="riskConsolidation" />;
      case 5:
        return <AgentCreationStep agentNumber={5} title="Expected Controls Agent" description="Identification of expected controls for each risk" promptKey="expectedControls" />;
      case 6:
        return <AgentCreationStep agentNumber={6} title="Control Gap Analysis Agent" description="Analysis of control gaps in the process" promptKey="controlGapAnalysis" />;
      default:
        return <SharePointStructureStep />;
    }
  };

  return (
    <WizardLayout
      title="CPS 230 Risk Assessment System Setup"
      description="Set up Microsoft Copilot Studio agents and folder structure for CPS 230 operational risk assessments"
      steps={CPS230_SETUP_STEPS}
    >
      {({ state }) => renderStep(state.currentStep)}
    </WizardLayout>
  );
} 