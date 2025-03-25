"use client";

import React, { useState } from 'react';
import { useSetup } from '@/lib/setup-context';
import { SETUP_STEPS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Steps } from '@/components/ui/steps';
import { MainLayout } from '@/components/layout/main-layout';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface WizardLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  onNext?: () => boolean | Promise<boolean>;
  onBack?: () => void;
  nextDisabled?: boolean;
  showNav?: boolean;
}

export function WizardLayout({
  children,
  title,
  description,
  onNext,
  onBack,
  nextDisabled = false,
  showNav = true,
}: WizardLayoutProps) {
  const { state, updateState } = useSetup();
  const { currentStep, completedSteps } = state;

  const handleNext = async () => {
    if (onNext) {
      const canProceed = await onNext();
      if (!canProceed) return;
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

  return (
    <MainLayout>
      <div className="w-full py-6">
        <div className="flex">
          {showNav && (
            <div className="w-64 pr-4 pt-2 border-r min-h-[calc(100vh-10rem)]">
              <Steps
                steps={SETUP_STEPS}
                activeStep={currentStep}
                completedSteps={completedSteps}
                onStepClick={handleStepClick}
                orientation="vertical"
                className="pl-4"
              />
            </div>
          )}

          <div className="flex-1 px-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">{title}</h2>
              {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
            </div>
            
            <div className="max-w-full mb-6">
              {children}
            </div>
            
            <div className="flex justify-between py-4 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={nextDisabled || currentStep === SETUP_STEPS.length - 1}
                className="flex items-center gap-2"
              >
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 