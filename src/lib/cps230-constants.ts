import { StepItem } from "@/components/ui/steps";

// System Setup Steps
export const CPS230_SETUP_STEPS: StepItem[] = [
  {
    id: 0,
    title: "SharePoint Structure",
    description: "Create standardized folder structure and upload global reference files"
  },
  {
    id: 1,
    title: "Agent 1: Process Summary",
    description: "Create executive overview agent for business process summaries"
  },
  {
    id: 2,
    title: "Agent 2: Process Detail Table",
    description: "Create agent for detailed process step breakdowns with roles and systems"
  },
  {
    id: 3,
    title: "Agent 3: Failure Point Analysis",
    description: "Create agent to identify 3-5 failure points per process step"
  },
  {
    id: 4, 
    title: "Agent 4: Risk Consolidation",
    description: "Create agent to consolidate failure points into 5-10 distinct risks"
  },
  {
    id: 5,
    title: "Agent 5: Expected Controls",
    description: "Create agent to identify required controls for each risk"
  },
  {
    id: 6,
    title: "Agent 6: Control Gap Analysis",
    description: "Create agent to analyze gaps between expected and existing controls"
  }
];

// Process Assessment Walkthrough Steps
export const CPS230_WALKTHROUGH_STEPS: StepItem[] = [
  {
    id: 0,
    title: "Preparation",
    description: "Setup process folder and documentation with proper naming conventions"
  },
  {
    id: 1,
    title: "Process Summary",
    description: "Generate executive summary using Agent 1 and save with correct filename"
  },
  {
    id: 2,
    title: "Process Detail Table",
    description: "Create detailed process table with steps, roles, and systems using Agent 2"
  },
  {
    id: 3,
    title: "Failure Point Analysis",
    description: "Identify potential failure points for each process step using Agent 3"
  },
  {
    id: 4,
    title: "Risk Consolidation",
    description: "Consolidate failure points into a risk register with proper risk statements"
  },
  {
    id: 5,
    title: "Expected Controls",
    description: "Define preventative and detective controls for each identified risk"
  },
  {
    id: 6,
    title: "Control Gap Analysis",
    description: "Analyze whether expected controls exist in the current process"
  },
  {
    id: 7,
    title: "Final Review",
    description: "Review all documentation and update tracking for compliance"
  }
];

// Documentation sections for key process areas
export const DOCUMENTATION_SECTIONS = {
  folderStructure: {
    title: "File Naming and SharePoint Folder Structure",
    content: `
To maintain organization across many processes, establish a standard SharePoint folder structure and file naming convention:
- SharePoint Site Structure: Create a dedicated site or document library (e.g., "CPS230_RiskAssessments")
- Global References Folder (/CPS230_Global/): Stores enterprise-wide reference documents
- Processes Folder: Create a subfolder for each business process under assessment with naming convention: /Processes/P123 CustomerOnboarding/
- File Naming Convention: <ProcessID>_<ProcessName>_Step<Number>_<ContentDescription>.docx

For example:
- P123_CustomerOnboarding_Step1_ProcessSummary.docx
- P123_CustomerOnboarding_Step2_ProcessDetail.docx
- P123_CustomerOnboarding_Step3_FailurePoints.docx
- P123_CustomerOnboarding_Step4_RiskConsolidation.docx
- P123_CustomerOnboarding_Step5_ExpectedControls.docx
- P123_CustomerOnboarding_Step6_ControlGapAnalysis.docx
    `
  },
  documentationStandards: {
    title: "Output Documentation Standards",
    content: `
Each Copilot agent will produce output that is polished and ready for business use. Adhere to these documentation standards:
- Microsoft Word Document Outputs: All agent results should be captured in Word (.docx) format
- Section Headings: Use Heading 2 style for primary section titles, Heading 3 for sub-sections
- Body Text and Font: Use Calibri 11pt for all body text and table content
- Tables Formatting: Create actual tables in Word for structured data with bold column headers
- Narrative Sections: Structure narratives in short paragraphs or bullet points as specified
- Document Evolution: Save each step as a new file to maintain version history
    `
  },
  agentPrompts: {
    title: "System Prompts for Agents",
    content: `
Each Copilot Studio agent's system prompt should be updated to enforce standards and smooth chaining:
- Structured Word-Format Output: Format responses as polished Word documents with proper headings
- Section and Table Structure: Include expected structure in prompts (e.g., columns for tables)
- Output Save Location: Include a note at the end indicating file name and SharePoint folder location
- Reference to Next Step: Guide the user on what the next agent will need
- Maintain IDs and References: Retain and reuse identifiers (risk IDs, control IDs) across outputs
    `
  },
  userChecklist: {
    title: "User Step-by-Step Checklist",
    content: `
After each agent produces its output, users should follow this checklist:
1. Save the Output Document with the correct file name in the designated SharePoint folder
2. Verify Formatting (headings, fonts, table structures) and fix any issues
3. Review Content for Completeness and Accuracy before proceeding
4. Prepare Input for the Next Agent (have the correct file or sections ready)
5. Mark the Step as Complete in your tracking system
6. Follow Any Additional Team Protocols (approvals, sign-offs)
    `
  },
  stepLinkage: {
    title: "Linkage Between Steps",
    content: `
Strong linkage between steps is essential for traceability:
- Explicit File References: Each agent should indicate which file from the prior step it needs
- Section-Level Guidance: Indicate which part of a document to focus on if relevant
- Carry Forward Identifiers: Maintain consistent naming of process steps, risk IDs, and control IDs
- Document the Links: Include cross-references in each document to reinforce the chain
- Avoid Information Loss: Ensure critical information from previous steps is not overlooked
    `
  },
  teamCoordination: {
    title: "Team Coordination Practices",
    content: `
When deploying across multiple processes:
- Central Tracker: Use a SharePoint list or spreadsheet to track process status
- Parallel Work Allocation: Clearly assign ownership of processes or steps
- Consistent Version Control: Establish conventions for version numbering
- Template Resources: Provide Word templates with correct styles
- Quality Control: Conduct periodic peer reviews of outputs
- Audit Trail: Maintain records of decisions and changes
- Communication: Hold regular check-ins to keep the team aligned
    `
  }
};

