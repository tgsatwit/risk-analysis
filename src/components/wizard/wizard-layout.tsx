"use client";

import React, { useState } from 'react';
import { useSetup } from '@/lib/setup-context';
import { SETUP_STEPS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Steps, StepItem } from '@/components/ui/steps';
import { MainLayout } from '@/components/layout/main-layout';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SetupState } from '@/lib/types';

interface WizardLayoutProps {
  children: React.ReactNode | ((props: { state: SetupState }) => React.ReactNode);
  title: string;
  description?: string;
  onNext?: () => boolean | Promise<boolean>;
  onBack?: () => void;
  nextDisabled?: boolean;
  showNav?: boolean;
  steps?: StepItem[];
  customStepLabels?: boolean;
}

export function WizardLayout({
  children,
  title,
  description,
  onNext,
  onBack,
  nextDisabled = false,
  showNav = true,
  steps,
  customStepLabels = false,
}: WizardLayoutProps) {
  const { state, updateState } = useSetup();
  const { currentStep, completedSteps } = state;
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNext = async () => {
    if (onNext) {
      setIsProcessing(true);
      try {
        const canProceed = await onNext();
        if (!canProceed) {
          setIsProcessing(false);
          return;
        }
      } catch (error) {
        console.error('Error in next step handler:', error);
        setIsProcessing(false);
        return;
      }
      setIsProcessing(false);
    }

    const newCompleted = [...completedSteps];
    if (!newCompleted.includes(currentStep)) {
      newCompleted.push(currentStep);
    }

    updateState({
      currentStep: currentStep + 1,
      completedSteps: newCompleted,
    });
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
    
    if (currentStep > 0) {
      updateState({ currentStep: currentStep - 1 });
    }
  };

  const handleStepClick = (step: number) => {
    // Only allow clicking on completed steps or the current step + 1
    if (completedSteps.includes(step) || step === currentStep || step === currentStep + 1) {
      updateState({ currentStep: step });
    }
  };

  // Use provided steps or fall back to SETUP_STEPS from constants
  const displaySteps = steps || SETUP_STEPS;

  // Render children based on type (function or React node)
  const renderChildren = () => {
    if (typeof children === 'function') {
      return children({ state });
    }
    return children;
  };

  return (
    <MainLayout>
      <div className="w-full py-4">
        <div className="flex justify-between items-center mb-4 px-6">
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0 || isProcessing}
              className="flex items-center gap-2"
              size="sm"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={nextDisabled || currentStep === displaySteps.length - 1 || isProcessing}
              className="flex items-center gap-2"
              variant="default"
              size="sm"
            >
              {isProcessing ? 'Processing...' : 'Next'} {!isProcessing && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <div className="flex">
          {showNav && (
            <div className="w-72 border-r min-h-[calc(100vh-12rem)]">
              <Steps
                steps={displaySteps}
                activeStep={currentStep}
                completedSteps={completedSteps}
                onStepClick={handleStepClick}
                orientation="vertical"
                className="px-2 py-4"
              />
            </div>
          )}

          <div className="flex-1 px-8 py-4 overflow-y-auto min-h-[calc(100vh-12rem)]">
            <div className="max-w-full">
              {renderChildren()}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 