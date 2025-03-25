import { SetupStep } from "./types";

export const SETUP_STEPS: SetupStep[] = [
  {
    id: "welcome",
    title: "Welcome",
    description: "Introduction to CPS 230 Risk Assessment Copilot",
  },
  {
    id: "overview",
    title: "Overview",
    description: "Implementation steps and required resources",
  },
  {
    id: "sharepoint",
    title: "SharePoint",
    description: "SharePoint environment preparation guidelines",
  },
  {
    id: "copilot-setup",
    title: "Copilot Setup",
    description: "Microsoft Copilot Studio agent configuration",
  },
  {
    id: "templates",
    title: "Templates",
    description: "System prompts and starter templates",
  },
  {
    id: "deployment",
    title: "Deployment",
    description: "Roll-out and user training guidance",
  },
  {
    id: "example",
    title: "Usage Example",
    description: "Sample workflow and risk assessment process",
  },
];

export const DOCUMENT_TYPES = [
  { value: "process", label: "Process Document" },
  { value: "taxonomy", label: "Risk Taxonomy" },
  { value: "framework", label: "Controls Framework" },
  { value: "template", label: "Process Analysis Template" },
  { value: "instruction", label: "Assessment Instructions" },
  { value: "other", label: "Other" },
];

export const COUNTRY_OPTIONS = [
  { value: "australia", label: "Australia" },
  { value: "new-zealand", label: "New Zealand" },
  { value: "united-states", label: "United States" },
  { value: "united-kingdom", label: "United Kingdom" },
  { value: "canada", label: "Canada" },
  { value: "singapore", label: "Singapore" },
  { value: "other", label: "Other" },
];

export const INDUSTRY_OPTIONS = [
  { value: "finance", label: "Financial Services" },
  { value: "insurance", label: "Insurance" },
  { value: "superannuation", label: "Superannuation" },
  { value: "banking", label: "Banking" },
  { value: "wealth-management", label: "Wealth Management" },
  { value: "government", label: "Government" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
]; 