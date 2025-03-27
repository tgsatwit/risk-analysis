"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { WizardLayout } from './wizard-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck, FileText, Info, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Accordion } from '@/components/ui/accordion';
import { useVersion } from '@/lib/version-context';

export function ProcessWalkthroughWizard() {
  // Store processId and processName at the parent level for use in other steps
  const [processDetails, setProcessDetails] = useState({
    processId: '',
    processName: '',
    fullProcessName: ''
  });
  
  const { currentVersion } = useVersion();
  
  // Preparation Step
  const PreparationStep = ({ version = "v1" }: { version?: string }) => {
    // Local state for form fields to prevent parent re-renders during typing
    const [localProcessId, setLocalProcessId] = useState(processDetails.processId);
    const [localProcessName, setLocalProcessName] = useState(processDetails.processName);
    const [formComplete, setFormComplete] = useState(false);
    const [localFullProcessName, setLocalFullProcessName] = useState(processDetails.fullProcessName);

    // Initialize local state from parent state
    useEffect(() => {
      if (processDetails.processId && processDetails.processName) {
        setLocalProcessId(processDetails.processId);
        setLocalProcessName(processDetails.processName);
        setLocalFullProcessName(processDetails.fullProcessName);
        setFormComplete(true);
      }
    }, []);

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

    // Common accordion items for both versions
    const commonAccordionItems = [
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
                  <li>All documentation you&apos;ve uploaded</li>
                </ul>
              </li>
              <li>
                <span className="font-medium">Create a tracking entry</span>
                <p className="text-sm text-muted-foreground mt-1">
                  Add this process to your master tracking spreadsheet with fields for each step&apos;s completion status.
                </p>
              </li>
            </ol>
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

    // Version-specific "Before You Begin" section
    const beforeYouBeginV1 = {
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
    };

    const beforeYouBeginV2 = {
      id: 'important-notes',
      title: '3. Before You Begin',
      icon: <AlertTriangle className="h-5 w-5" />,
      content: (
        <div className="space-y-3">
          <ul className="space-y-2 text-sm">
            <li>Ensure you have access to the consolidated CPS 230 Risk Assessment Agent created in the setup process</li>
            <li>Have your process documentation ready and accessible</li>
            <li>Make sure your control register is uploaded and accessible to the agent</li>
            <li>Verify you understand the refined v2 assessment methodology which offers improved risk consolidation and alignment with CPS 230 requirements</li>
            <li>Remember the key methodological improvements:
              <ul className="list-disc pl-6 mt-1 text-xs text-muted-foreground">
                <li>Detailed process analysis first, then summary (flipped from v1)</li>
                <li>Early control identification from process docs</li>
                <li>Common failure types across steps (reduced repetition)</li>
                <li>Enhanced risk consolidation with CPS 230 alignment</li>
                <li>Comprehensive control mapping and gap analysis</li>
              </ul>
            </li>
            <li>Prepare for the time commitment – a full assessment typically takes 2-3 hours</li>
          </ul>
        </div>
      )
    };

    // V2-specific accordion items (if any)
    const v2AccordionItems = version === "v2" 
      ? [
          {
            id: 'archer-controls',
            title: '5. Control Register Access',
            icon: <Info className="h-5 w-5" />,
            content: (
              <div className="space-y-3">
                <p className="text-sm">Ensure your Copilot agent has access to:</p>
                <ul className="text-sm list-disc pl-6 space-y-1">
                  <li>The control register uploaded in the System Setup phase</li>
                  <li>Process documentation relevant to this assessment</li>
                </ul>
              </div>
            )
          }
        ] 
      : [];

    // Combine basic accordion items with version-specific ones
    const accordionItems = [
      ...commonAccordionItems.slice(0, 2),
      version === "v2" ? beforeYouBeginV2 : beforeYouBeginV1,
      ...commonAccordionItems.slice(2),
      // Add version-specific items
      ...(version === "v2" ? v2AccordionItems : [])
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

  // Generic step for agent usage - used by both v1 and v2
  const AgentStep = ({ 
    stepNumber, 
    agentName, 
    description, 
    inputFile, 
    outputFile,
    promptExamples,
    tips,
    version = "v1"
  }: { 
    stepNumber: number;
    agentName: string;
    description: string;
    inputFile: string;
    outputFile: string;
    promptExamples: string[];
    tips: string[];
    version?: string;
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
            {version === "v2" ? (
              <ol className="list-decimal pl-6 space-y-2">
                <li>Open the <span className="font-medium">CPS230 Risk Assessment Agent</span> in Microsoft Copilot Studio</li>
                <li>Enter one of the prompt examples below (replacing [Process Name] with your process name)</li>
                <li>Reference the specific section of the system prompt that is relevant to this step</li>
                <li>For example: "Please help me with step {stepNumber} of the CPS 230 assessment - {agentName} for {processDetails.processName || '[Process Name]'}"</li>
                <li>Ensure the agent has access to the input document</li>
                <li>Review the output for accuracy and completeness</li>
                <li>Save the output document with the specified filename</li>
              </ol>
            ) : (
              <ol className="list-decimal pl-6 space-y-2">
                <li>Open the <span className="font-medium">CPS230 {agentName}</span> agent in Microsoft Copilot Studio</li>
                <li>Enter one of the prompt examples below (replacing [Process Name] with your process name)</li>
                <li>Ensure the agent has access to the input document</li>
                <li>Review the output for accuracy and completeness</li>
                <li>Save the output document with the specified filename</li>
              </ol>
            )}
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

  // V2-specific steps
  const ProcessDetailStep = () => {
    return (
      <AgentStep 
        stepNumber={1}
        agentName="Process Detail"
        description="Create a detailed breakdown of process steps"
        inputFile="Process documentation (various formats)"
        outputFile={`P[ID]_[ProcessName]_v2_Step1_ProcessDetail.docx`.replace('[ID]', processDetails.processId).replace('[ProcessName]', processDetails.processName)}
        promptExamples={[
          `Create a detailed process breakdown table for ${processDetails.processName || '[Process Name]'} with a maximum of 10 steps, including Step Name, Purpose, Activities, Systems, Roles, Tools, and Dependencies.`,
          `Please help with step 1 of the CPS 230 assessment - create a Process Detail Table for ${processDetails.processName || '[Process Name]'} according to the refined v2 methodology.`,
          `Following the Process Detail Table instructions in your system prompt, break down the ${processDetails.processName || '[Process Name]'} process into maximum 10 steps with all required columns.`
        ]}
        tips={[
          "Break down the process into no more than 10 distinct steps",
          "Ensure every column is filled for each step",
          "Be specific about systems, roles, and dependencies",
          "Include key decision points and handoffs in your analysis",
          "Remember: in v2, this step must come BEFORE creating the executive summary"
        ]}
        version="v2"
      />
    );
  };
  
  const ExecutiveSummaryStep = () => {
    return (
      <AgentStep 
        stepNumber={2}
        agentName="Executive Summary"
        description="Create a process summary based on the detailed breakdown"
        inputFile={`P${processDetails.processId || '[ID]'}_${processDetails.processName || '[ProcessName]'}_v2_Step1_ProcessDetail.docx`}
        outputFile={`P[ID]_[ProcessName]_v2_Step2_ExecSummary.docx`.replace('[ID]', processDetails.processId).replace('[ProcessName]', processDetails.processName)}
        promptExamples={[
          `Using the process detail table from step 1, create an executive summary (250-300 words) of the ${processDetails.processName || '[Process Name]'} process with overall purpose, inputs/outputs, dependencies, and decision points.`,
          `Please help with step 2 of the CPS 230 assessment - create an Executive Summary for ${processDetails.processName || '[Process Name]'} based on the detailed breakdown from step 1.`,
          `Following the Executive Summary instructions in your system prompt, create a summary of ${processDetails.processName || '[Process Name]'} suitable for executive audiences.`
        ]}
        tips={[
          "The executive summary should be derived from the detailed process table (not created independently)",
          "Keep it concise (250-300 words) but comprehensive",
          "Focus on the overall purpose, key inputs/outputs, and critical dependencies",
          "Include major decision points and systems involved",
          "Make it suitable for executive audiences who may not know the technical details"
        ]}
        version="v2"
      />
    );
  };
  
  const ControlIdentificationStep = () => {
    return (
      <AgentStep 
        stepNumber={3}
        agentName="Control Identification"
        description="Extract controls directly from the process documentation"
        inputFile={`P${processDetails.processId || '[ID]'}_${processDetails.processName || '[ProcessName]'}_v2_Step1_ProcessDetail.docx`}
        outputFile={`P[ID]_[ProcessName]_v2_Step3_Controls.docx`.replace('[ID]', processDetails.processId).replace('[ProcessName]', processDetails.processName)}
        promptExamples={[
          `Extract a standalone list of all tools, templates, and potential controls identified in the ${processDetails.processName || '[Process Name]'} process documentation, noting where each control appears.`,
          `Please help with step 3 of the CPS 230 assessment - identify all controls in the ${processDetails.processName || '[Process Name]'} process and classify them as preventative or detective.`,
          `Following the Control Identification instructions in your system prompt, create a reference list of all control activities in the ${processDetails.processName || '[Process Name]'} process.`
        ]}
        tips={[
          "Focus on identifying all potential control activities in the process",
          "Note specifically where in the process each control appears (which step)",
          "Classify controls as preventative or detective where possible",
          "Consider implicit controls that might not be explicitly documented",
          "This early control identification will be important for later comparison with the Archer control register"
        ]}
        version="v2"
      />
    );
  };
  
  const FailureAnalysisStep = () => {
    return (
      <AgentStep 
        stepNumber={4}
        agentName="Failure Analysis"
        description="Identify common failure types across the process"
        inputFile={`P${processDetails.processId || '[ID]'}_${processDetails.processName || '[ProcessName]'}_v2_Step1_ProcessDetail.docx`}
        outputFile={`P[ID]_[ProcessName]_v2_Step4_FailureAnalysis.docx`.replace('[ID]', processDetails.processId).replace('[ProcessName]', processDetails.processName)}
        promptExamples={[
          `Identify common failure types that could occur across multiple steps of the ${processDetails.processName || '[Process Name]'} process and group them by category.`,
          `Please help with step 4 of the CPS 230 assessment - analyze potential failures in the ${processDetails.processName || '[Process Name]'} process following the refined v2 methodology.`,
          `Following the Failure Analysis instructions in your system prompt, identify failure categories in ${processDetails.processName || '[Process Name]'} and map where they would most likely occur.`
        ]}
        tips={[
          "Identify common failure types rather than mapping failures to each individual step",
          "Group failures by category (e.g., timeliness issues, accuracy problems, system failures)",
          "Map where in the process these common failure types are most likely to occur",
          "Consider what severe impact failure scenarios might have been missed",
          "This approach significantly reduces repetition compared to step-by-step failure analysis"
        ]}
        version="v2"
      />
    );
  };
  
  const RiskConsolidationStep = () => {
    return (
      <AgentStep 
        stepNumber={5}
        agentName="Risk Consolidation"
        description="Create and refine a risk register with follow-up questions"
        inputFile={`P${processDetails.processId || '[ID]'}_${processDetails.processName || '[ProcessName]'}_v2_Step4_FailureAnalysis.docx`}
        outputFile={`P[ID]_[ProcessName]_v2_Step5_RiskRegister.docx`.replace('[ID]', processDetails.processId).replace('[ProcessName]', processDetails.processName)}
        promptExamples={[
          `Consolidate the failure types into an initial risk register for ${processDetails.processName || '[Process Name]'}, then apply the refinement questions in sequence to improve quality.`,
          `Please help with step 5 of the CPS 230 assessment - create a comprehensive risk register for ${processDetails.processName || '[Process Name]'} following the two-step approach (initial creation then refinement).`,
          `Following the Risk Consolidation and CPS 230 Risk Categorization instructions in your system prompt, create a risk register for ${processDetails.processName || '[Process Name]'} with proper CPS 230 alignment.`
        ]}
        tips={[
          "First create an initial risk register with 8-12 risks, then apply the refinement questions",
          "Use the follow-up questions in sequence: redundancy elimination, materiality assessment, CPS 230 alignment",
          "Specifically consider operational resilience, business continuity, IT recovery, and third-party risks",
          "Categorize risks using the CPS 230-aligned categories in your system prompt",
          "For each risk, ensure proper format: 'Risk that [event] occurs due to [causes], resulting in [consequences]'",
          "Aim for 5-8 meaningful, consolidated risks that are properly aligned with CPS 230 requirements"
        ]}
        version="v2"
      />
    );
  };
  
  const ControlMappingStep = () => {
    return (
      <AgentStep 
        stepNumber={6}
        agentName="Control Mapping"
        description="Map identified risks to existing controls"
        inputFile={`P${processDetails.processId || '[ID]'}_${processDetails.processName || '[ProcessName]'}_v2_Step5_RiskRegister.docx and CPS230_Control_Register.xlsx`}
        outputFile={`P[ID]_[ProcessName]_v2_Step6_ControlMapping.docx`.replace('[ID]', processDetails.processId).replace('[ProcessName]', processDetails.processName)}
        promptExamples={[
          `Map each risk in our register to the existing controls in the Archer control register with an exhaustive line-by-line comparison.`,
          `Please help with step 6 of the CPS 230 assessment - perform comprehensive control mapping for ${processDetails.processName || '[Process Name]'} following the v2 methodology.`,
          `Following the Control Mapping and Control Effectiveness Assessment instructions in your system prompt, map ${processDetails.processName || '[Process Name]'} risks to existing controls and evaluate effectiveness.`
        ]}
        tips={[
          "Perform an exhaustive line-by-line comparison of risks to controls, not stopping after finding one match",
          "Create a clear mapping table showing all risks and their corresponding existing controls",
          "Create a separate table for controls deemed not relevant to identified risks",
          "Compare process controls identified in step 3 against the organizational control register",
          "Identify controls that appear in the process but aren't documented in the control register",
          "For v2 methodology, assess control effectiveness across design, operation and resilience contribution"
        ]}
        version="v2"
      />
    );
  };
  
  const GapAnalysisStep = () => {
    return (
      <AgentStep 
        stepNumber={7}
        agentName="Gap Analysis"
        description="Identify and classify control gaps"
        inputFile={`P${processDetails.processId || '[ID]'}_${processDetails.processName || '[ProcessName]'}_v2_Step6_ControlMapping.docx`}
        outputFile={`P[ID]_[ProcessName]_v2_Step7_GapAnalysis.docx`.replace('[ID]', processDetails.processId).replace('[ProcessName]', processDetails.processName)}
        promptExamples={[
          `Taking a holistic view of the mapped controls, identify control gaps in the ${processDetails.processName || '[Process Name]'} process and categorize them using the four-bucket classification system.`,
          `Please help with step 7 of the CPS 230 assessment - perform a comprehensive gap analysis for ${processDetails.processName || '[Process Name]'} with specific focus on CPS 230 control areas.`,
          `Following the Gap Analysis and CPS 230 Control Gap Assessment instructions in your system prompt, identify control gaps in ${processDetails.processName || '[Process Name]'} and provide recommendations.`
        ]}
        tips={[
          "Take a holistic view of all identified risks and their mapped controls",
          "Categorize controls into the four buckets: relevant registered controls, non-relevant registered controls, documented but unregistered controls, and control gaps",
          "For each risk, assess if there's an appropriate balance of preventative and detective controls",
          "Focus on the specific CPS 230 control areas: Critical Operations Resilience, Material Service Provider Controls, Information Asset Controls, and Testing Controls",
          "Provide specific recommendations for new or enhanced controls with clear justification based on CPS 230 requirements",
          "Consider where automation could improve control effectiveness and identify missing system controls"
        ]}
        version="v2"
      />
    );
  };

  // Final Review Step
  const FinalReviewStep = ({ version = "v1" }: { version?: string }) => {
    const getDocumentsToVerify = () => {
      if (version === "v2") {
        return [
          `P${processDetails.processId || '[ID]'}_${processDetails.processName || '[ProcessName]'}_v2_Step1_ProcessDetail.docx`,
          `P${processDetails.processId || '[ID]'}_${processDetails.processName || '[ProcessName]'}_v2_Step2_ExecSummary.docx`,
          `P${processDetails.processId || '[ID]'}_${processDetails.processName || '[ProcessName]'}_v2_Step3_Controls.docx`,
          `P${processDetails.processId || '[ID]'}_${processDetails.processName || '[ProcessName]'}_v2_Step4_FailureAnalysis.docx`,
          `P${processDetails.processId || '[ID]'}_${processDetails.processName || '[ProcessName]'}_v2_Step5_RiskRegister.docx`,
          `P${processDetails.processId || '[ID]'}_${processDetails.processName || '[ProcessName]'}_v2_Step6_ControlMapping.docx`,
          `P${processDetails.processId || '[ID]'}_${processDetails.processName || '[ProcessName]'}_v2_Step7_GapAnalysis.docx`,
        ];
      } else {
        return [
          `P${processDetails.processId || '[ID]'}_${processDetails.processName || '[ProcessName]'}_Step1_ProcessSummary.docx`,
          `P${processDetails.processId || '[ID]'}_${processDetails.processName || '[ProcessName]'}_Step2_ProcessDetail.docx`,
          `P${processDetails.processId || '[ID]'}_${processDetails.processName || '[ProcessName]'}_Step3_FailurePoints.docx`,
          `P${processDetails.processId || '[ID]'}_${processDetails.processName || '[ProcessName]'}_Step4_RiskConsolidation.docx`,
          `P${processDetails.processId || '[ID]'}_${processDetails.processName || '[ProcessName]'}_Step5_ExpectedControls.docx`,
          `P${processDetails.processId || '[ID]'}_${processDetails.processName || '[ProcessName]'}_Step6_ControlGapAnalysis.docx`,
        ];
      }
    };

    const documents = getDocumentsToVerify();

    const commonAccordionItems = [
      {
        id: 'document-verification',
        title: '1. Document Verification Checklist',
        icon: <CheckCircle2 className="h-5 w-5" />,
        content: (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Verify all documents have been created with correct naming:
            </p>
            <div className="space-y-2 mt-3">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center p-2 bg-slate-50 rounded">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  <code>{doc}</code>
                </div>
              ))}
            </div>
          </div>
        )
      }
    ];

    // V2-specific items for the final report
    const v2FinalReportItems = version === "v2" 
      ? [
          {
            id: 'final-report',
            title: '2. Create CPS 230 Compliance Dashboard',
            icon: <FileText className="h-5 w-5" />,
            content: (
              <div className="space-y-3">
                <p className="text-sm">Create a final compliance report by asking the agent to:</p>
                <div className="bg-slate-50 p-3 rounded-md border">
                  <p className="text-sm">
                    "Following the Final Reporting and CPS 230 Alignment section in your system prompt, create a comprehensive compliance report for the {processDetails.processName || '[Process Name]'} process that includes:
                  </p>
                  <ol className="list-decimal pl-6 text-sm mt-2 space-y-1">
                    <li>Executive Summary of key findings</li>
                    <li>CPS 230 Compliance Dashboard with traffic light indicators</li>
                    <li>Prioritized Action Plan for addressing gaps</li>
                    <li>Supporting evidence linked to process documentation</li>
                  </ol>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Save this final report as: <code className="bg-slate-100 px-1">{`P${processDetails.processId || '[ID]'}_${processDetails.processName || '[ProcessName]'}_v2_Final_ComplianceReport.docx`}</code>
                </p>
              </div>
            )
          },
          {
            id: 'methodology-benefits',
            title: '3. Review Process Benefits',
            icon: <Info className="h-5 w-5" />,
            content: (
              <div className="space-y-3">
                <p className="text-sm">The refined v2 approach has delivered several benefits:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>More meaningful, consolidated risks aligned with CPS 230 requirements</li>
                  <li>Reduced repetition in both failure points and risks</li>
                  <li>More holistic view of the control environment</li>
                  <li>Better connection of failure points to broader risk themes</li>
                  <li>More actionable insights for validation workshops</li>
                  <li>Better completeness against regulatory requirements</li>
                  <li>Identification of genuine control gaps rather than theoretical ones</li>
                </ul>
              </div>
            )
          }
        ] 
      : [];

    const accordionItems = [
      ...commonAccordionItems,
      ...(version === "v2" ? v2FinalReportItems : [])
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

  // Render appropriate step based on version and current step
  const renderStep = (currentStep: number) => {
    // Version 1 (Original)
    if (currentVersion.id === "v1") {
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
    }
    
    // Version 2 (Refined)
    else if (currentVersion.id === "v2") {
      switch (currentStep) {
        case 0:
          return <PreparationStep version="v2" />;
        case 1:
          return <ProcessDetailStep />;
        case 2:
          return <ExecutiveSummaryStep />;
        case 3:
          return <ControlIdentificationStep />;
        case 4:
          return <FailureAnalysisStep />;
        case 5:
          return <RiskConsolidationStep />;
        case 6:
          return <ControlMappingStep />;
        case 7:
          return <GapAnalysisStep />;
        case 8:
          return <FinalReviewStep version="v2" />;
        default:
          return <PreparationStep version="v2" />;
      }
    }
    
    // Default fallback
    return <PreparationStep />;
  };

  return (
    <WizardLayout
      title="CPS 230 Process Assessment Walkthrough"
      description="Guide for assessing a business process with the Copilot agents"
      steps={currentVersion.processSteps}
    >
      {({ state }) => renderStep(state.currentStep)}
    </WizardLayout>
  );
} 