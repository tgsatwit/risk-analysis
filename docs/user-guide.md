# CPS 230 Risk Assessment Copilot - User Guide

## Introduction

The CPS 230 Risk Assessment Copilot is a custom AI assistant designed to help you analyze business processes for operational risks and controls in compliance with APRA CPS 230 requirements. This guide will help you get the most out of the Copilot agent.

## Accessing the Copilot Agent

1. **Via Microsoft Teams:**
   - Open Microsoft Teams
   - In the search bar at the top, type "CPS 230 Risk Assessment Copilot"
   - Select the bot from the search results
   - Start a new chat

2. **Via Web Interface** (if enabled):
   - Go to your organization's Copilot Studio portal
   - Find and select "CPS 230 Risk Assessment Copilot"
   - Start a new conversation

## Basic Interaction

When you start a conversation with the Copilot, it will greet you and provide suggestions for how to begin. You can:

- Type your own questions or instructions
- Click on one of the suggested starter prompts
- Upload or link to a process document to analyze

## The 6-Step Risk Assessment Process

The Copilot is designed to guide you through a structured 6-step risk assessment process:

### Step 1: Process Summary
Ask the Copilot to summarize a process document by providing a SharePoint link or uploading the document.

**Example prompts:**
- "Please analyze this process document: [SharePoint link]"
- "Summarize the Member Onboarding process"
- "What is the overall purpose and flow of this process?"

The Copilot will produce a concise executive summary of the process, highlighting its purpose, flow, key decision points, and critical dependencies.

### Step 2: Process Details Table
Ask the Copilot to extract the key steps, roles, systems, and other details from the process documentation.

**Example prompts:**
- "Create a process summary table for this document"
- "List the key steps, roles, and systems in this process"
- "What are the major components of this process?"

The Copilot will produce a structured table with columns for Process Step, Intended Purpose, Key Activities, Key Systems Used, Roles/Teams Involved, Tools & Templates, and Key Dependencies.

### Step 3: Failure Point Analysis
Ask the Copilot to identify what could go wrong at each step of the process.

**Example prompts:**
- "What could go wrong in this process? Identify failure points."
- "For each process step, what are the potential failures, causes, and impacts?"
- "Identify the key vulnerabilities in this process"

The Copilot will analyze each process step and identify 3-5 potential failure points per step, along with potential causes and impacts.

### Step 4: Risk Consolidation
Ask the Copilot to consolidate the failure points into a risk register with categorized risks.

**Example prompts:**
- "Generate a risk register from these failure points"
- "Consolidate these failures into 5-10 well-defined risks"
- "Create a risk register with properly categorized risks"

The Copilot will create a risk register with formal risk statements, categorized according to the company's risk taxonomy, and linked to the relevant process steps and failure points.

### Step 5: Expected Controls
Ask the Copilot to recommend controls that should be in place to mitigate each identified risk.

**Example prompts:**
- "What controls would you expect for these risks?"
- "For each risk, what preventative and detective controls should be in place?"
- "Recommend appropriate controls based on our framework"

The Copilot will suggest relevant controls for each risk, indicating whether they are preventative, detective, or corrective, and whether they are manual, automated, or semi-automated.

### Step 6: Control Gap Analysis
Ask the Copilot to compare the expected controls against what's documented in the process to identify gaps.

**Example prompts:**
- "Assess the existing controls and identify any gaps"
- "Compare the expected controls to what's in the documentation"
- "Perform a gap analysis on the controls"

The Copilot will analyze whether each expected control is present, partially evident, or missing from the process documentation, providing specific evidence and recommended next steps.

## Tips for Effective Use

### Providing Process Documentation

For best results when analyzing a process:

1. **Use SharePoint Links:** The most reliable method is to share a SharePoint link to the process document: 
   ```
   Please analyze this process: https://[tenant].sharepoint.com/sites/CPS230Processes/Shared%20Documents/Member_Onboarding_Process.pdf
   ```

2. **Reference by Name:** If the document is in the configured knowledge base, you can refer to it by name:
   ```
   Analyze the Member Onboarding process
   ```

3. **Be Specific:** When asking for analysis, be clear about which process you're referring to.

### Conversation Management

1. **One Process Per Chat:** Start a new chat for each process assessment to avoid confusion.

2. **Maintain Context:** The Copilot will remember previous steps in the current conversation. For example, after identifying failure points, you can simply ask "Create a risk register from these" without repeating all the details.

3. **Sequential Analysis:** While you can skip steps or go back, the 6-step process works best when followed sequentially, as each step builds on the previous one.

4. **Save Important Outputs:** Copy important responses to a document or save the conversation for future reference.

### Reviewing and Refining Results

1. **Verify Accuracy:** Always review the Copilot's analysis for accuracy and completeness. The AI is an assistant, not a replacement for human judgment.

2. **Request Clarification:** If you don't understand something or need more detail, ask follow-up questions:
   ```
   Why did you classify this as a People Risk rather than a Process Risk?
   ```

3. **Provide Feedback:** If you notice incorrect or missing information, you can correct the Copilot:
   ```
   The reconciliation control you mentioned is actually automated, not manual
   ```

4. **Request Format Changes:** If you need the output in a different format, just ask:
   ```
   Can you present this risk register in bullet points instead of a table?
   ```

## Example Workflow

Here's a typical workflow for a complete process analysis:

1. Start a new chat with the Copilot
2. Share the process document: "Please analyze this process document: [SharePoint link]"
3. Review the process summary and table the Copilot provides
4. Ask for failure point analysis: "What could go wrong at each step of this process?"
5. Request risk consolidation: "Please consolidate these failure points into a risk register"
6. Ask for control recommendations: "What controls would you expect for these risks?"
7. Request gap analysis: "Compare these expected controls to what's documented in the process"
8. Review the complete analysis and copy relevant sections to your CPS 230 documentation

## Limitations and Known Issues

- The Copilot can only analyze text content it can extract from documents. Complex diagrams or images in PDFs may not be fully interpreted.
- The Copilot works best with clearly structured process documentation.
- Very lengthy documents may need to be analyzed in sections.
- The Copilot relies on documentation evidence for gap analysis; it cannot access systems or interview people directly.

## Getting Help

If you encounter issues with the Copilot:

1. Ask the Copilot itself for guidance: "How should I phrase my question about control gaps?"
2. Contact your risk team administrator
3. Submit feedback via the designated Teams channel for Copilot feedback

## Feedback and Improvement

Your feedback helps improve the Copilot. Please share:
- Examples of particularly helpful or unhelpful responses
- Suggestions for additional capabilities
- Any consistent issues you encounter

Submit feedback to [designated contact or channel]. 