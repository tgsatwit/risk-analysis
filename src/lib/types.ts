// Client and Organization Types
export interface Organization {
  id: string;
  name: string;
  industry: string;
  size: "small" | "medium" | "large";
  country: string;
  contactEmail?: string;
  contactPhone?: string;
}

// Microsoft Copilot Studio Integration Types
export interface CopilotStudioCredentials {
  tenantId: string;
  clientId?: string;
  clientSecret?: string;
  authMethod: "interactive" | "clientSecret";
}

// SharePoint Integration Types
export interface SharePointConfig {
  siteUrl: string;
  processDocsLibrary: string;
  referenceDocsLibrary: string;
}

export interface Document {
  id: string;
  title: string;
  type: "process" | "taxonomy" | "framework" | "template" | "instruction" | "other";
  url: string;
  uploadedAt: string;
  size: number;
}

// Agent Configuration Types
export interface AgentConfig {
  id: string;
  name: string;
  description: string;
  systemPromptId: string;
  welcomeMessage: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SetupState {
  currentStep: number;
  completedSteps: number[];
  organization?: Organization;
  msftCredentials?: CopilotStudioCredentials;
  sharePointConfig?: SharePointConfig;
  documents: Document[];
  agentConfig?: AgentConfig;
}

export interface SetupContext {
  state: SetupState;
  updateState: (newState: Partial<SetupState>) => void;
  reset: () => void;
}

// Setup Step Types
export type SetupStep = {
  id: string;
  title: string;
  description: string;
}; 