"use client";

import React from 'react';
import { useSetup } from '@/lib/setup-context';
import { 
  FileText, 
  Download,
  Copy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function TemplatesStep() {
  const { state, updateState } = useSetup();
  const { toast } = useToast();

  React.useEffect(() => {
    // Mark this step as viewed when component mounts
    if (!state.completedSteps.includes(4)) {
      updateState({
        completedSteps: [...state.completedSteps, 4]
      });
    }
  }, [state.completedSteps, updateState]);

  // Sample content from system prompt
  const systemPromptPreview = `# CPS 230 Risk Assessment Copilot - System Prompt

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

  // Sample content from starter prompts
  const starterPromptsPreview = `# CPS 230 Risk Assessment Copilot - Starter Prompts

## Greeting Message
"Welcome to the CPS 230 Risk Assessment Copilot. I can help you analyze your business processes for operational risks and controls in compliance with APRA CPS 230. Simply share your process documentation with me, and I'll guide you through a structured 6-step assessment approach."

## Conversation Starters

- "Can you analyze this member onboarding process for CPS 230 risks?"
- "Please help me identify the key failure points in our claims processing workflow."
- "What controls should we have for our investment management process?"
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

  // Sample content from process analysis template
  const templatePreview = `# CPS 230 Process Analysis Template

## 1. Process Summary
[Brief executive summary of the process, its purpose, flow, key decision points, and critical dependencies]

## 2. Process Details Table

| Process Step | Intended Purpose | Key Activities | Key Systems | Roles/Teams | Tools & Templates | Dependencies |
|-------------|-----------------|---------------|------------|------------|-----------------|--------------|
| Step 1 | [Purpose] | [Activities] | [Systems] | [Roles] | [Tools] | [Dependencies] |
| Step 2 | [Purpose] | [Activities] | [Systems] | [Roles] | [Tools] | [Dependencies] |
| Step 3 | [Purpose] | [Activities] | [Systems] | [Roles] | [Tools] | [Dependencies] |
| Step 4 | [Purpose] | [Activities] | [Systems] | [Roles] | [Tools] | [Dependencies] |
| Step 5 | [Purpose] | [Activities] | [Systems] | [Roles] | [Tools] | [Dependencies] |

## 3. Failure Point Analysis

| Process Step | Failure Point | Potential Causes | Potential Impacts |
|-------------|--------------|-----------------|------------------|
| Step 1 | [What could go wrong] | [Causes] | [Impacts] |
| Step 2 | [What could go wrong] | [Causes] | [Impacts] |
| Step 3 | [What could go wrong] | [Causes] | [Impacts] |
| Step 4 | [What could go wrong] | [Causes] | [Impacts] |
| Step 5 | [What could go wrong] | [Causes] | [Impacts] |

## 4. Risk Consolidation

| Risk ID | Risk Description | Risk Category | Likelihood | Impact | Risk Rating |
|--------|-----------------|--------------|-----------|--------|------------|
| R1 | [Description] | [Category] | [Low/Med/High] | [Low/Med/High] | [Rating] |
| R2 | [Description] | [Category] | [Low/Med/High] | [Low/Med/High] | [Rating] |
| R3 | [Description] | [Category] | [Low/Med/High] | [Low/Med/High] | [Rating] |
| R4 | [Description] | [Category] | [Low/Med/High] | [Low/Med/High] | [Rating] |
| R5 | [Description] | [Category] | [Low/Med/High] | [Low/Med/High] | [Rating] |

## 5. Expected Controls

| Risk ID | Control Type | Control Description | Control Owner | Implementation Status |
|--------|-------------|-------------------|--------------|---------------------|
| R1 | [Preventative/Detective] | [Description] | [Owner] | [Status] |
| R2 | [Preventative/Detective] | [Description] | [Owner] | [Status] |
| R3 | [Preventative/Detective] | [Description] | [Owner] | [Status] |
| R4 | [Preventative/Detective] | [Description] | [Owner] | [Status] |
| R5 | [Preventative/Detective] | [Description] | [Owner] | [Status] |

## 6. Gap Analysis

| Required Control | Current Status | Gap | Recommendation | Priority |
|-----------------|---------------|-----|---------------|----------|
| [Control] | [Implemented/Partial/Missing] | [Description] | [Action] | [High/Med/Low] |
| [Control] | [Implemented/Partial/Missing] | [Description] | [Action] | [High/Med/Low] |
| [Control] | [Implemented/Partial/Missing] | [Description] | [Action] | [High/Med/Low] |
| [Control] | [Implemented/Partial/Missing] | [Description] | [Action] | [High/Med/Low] |
| [Control] | [Implemented/Partial/Missing] | [Description] | [Action] | [High/Med/Low] |`;

  // Sample content from risk taxonomy
  const taxonomyPreview = `# Australian Superannuation - Risk Management Taxonomy

## Operational Risk Categories

### People Risk
- Workforce planning and resource management
- Staff capability and training
- Key person dependencies
- Workplace health and safety
- Employee misconduct
- Staff turnover and retention
- Performance management
- Remuneration and incentives
- Organizational culture
- Industrial relations

### Process Risk
- Process design and documentation
- Process execution
- Reconciliation and quality control
- Change management
- Business continuity
- Reporting and disclosure
- Policy compliance
- Transaction processing
- Regulatory compliance
- Data management and record keeping

### Systems Risk
- System availability and performance
- Cyber security
- Data integrity and quality
- Technology change management
- System integration and interfaces
- IT infrastructure
- Software development
- IT governance
- Access control and authentication
- System recovery and resilience

### External Event Risk
- Natural disasters
- Pandemic
- Third-party/vendor management
- Physical security
- Political and social events
- Regulatory change
- Market disruption
- Competitor actions
- Reputation and brand
- Legal and litigation

## Financial Risk Categories

### Investment Risk
- Market risk
- Liquidity risk
- Credit risk
- Concentration risk
- Valuation risk
- Counterparty risk
- Foreign exchange risk
- Interest rate risk
- Inflation risk
- Derivatives risk

### Insurance Risk
- Pricing risk
- Claims management
- Underwriting
- Reinsurance
- Reserving risk
- Mortality and longevity risk
- Morbidity risk
- Disability risk
- Claims experience
- Product design risk

## Strategic Risk Categories

### Governance Risk
- Board effectiveness
- Management oversight
- Decision-making processes
- Organizational structure
- Delegations and authorities
- Policy framework
- Assurance mechanisms
- Conduct risk
- Ethical standards
- Whistleblower management

### Strategic Risk
- Business model sustainability
- Merger and acquisition
- Product development
- Market positioning
- Member demographics
- Competitive landscape
- Digital transformation
- Regulatory strategy
- Growth management
- Resource allocation`;

  const handleCopyText = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `The ${type} has been copied to your clipboard.`,
    });
  };

  return (
    <div className="space-y-6">
      <Alert className="bg-blue-50 border-blue-100">
        <AlertDescription className="text-sm text-blue-700">
          Use these templates and prompts to configure your CPS 230 Risk Assessment Copilot.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <Tabs defaultValue="system-prompt" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="system-prompt">System Prompt</TabsTrigger>
            <TabsTrigger value="starter-prompts">Starter Prompts</TabsTrigger>
            <TabsTrigger value="template">Analysis Template</TabsTrigger>
            <TabsTrigger value="taxonomy">Risk Taxonomy</TabsTrigger>
          </TabsList>

          <TabsContent value="system-prompt" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">System Prompt</h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => handleCopyText(systemPromptPreview, 'System Prompt')}>
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Use this as the base instructions for your Copilot agent to define its behavior and methodological approach.
            </p>
            <div className="bg-gray-50 p-4 rounded-md border">
              <pre className="text-xs whitespace-pre-wrap overflow-auto max-h-[300px]">{systemPromptPreview}</pre>
            </div>
          </TabsContent>

          <TabsContent value="starter-prompts" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Starter Prompts</h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => handleCopyText(starterPromptsPreview, 'Starter Prompts')}>
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              These prompt examples help users start conversations with the Copilot agent.
            </p>
            <div className="bg-gray-50 p-4 rounded-md border">
              <pre className="text-xs whitespace-pre-wrap overflow-auto max-h-[300px]">{starterPromptsPreview}</pre>
            </div>
          </TabsContent>

          <TabsContent value="template" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Process Analysis Template</h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => handleCopyText(templatePreview, 'Analysis Template')}>
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              This template defines the structure for the Copilot&apos;s process analysis outputs.
            </p>
            <div className="bg-gray-50 p-4 rounded-md border">
              <pre className="text-xs whitespace-pre-wrap overflow-auto max-h-[300px]">{templatePreview}</pre>
            </div>
          </TabsContent>

          <TabsContent value="taxonomy" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Risk Taxonomy</h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => handleCopyText(taxonomyPreview, 'Risk Taxonomy')}>
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              This taxonomy defines the risk categories specific to Australian superannuation companies.
            </p>
            <div className="bg-gray-50 p-4 rounded-md border">
              <pre className="text-xs whitespace-pre-wrap overflow-auto max-h-[300px]">{taxonomyPreview}</pre>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="bg-gray-50 p-4 rounded-md border">
        <h4 className="text-sm font-medium mb-3">Template Usage Guidelines</h4>
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <FileText className="h-4 w-4 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">System Prompt</p>
              <p className="text-xs text-gray-500">Paste this into the &ldquo;Base Instructions&rdquo; section of your Copilot configuration.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FileText className="h-4 w-4 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Starter Prompts</p>
              <p className="text-xs text-gray-500">Use these in the &ldquo;Greeting Message&rdquo; and &ldquo;Conversation Starters&rdquo; sections.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FileText className="h-4 w-4 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Templates & Taxonomy</p>
              <p className="text-xs text-gray-500">Upload these to your SharePoint reference documents library for the agent to access.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 