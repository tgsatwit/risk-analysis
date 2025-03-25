"use client";

import React from 'react';
import { useSetup } from '@/lib/setup-context';
import { WizardLayout } from '@/components/wizard/wizard-layout';
import { WelcomeStep } from '@/components/wizard/steps/welcome-step';
import { OverviewStep } from '@/components/wizard/steps/overview-step';
import { SharePointStep } from '@/components/wizard/steps/sharepoint-step';
import { CopilotSetupStep } from '@/components/wizard/steps/copilot-setup-step';
import { TemplatesStep } from '@/components/wizard/steps/templates-step';
import { DeploymentStep } from '@/components/wizard/steps/deployment-step';
import { ExampleStep } from '@/components/wizard/steps/example-step';
import { SETUP_STEPS } from '@/lib/constants';

export default function HomePage() {
  const { state, updateState } = useSetup();
  const { currentStep } = state;

  // Handle step completion
  const handleStepComplete = () => {
    updateState({
      currentStep: currentStep + 1,
    });
  };
  
  // Handle next button click for non-form steps
  const handleNext = () => {
    if (currentStep === 0) { // Welcome step - no form to validate
      handleStepComplete();
      return false; // Prevent default navigation
    }
    
    // For other steps
    return true; // Allow default navigation
  };
  
  // Render the appropriate step based on current step
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep />;
      case 1:
        return <OverviewStep />;
      case 2:
        return <SharePointStep />;
      case 3:
        return <CopilotSetupStep />;
      case 4:
        return <TemplatesStep />;
      case 5:
        return <DeploymentStep />;
      case 6:
        return <ExampleStep />;
      default:
        return <WelcomeStep />;
    }
  };
  
  // Get current step details
  const currentStepData = SETUP_STEPS[currentStep];
  
  return (
    <WizardLayout
      title={currentStepData.title}
      description={currentStepData.description}
      onNext={handleNext}
    >
      {renderStep()}
    </WizardLayout>
  );
}