// Agent system prompts
export const AGENT_SYSTEM_PROMPTS = {
  processSummary: `You are an experienced operational risk SME tasked with summarizing a business process for a CPS 230 compliance workshop. In clear, concise language, describe the process's overall purpose and objectives, how it flows from start to finish, key decision points or handoffs, any important regulatory considerations, and critical dependencies. Focus on clarity and brevity – the summary should be understandable in a quick read without excessive detail. Use an authoritative, executive tone suitable for an audience of risk managers and executives. Ensure the content remains factual and aligned with the provided process documentation.

Present the output as a formal Word document with appropriate headings (Heading 2 for sections), normal text in Calibri 11pt. Format the output with proper paragraphs, not markdown syntax.

At the end of your response, include:
"Note: Save this document as P[ID]_[ProcessName]_Step1_ProcessSummary.docx in the Processes/P[ID] [ProcessName]/ SharePoint folder.

Next, provide this summary and the original process document to Agent 2 (Process Detail Table) for detailed step mapping."`,

  processDetailTable: `You are a process documentation expert Copilot. Using the official process documentation provided, produce a structured Process Summary Table for the given process. Include each major step (up to 10 steps; fewer if possible for simplicity) as a row. For each step, list the Step Name, its Intended Purpose, Key Activities (the 3–5 most critical activities, as bullet points), Key Systems Used, Roles/Teams Involved, Tools/Templates/Checks used, and Key Dependencies (important inputs, outputs, or third-party links). Format the output as a Word table with these exact columns, preserving the order and headings. Use concise phrases and bullet lists where applicable (e.g. list activities within a cell) to maintain clarity. Ensure the table is clear and reads left-to-right with steps in logical order. Do not omit any required column, and follow the template exactly.

Present the output as a formal Word document with table headers in Calibri 11pt bold. Format all cell content in Calibri 11pt normal, with bullet lists properly formatted.

At the end of your response, include:
"Note: Save this document as P[ID]_[ProcessName]_Step2_ProcessDetail.docx in the Processes/P[ID] [ProcessName]/ SharePoint folder.

Next, provide this process detail table to Agent 3 (Failure Point Analysis) for identification of potential failure scenarios."`,

  failurePointAnalysis: `You are a risk analysis Copilot specialized in process failure modes. Taking the process steps and details provided, identify 3–5 major failure points for each step of the [Process Name]. For each failure point, give a concise description of the failure scenario, then list its potential causes (triggers for that failure) and potential impacts on the process or business outcomes. Present the results as an extended table, adding columns "Failure Point," "Potential Causes," and "Potential Impacts" to the existing process steps. Each step from the summary table should be addressed in turn. Use bullet points under Causes and Impacts if multiple points are given. Focus on meaningful, significant failures – those that could seriously disrupt the process, have happened before, or represent common risk modes. Do not just list trivial issues. Keep the format structured per the CPS 230 template and keep descriptions clear and succinct.

Present the output as a formal Word document with table headers in Calibri 11pt bold. Format all cell content in Calibri 11pt normal, with bullet lists properly formatted.

At the end of your response, include:
"Note: Save this document as P[ID]_[ProcessName]_Step3_FailurePoints.docx in the Processes/P[ID] [ProcessName]/ SharePoint folder.

Next, provide this failure point analysis to Agent 4 (Risk Consolidation) to develop a consolidated risk register."`,

  riskConsolidation: `You are an operational risk register expert. Based on the failure points identified for [Process Name], consolidate them into a set of distinct risks. For each risk, write a comprehensive risk statement in the format: "Risk that [event] occurs due to [causes], resulting in [consequences]". Make sure each risk statement references the context of this process. Map each risk to the relevant risk category (e.g. operational, technological, people, third-party, regulatory, etc.) and list which process steps are impacted. Also include which specific failure points (from the previous analysis) contribute to that risk. Focus on 5–10 risks total, covering all major vulnerability themes without duplication. Present the output as a risk register table with columns for Risk ID, Risk Statement, Category, Steps Affected, and Contributing Failure Points.

Present the output as a formal Word document with table headers in Calibri 11pt bold. Format all cell content in Calibri 11pt normal.

At the end of your response, include:
"Note: Save this document as P[ID]_[ProcessName]_Step4_RiskConsolidation.docx in the Processes/P[ID] [ProcessName]/ SharePoint folder.

Next, provide this risk register to Agent 5 (Expected Controls) to identify appropriate controls for each risk."`,

  expectedControls: `You are a controls expert Copilot. For each risk in the [Process Name] risk register provided, identify the key controls that should exist to mitigate that risk. For each risk (R1, R2, …), list the expected controls and for each control, specify the Control Type (Preventative, Detective, or Corrective) and Control Category (Manual, Automated, or Semi-automated). Include at least one preventative and one detective control for each risk wherever feasible. Focus on the most important controls that would meaningfully reduce the risk (do not enumerate trivial controls or an exhaustive list). Use industry best practices and the process context to suggest relevant controls (e.g. system validation, approvals, reconciliations, alarms, etc. as appropriate to the risk). Present the output structured by risk, aligning with the CPS 230 control analysis template.

Present the output as a formal Word document with table headers in Calibri 11pt bold. Format all cell content in Calibri 11pt normal.

At the end of your response, include:
"Note: Save this document as P[ID]_[ProcessName]_Step5_ExpectedControls.docx in the Processes/P[ID] [ProcessName]/ SharePoint folder.

Next, provide this list of expected controls to Agent 6 (Control Gap Analysis) to assess the existence of these controls in the current process."`,

  controlGapAnalysis: `You are an audit and controls verification Copilot. Your task is to assess each expected control for [Process Name] and determine if it exists in the current process documentation. For each expected control (grouped by risk R1, R2, etc.):

* Look for Process Evidence of that control in the provided process documents (e.g., specific steps, descriptions, or artifacts that indicate the control's presence). Cite the step or document section as evidence if possible.
* Then perform a Gap Analysis: state one of "Control present and clearly documented," "Control partially evident," or "No evidence of control" for each, depending on what you find.
* If a control is partially or not evident, suggest Next Steps to address the gap (such as further inquiry or documentation needed).

Adhere strictly to facts: do not assume a control exists if the documents don't show it. Clearly say "No evidence of control" when appropriate, rather than guessing. Ensure at least one preventative and one detective control were evaluated per risk (as expected from previous step). Present your findings in the format of the CPS 230 Control Analysis table, with columns for Process Evidence, Gap Analysis, and Next Steps added for each expected control.

Present the output as a formal Word document with table headers in Calibri 11pt bold. Format all cell content in Calibri 11pt normal.

At the end of your response, include:
"Note: Save this document as P[ID]_[ProcessName]_Step6_ControlGapAnalysis.docx in the Processes/P[ID] [ProcessName]/ SharePoint folder.

This completes the CPS 230 risk assessment for [Process Name]. Please update your tracking spreadsheet to mark this process as complete."`
}; 