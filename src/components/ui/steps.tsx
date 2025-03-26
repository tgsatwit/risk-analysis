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
                  ? "flex-row items-center w-full py-3" 
                  : "flex-col items-center"
              )}>
                {!isFirst(index) && isVertical && (
                  <div 
                    className={cn(
                      "absolute top-0 bottom-1/2 left-3 w-0.5 -translate-x-1/2",
                      completedSteps.includes(index-1) ? "bg-primary/40" : "bg-slate-200"
                    )}
                  />
                )}
                <button
                  onClick={() => onStepClick?.(index)}
                  disabled={!onStepClick}
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full border text-xs font-medium transition-colors flex-shrink-0 z-10",
                    isActive 
                      ? "border-primary bg-primary text-primary-foreground" 
                      : isCompleted 
                        ? "border-primary/80 bg-primary/80 text-primary-foreground"
                        : "border-slate-200 bg-white text-slate-500",
                    onStepClick && "hover:bg-slate-100 hover:border-slate-300 cursor-pointer"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-3 w-3" />
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
                    isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </p>
                  {step.description && (
                    <p className={cn(
                      isVertical ? "block" : "hidden sm:block",
                      "text-xs text-muted-foreground mt-0.5 min-h-[2.5rem]"
                    )}>
                      {step.description}
                    </p>
                  )}
                  {!step.description && (
                    <p className={cn(
                      isVertical ? "block" : "hidden sm:block",
                      "text-xs text-muted-foreground mt-0.5 min-h-[2.5rem]"
                    )}>
                      &nbsp;
                    </p>
                  )}
                </div>
                {!isLast && isVertical && (
                  <div 
                    className={cn(
                      "absolute top-1/2 bottom-0 left-3 w-0.5 -translate-x-1/2",
                      isCompleted ? "bg-primary/40" : "bg-slate-200"
                    )}
                  />
                )}
              </div>
              {!isLast && !isVertical && (
                <div 
                  className={cn(
                    "flex-1 h-px mx-2",
                    isCompleted ? "bg-primary/40" : "bg-slate-200"
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