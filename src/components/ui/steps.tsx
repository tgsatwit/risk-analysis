"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import * as React from "react";

export type StepItem = {
  title: string;
  description?: string;
  id: string | number;
};

interface StepsProps {
  steps: StepItem[];
  activeStep: number;
  onStepClick?: (step: number) => void;
  completedSteps?: number[];
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function Steps({
  steps,
  activeStep,
  onStepClick,
  completedSteps = [],
  className,
  orientation = "horizontal",
}: StepsProps) {
  const isVertical = orientation === "vertical";

  return (
    <div className={cn("w-full", className)}>
      <div className={cn(
        "flex w-full",
        isVertical 
          ? "flex-col items-start" 
          : "items-center justify-between"
      )}>
        {steps.map((step, index) => {
          const isActive = activeStep === index;
          const isCompleted = completedSteps.includes(index);
          const isLast = index === steps.length - 1;
          
          return (
            <React.Fragment key={step.id}>
              <div className={cn(
                "flex relative",
                isVertical 
                  ? "flex-row items-center w-full py-1.5" 
                  : "flex-col items-center"
              )}>
                {!isFirst(index) && isVertical && (
                  <div 
                    className={cn(
                      "absolute top-0 bottom-1/2 left-3.5 w-1.5 -translate-x-1/2",
                      completedSteps.includes(index-1) ? "bg-primary" : "bg-border"
                    )}
                  />
                )}
                <button
                  onClick={() => onStepClick?.(index)}
                  disabled={!onStepClick}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full border text-sm font-medium transition-colors flex-shrink-0 z-10",
                    isActive 
                      ? "border-primary bg-primary text-primary-foreground" 
                      : isCompleted 
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted bg-background text-muted-foreground",
                    onStepClick && "hover:bg-slate-600 hover:border-slate-600 hover:text-white cursor-pointer"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>
                <div className={cn(
                  isVertical ? "ml-3" : "mt-2",
                  isVertical ? "text-left" : "text-center"
                )}>
                  <p className={cn(
                    "text-sm font-medium",
                    isActive || isCompleted ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </p>
                  {step.description && (
                    <p className={cn(
                      isVertical ? "block" : "hidden sm:block",
                      "text-xs text-muted-foreground"
                    )}>
                      {step.description}
                    </p>
                  )}
                </div>
                {!isLast && isVertical && (
                  <div 
                    className={cn(
                      "absolute top-1/2 bottom-0 left-3.5 w-1.5 -translate-x-1/2",
                      isCompleted ? "bg-primary" : "bg-border"
                    )}
                  />
                )}
              </div>
              {!isLast && !isVertical && (
                <div 
                  className={cn(
                    "flex-1 h-1 mx-2",
                    isCompleted ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

function isFirst(index: number): boolean {
  return index === 0;
} 