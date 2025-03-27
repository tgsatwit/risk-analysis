import { StepItem } from "@/components/ui/steps";
import { CPS230_SETUP_STEPS, CPS230_WALKTHROUGH_STEPS } from '@/lib/cps230-constants';

// Define the version interface
export interface VersionConfig {
  id: string;
  name: string;
  description: string;
  setupSteps: StepItem[];
  processSteps: StepItem[];
  agentStructure: 'multiple' | 'single'; // For v2 consolidated agent approach
  isDefault?: boolean;
}

// Create version configurations
export const VERSIONS: VersionConfig[] = [
  {
    id: "v1",
    name: "Original (v1)",
    description: "Original 6-agent approach with sequential analysis",
    setupSteps: CPS230_SETUP_STEPS, // Import from existing constants
    processSteps: CPS230_WALKTHROUGH_STEPS, // Reuse existing walkthrough steps
    agentStructure: 'multiple',
    isDefault: true
  },
  {
    id: "v2",
    name: "Refined (v2)",
    description: "Refined approach with consolidated agent and improved analysis flow",
    setupSteps: [
      {
        id: 0,
        title: "SharePoint Structure",
        description: "Create standardized folder structure and upload global reference files"
      },
      {
        id: 1,
        title: "Consolidated Agent Setup",
        description: "Create comprehensive agent with structured reference document"
      },
      {
        id: 2,
        title: "Control Register",
        description: "Upload and prepare control register from Archer"
      },
      {
        id: 3,
        title: "Templates & Prompts",
        description: "Create prompt templates for each analysis step"
      }
    ],
    processSteps: [
      { id: 0, title: "Preparation", description: "Process identification and documentation" },
      { id: 1, title: "Process Detail", description: "Detailed breakdown of process steps" },
      { id: 2, title: "Executive Summary", description: "Create process summary from details" },
      { id: 3, title: "Control Identification", description: "Extract controls from process" },
      { id: 4, title: "Failure Analysis", description: "Identify common failure types" },
      { id: 5, title: "Risk Consolidation", description: "Create and refine risk register" },
      { id: 6, title: "Control Mapping", description: "Map risks to existing controls" },
      { id: 7, title: "Gap Analysis", description: "Identify and classify control gaps" },
      { id: 8, title: "Final Review", description: "Review and finalize documentation" }
    ],
    agentStructure: 'single'
  }
];

// Helper to get the default version
export const getDefaultVersion = (): VersionConfig => {
  return VERSIONS.find(v => v.isDefault) || VERSIONS[0];
}; 