"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { WizardLayout } from './wizard-layout';
import { CPS230_WALKTHROUGH_STEPS } from '@/lib/cps230-constants';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck, FileText, Info, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { Accordion } from '@/components/ui/accordion';

export function ProcessWalkthroughWizard() {
  // Store processId and processName at the parent level for use in other steps
  const [processDetails, setProcessDetails] = useState({
    processId: '',
    processName: '',
    fullProcessName: ''
  });
  
  // Preparation Step
  const PreparationStep = () => {
    // Local state for form fields to prevent parent re-renders during typing
    const [localProcessId, setLocalProcessId] = useState(processDetails.processId);
    const [localProcessName, setLocalProcessName] = useState(processDetails.processName);
    const [formComplete, setFormComplete] = useState(false);
    const [localFullProcessName, setLocalFullProcessName] = useState(processDetails.fullProcessName);

    // Initialize local state from parent state
    useEffect(() => {
      setLocalProcessId(processDetails.processId);
      setLocalProcessName(processDetails.processName);
      setLocalFullProcessName(processDetails.fullProcessName);
      
      if (processDetails.processId && processDetails.processName) {
        setFormComplete(true);
      }
    }, [processDetails]);

    // Memoize event handlers
    const handleProcessIdChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const newId = e.target.value;
      setLocalProcessId(newId);
      
      if (newId.trim() && localProcessName.trim()) {
        setFormComplete(true);
        setLocalFullProcessName(`P${newId} ${localProcessName}`);
      } else {
        setFormComplete(false);
      }
    }, [localProcessName]);

    const handleProcessNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const newName = e.target.value;
      setLocalProcessName(newName);
      
      if (localProcessId.trim() && newName.trim()) {
        setFormComplete(true);
        setLocalFullProcessName(`P${localProcessId} ${newName}`);
      } else {
        setFormComplete(false);
      }
    }, [localProcessId]);

    // Save form data to parent state when navigating away or when the form is complete
    useEffect(() => {
      // Update the parent state when the form is complete
      if (formComplete) {
        setProcessDetails({
          processId: localProcessId,
          processName: localProcessName,
          fullProcessName: localFullProcessName
        });
      }

      // Cleanup function that runs when unmounting (navigating away)
      return () => {
        if (localProcessId && localProcessName) {
          setProcessDetails({
            processId: localProcessId,
            processName: localProcessName,
            fullProcessName: `P${localProcessId} ${localProcessName}`
          });
        }
      };
    }, [localProcessId, localProcessName, formComplete, localFullProcessName]);

    const accordionItems = [
      {
        id: 'process-details',
        title: '1. Process Identification',
        icon: <FileText className="h-5 w-5" />,
        content: (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="process-id">Process ID (numbers only)</Label>
                <Input 
                  id="process-id" 
                  placeholder="123" 
                  value={localProcessId}
                  onChange={handleProcessIdChange}
                />
                <p className="text-xs text-muted-foreground">
                  Use a unique identifier for this process (e.g., 123, 456)
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="process-name">Process Name</Label>
                <Input 
                  id="process-name" 
                  placeholder="CustomerOnboarding" 
                  value={localProcessName}
                  onChange={handleProcessNameChange}
                />
                <p className="text-xs text-muted-foreground">
                  Use a concise, CamelCase name without spaces
                </p>
              </div>
            </div>
            
            {formComplete && (
              <div className="bg-slate-50 p-3 rounded-md border">
                <p className="text-sm flex items-center">
                  <Info className="w-4 h-4 mr-2 text-blue-500" />
                  Your process will be identified as:
                </p>
                <p className="font-medium mt-1">{localFullProcessName}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  This identifier will be used in folder names and filenames throughout the assessment
                </p>
              </div>
            )}
          </div>
        )
      },
      {
        id: 'preparation-steps',
        title: '2. Preparation Steps',
        icon: <CheckCircle2 className="h-5 w-5" />,
        content: (
          <div className="space-y-3">
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <span className="font-medium">Create process folder in SharePoint</span>
                <p className="text-sm text-muted-foreground mt-1">
                  Create a folder in your SharePoint site at: 
                  <code className="bg-slate-100 px-1 ml-1">/Processes/{localFullProcessName || 'P[ID] [ProcessName]'}/</code>
                </p>
              </li>
              <li>
                <span className="font-medium">Upload process documentation</span>
                <p className="text-sm text-muted-foreground mt-1">
                  Upload any existing process documentation to this folder, such as:
                </p>
                <ul className="list-disc pl-6 text-sm text-muted-foreground mt-1 space-y-1">
                  <li>Procedure manuals</li>
                  <li>Process flowcharts</li>
                  <li>System documentation</li>
                  <li>Existing control documentation</li>
                  <li>Any other relevant process materials</li>
                </ul>
              </li>
              <li>
                <span className="font-medium">Verify SharePoint permissions</span>
                <p className="text-sm text-muted-foreground mt-1">
                  Ensure your Copilot agents have the proper permissions to access:
                </p>
                <ul className="list-disc pl-6 text-sm text-muted-foreground mt-1 space-y-1">
                  <li>The global reference folder (/CPS230_Global/)</li>
                  <li>The process-specific folder you just created</li>
                  <li>All documentation you've uploaded</li>
                </ul>
              </li>
              <li>
                <span className="font-medium">Create a tracking entry</span>
                <p className="text-sm text-muted-foreground mt-1">
                  Add this process to your master tracking spreadsheet with fields for each step's completion status.
                </p>
              </li>
            </ol>
          </div>
        )
      },
      {
        id: 'important-notes',
        title: '3. Before You Begin',
        icon: <AlertTriangle className="h-5 w-5" />,
        content: (
          <div className="space-y-3">
            <ul className="space-y-2 text-sm">
              <li>Ensure you have access to all six Copilot agents created in the setup process</li>
              <li>Have your process documentation ready and accessible</li>
              <li>Make sure your process ID is unique and not already used for another process</li>
              <li>Verify you understand the CPS 230 risk assessment methodology</li>
              <li>Prepare for the time commitment – a full assessment with six steps typically takes 2-3 hours</li>
            </ul>
          </div>
        )
      },
      {
        id: 'documentation-standards',
        title: '4. Documentation Standards',
        icon: <Info className="h-5 w-5" />,
        content: (
          <div className="space-y-3">
            <p className="text-sm">Throughout this assessment, remember these documentation standards:</p>
            <ul className="text-sm list-disc pl-6 space-y-1">
              <li>Use Word (.docx) format for all outputs</li>
              <li>Use Heading 2 style for primary section titles</li>
              <li>Use Calibri 11pt for all body text and table content</li>
              <li>Format tables with bold column headers</li>
              <li>Use bullet points for multiple items within cells</li>
              <li>Save each step as a new file to maintain version history</li>
              <li>Follow the exact file naming convention for each step</li>
            </ul>
          </div>
        )
      }
    ];

    return (
      <div className="space-y-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Process Assessment Preparation</h2>
          <p className="text-muted-foreground">
            Before starting your assessment, please identify your process and prepare the necessary documentation.
          </p>
        </div>
        
        <Accordion items={accordionItems} defaultOpen="process-details" />
      </div>
    );
  };

  // Generic step for agent usage
  const AgentStep = ({ 
    stepNumber, 
    agentName, 
    description, 
    inputFile, 
    outputFile,
    promptExamples,
    tips
  }: { 
    stepNumber: number;
    agentName: string;
    description: string;
    inputFile: string;
    outputFile: string;
    promptExamples: string[];
    tips: string[];
  }) => {
    const [copied, setCopied] = useState<string | null>(null);
    
    const handleCopy = (text: string, id: string) => {
      navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    };

    const accordionItems = [
      {
        id: 'input-required',
        title: '1. Input Required',
        icon: <FileText className="h-5 w-5" />,
        content: (
          <div className="space-y-3">
            <div className="bg-slate-50 p-3 rounded-md border">
              <div className="flex items-start">
                <FileText className="w-5 h-5 mr-2 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium">{inputFile}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Location: <code>/Processes/{processDetails.fullProcessName || 'P[ID] [ProcessName]'}/</code>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'using-agent',
        title: '2. Using the Agent',
        icon: <CheckCircle2 className="h-5 w-5" />,
        content: (
          <div className="space-y-3">
            <ol className="list-decimal pl-6 space-y-2">
              <li>Open the <span className="font-medium">CPS230 {agentName}</span> agent in Microsoft Copilot Studio</li>
              <li>Enter one of the prompt examples below (replacing [Process Name] with your process name)</li>
              <li>Ensure the agent has access to the input document</li>
              <li>Review the output for accuracy and completeness</li>
              <li>Save the output document with the specified filename</li>
            </ol>
          </div>
        )
      },
      {
        id: 'prompt-examples',
        title: '3. Prompt Examples',
        icon: <Clipboard className="h-5 w-5" />,
        content: (
          <div className="space-y-3">
            <div className="space-y-2">
              {promptExamples.map((example, i) => (
                <div 
                  key={i} 
                  className="bg-slate-50 p-2 rounded border text-sm flex justify-between items-center group"
                >
                  <span>{example.replace('[Process Name]', processDetails.processName || '[Process Name]')}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleCopy(example.replace('[Process Name]', processDetails.processName), `prompt-${i}`)}
                  >
                    {copied === `prompt-${i}` ? (
                      <ClipboardCheck className="h-4 w-4" />
                    ) : (
                      <Clipboard className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )
      },
      {
        id: 'output-document',
        title: '4. Output Document',
        icon: <FileText className="h-5 w-5" />,
        content: (
          <div className="space-y-3">
            <div className="bg-slate-50 p-3 rounded-md border">
              <div className="flex items-start">
                <FileText className="w-5 h-5 mr-2 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">{outputFile}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Save to: <code>/Processes/{processDetails.fullProcessName || 'P[ID] [ProcessName]'}/</code>
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2"
                    onClick={() => handleCopy(outputFile.replace('[ID]', processDetails.processId).replace('[ProcessName]', processDetails.processName), 'output-file')}
                  >
                    {copied === 'output-file' ? (
                      <><ClipboardCheck className="h-4 w-4 mr-1" /> Copied</>
                    ) : (
                      <><Clipboard className="h-4 w-4 mr-1" /> Copy Filename</>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'tips',
        title: '5. Tips for This Step',
        icon: <Info className="h-5 w-5" />,
        content: (
          <div className="space-y-3">
            <ul className="space-y-2 text-sm">
              {tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        )
      }
    ];

    return (
      <div className="space-y-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Step {stepNumber}: {agentName}</h2>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>
        
        <Accordion items={accordionItems} defaultOpen="input-required" />
      </div>
    );
  };

  // Final Review Step
  const FinalReviewStep = () => {
    const accordionItems = [
      {
        id: 'document-verification',
        title: '1. Document Verification Checklist',
        icon: <CheckCircle2 className="h-5 w-5" />,
        content: (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Verify all six documents have been created with correct naming:
            </p>
            <div className="space-y-2 mt-3">
              <div className="flex items-center p-2 bg-slate-50 rounded">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <code>P{processDetails.processId || '[ID]'}_{processDetails.processName || '[ProcessName]'}_Step1_ProcessSummary.docx</code>
              </div>
              <div className="flex items-center p-2 bg-slate-50 rounded">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <code>P{processDetails.processId || '[ID]'}_{processDetails.processName || '[ProcessName]'}_Step2_ProcessDetail.docx</code>
              </div>
              <div className="flex items-center p-2 bg-slate-50 rounded">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <code>P{processDetails.processId || '[ID]'}_{processDetails.processName || '[ProcessName]'}_Step3_FailurePoints.docx</code>
              </div>
              <div className="flex items-center p-2 bg-slate-50 rounded">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <code>P{processDetails.processId || '[ID]'}_{processDetails.processName || '[ProcessName]'}_Step4_RiskConsolidation.docx</code>
              </div>
              <div className="flex items-center p-2 bg-slate-50 rounded">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <code>P{processDetails.processId || '[ID]'}_{processDetails.processName || '[ProcessName]'}_Step5_ExpectedControls.docx</code>
              </div>
              <div className="flex items-center p-2 bg-slate-50 rounded">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <code>P{processDetails.processId || '[ID]'}_{processDetails.processName || '[ProcessName]'}_Step6_ControlGapAnalysis.docx</code>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'quality-assurance',
        title: '2. Quality Assurance Check',
        icon: <Info className="h-5 w-5" />,
        content: (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Review the content of each document for quality and consistency:</p>
            <div className="space-y-2 mt-2 pl-4 border-l-2 border-slate-200">
              <div className="space-y-1">
                <p className="text-sm font-medium">Format and Style</p>
                <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                  <li>Verify headings use Heading 2 style for main sections</li>
                  <li>Check that body text uses Calibri 11pt</li>
                  <li>Ensure tables have bold column headers</li>
                  <li>Confirm bullet points are properly formatted within cells</li>
                </ul>
              </div>
              
              <div className="space-y-1 mt-3">
                <p className="text-sm font-medium">Content Validation</p>
                <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                  <li>Verify the executive summary accurately represents the process</li>
                  <li>Check that the process detail table captures all major steps</li>
                  <li>Confirm 3-5 failure points are listed for each process step</li>
                  <li>Validate risk statements follow the correct format</li>
                  <li>Ensure at least one preventative and one detective control per risk</li>
                  <li>Review gap analysis findings and next steps for reasonableness</li>
                </ul>
              </div>
              
              <div className="space-y-1 mt-3">
                <p className="text-sm font-medium">ID and Reference Checks</p>
                <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                  <li>Verify process step names are consistent across documents</li>
                  <li>Check that risk IDs (R1, R2, etc.) are used consistently</li>
                  <li>Confirm control IDs properly reference their parent risks</li>
                  <li>Validate that failure points are properly linked to risks</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'next-steps',
        title: '3. Next Steps',
        icon: <ArrowRight className="h-5 w-5" />,
        content: (
          <div className="space-y-3">
            <ol className="list-decimal pl-6 space-y-2">
              <li>Update your master tracking spreadsheet to mark this process as complete</li>
              <li>Schedule a review meeting with stakeholders to discuss the findings</li>
              <li>Prioritize addressing the control gaps identified in Step 6</li>
              <li>Document any action items and responsible parties for addressing gaps</li>
              <li>Set follow-up dates for remediation of identified control gaps</li>
              <li>Consider conducting a peer review for quality assurance</li>
            </ol>
          </div>
        )
      },
      {
        id: 'assessment-complete',
        title: '4. Assessment Complete',
        icon: <CheckCircle2 className="h-5 w-5" />,
        content: (
          <div className="space-y-3">
            <p className="text-sm">
              You have successfully completed the CPS 230 risk assessment for the {processDetails.processName || '[Process Name]'} process. 
              All documentation is now ready for review and can be shared with stakeholders.
            </p>
          </div>
        )
      },
      {
        id: 'team-coordination',
        title: '5. Team Coordination',
        icon: <Info className="h-5 w-5" />,
        content: (
          <div className="space-y-3">
            <p className="text-sm">For organizations assessing multiple processes in parallel:</p>
            <ul className="text-sm list-disc pl-6 space-y-1">
              <li>Maintain a central tracker for all processes under assessment</li>
              <li>Establish clear ownership of each process or step</li>
              <li>Hold regular team check-ins to discuss progress and challenges</li>
              <li>Perform periodic peer reviews across process assessments</li>
              <li>Document decisions about risk consolidation or control definitions</li>
              <li>Create a consistent approach to addressing control gaps</li>
            </ul>
          </div>
        )
      }
    ];

    return (
      <div className="space-y-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Final Review and Documentation</h2>
          <p className="text-muted-foreground">
            Complete your risk assessment by reviewing all documentation and ensuring it meets quality standards.
          </p>
        </div>
        
        <Accordion items={accordionItems} defaultOpen="document-verification" />
      </div>
    );
  };

  const renderStep = (currentStep: number) => {
    switch (currentStep) {
      case 0:
        return <PreparationStep />;
      case 1:
        return (
          <AgentStep 
            stepNumber={1}
            agentName="Process Summary"
            description="Generate an executive summary of the business process"
            inputFile="Process documentation (various formats)"
            outputFile={`P[ID]_[ProcessName]_Step1_ProcessSummary.docx`.replace('[ID]', processDetails.processId).replace('[ProcessName]', processDetails.processName)}
            promptExamples={[
              `Give me an executive summary of the ${processDetails.processName || '[Process Name]'} process.`,
              `Summarize the ${processDetails.processName || '[Process Name]'} process for a CPS 230 risk workshop.`
            ]}
            tips={[
              "The executive summary should be concise but comprehensive",
              "Ensure it covers process objectives, flow, key decision points, and dependencies",
              "Review the summary for accuracy and alignment with the process documentation"
            ]}
          />
        );
      case 2:
        return (
          <AgentStep 
            stepNumber={2}
            agentName="Process Detail Table"
            description="Create a detailed breakdown of process steps"
            inputFile={`P${processDetails.processId || '[ID]'}_${processDetails.processName || '[ProcessName]'}_Step1_ProcessSummary.docx (and process documentation)`}
            outputFile={`P[ID]_[ProcessName]_Step2_ProcessDetail.docx`.replace('[ID]', processDetails.processId).replace('[ProcessName]', processDetails.processName)}
            promptExamples={[
              `Create a process detail table for ${processDetails.processName || '[Process Name]'} as per CPS 230 template.`,
              `List all the steps of ${processDetails.processName || '[Process Name]'} with purpose, actors, systems, etc., in a table.`
            ]}
            tips={[
              "Break down the process into no more than 10 distinct steps",
              "Ensure every column is filled for each step",
              "Be specific about systems, roles, and dependencies"
            ]}
          />
        );
      case 3:
        return (
          <AgentStep 
            stepNumber={3}
            agentName="Failure Point Analysis"
            description="Identify potential failure scenarios at each process step"
            inputFile={`P${processDetails.processId || '[ID]'}_${processDetails.processName || '[ProcessName]'}_Step2_ProcessDetail.docx`}
            outputFile={`P[ID]_[ProcessName]_Step3_FailurePoints.docx`.replace('[ID]', processDetails.processId).replace('[ProcessName]', processDetails.processName)}
            promptExamples={[
              `What are the potential failure points in each step of ${processDetails.processName || '[Process Name]'}?`,
              `Analyze ${processDetails.processName || '[Process Name]'} for vulnerabilities or things that could go wrong at each step.`
            ]}
            tips={[
              "Focus on 3-5 significant failure points per process step",
              "Consider both technical and operational failure scenarios",
              "Ensure each failure point has clear causes and impacts defined"
            ]}
          />
        );
      case 4:
        return (
          <AgentStep 
            stepNumber={4}
            agentName="Risk Consolidation"
            description="Consolidate failure points into a risk register"
            inputFile={`P${processDetails.processId || '[ID]'}_${processDetails.processName || '[ProcessName]'}_Step3_FailurePoints.docx`}
            outputFile={`P[ID]_[ProcessName]_Step4_RiskConsolidation.docx`.replace('[ID]', processDetails.processId).replace('[ProcessName]', processDetails.processName)}
            promptExamples={[
              `Consolidate the failure points into a risk register for ${processDetails.processName || '[Process Name]'}.`,
              `Generate a CPS 230 risk register: list top risks for ${processDetails.processName || '[Process Name]'}, with statements and categories.`
            ]}
            tips={[
              "Aim for 5-10 distinct risks that cover all major vulnerability themes",
              "Ensure each risk statement follows the format: 'Risk that [event] occurs due to [causes], resulting in [consequences]'",
              "Verify each risk is properly categorized and linked to the process steps"
            ]}
          />
        );
      case 5:
        return (
          <AgentStep 
            stepNumber={5}
            agentName="Expected Controls"
            description="Define expected controls for each identified risk"
            inputFile={`P${processDetails.processId || '[ID]'}_${processDetails.processName || '[ProcessName]'}_Step4_RiskConsolidation.docx`}
            outputFile={`P[ID]_[ProcessName]_Step5_ExpectedControls.docx`.replace('[ID]', processDetails.processId).replace('[ProcessName]', processDetails.processName)}
            promptExamples={[
              `For each risk in our register, list expected controls with their type and category.`,
              `What controls should we have for the risks identified in ${processDetails.processName || '[Process Name]'}?`
            ]}
            tips={[
              "Include at least one preventative and one detective control for each risk",
              "Specify control type (Preventative, Detective, Corrective) and category (Manual, Automated, Semi-automated)",
              "Focus on meaningful controls that would significantly reduce the risk"
            ]}
          />
        );
      case 6:
        return (
          <AgentStep 
            stepNumber={6}
            agentName="Control Gap Analysis"
            description="Analyze control gaps in the current process"
            inputFile={`P${processDetails.processId || '[ID]'}_${processDetails.processName || '[ProcessName]'}_Step5_ExpectedControls.docx (and process documentation)`}
            outputFile={`P[ID]_[ProcessName]_Step6_ControlGapAnalysis.docx`.replace('[ID]', processDetails.processId).replace('[ProcessName]', processDetails.processName)}
            promptExamples={[
              `Check the process for evidence of the expected controls for ${processDetails.processName || '[Process Name]'} and identify any gaps.`,
              `Perform a control gap analysis for ${processDetails.processName || '[Process Name]'} based on our expected controls.`
            ]}
            tips={[
              "Ensure the agent has access to both the expected controls list and the original process documentation",
              "For each control, verify if there is evidence in the documentation",
              "Be objective in the assessment – mark controls as 'No evidence' if they truly aren't mentioned",
              "Specify clear next steps for any gaps identified"
            ]}
          />
        );
      case 7:
        return <FinalReviewStep />;
      default:
        return <PreparationStep />;
    }
  };

  return (
    <WizardLayout
      title="CPS 230 Process Assessment Walkthrough"
      description="Guide for assessing a business process with the six Copilot agents"
      steps={CPS230_WALKTHROUGH_STEPS}
    >
      {({ state }) => renderStep(state.currentStep)}
    </WizardLayout>
  );
} 