"use client";

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CPS230SetupWizard } from '@/components/wizard/cps230-setup';
import { ProcessWalkthroughWizard } from '@/components/wizard/process-walkthrough';
import { VersionProvider } from '@/lib/version-context';
import { VersionSelector } from '@/components/version-selector';

export default function CPS230Page() {
  return (
    <VersionProvider>
      <div className="w-full mx-auto">
        <div className="max-w-screen-2xl mx-auto px-4 pt-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">CPS 230 Risk Assessment Tool</h1>
            <VersionSelector />
          </div>
          
          <Tabs defaultValue="setup" className="w-full">
            <TabsList className="w-full max-w-md border-b rounded-none p-0 h-auto bg-transparent space-x-8">
              <TabsTrigger 
                value="setup" 
                className="py-3 px-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none bg-transparent"
              >
                System Setup
              </TabsTrigger>
              <TabsTrigger 
                value="walkthrough" 
                className="py-3 px-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none bg-transparent"
              >
                Process Assessment
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="setup" className="mt-0 pt-2">
              <CPS230SetupWizard />
            </TabsContent>
            
            <TabsContent value="walkthrough" className="mt-0 pt-2">
              <ProcessWalkthroughWizard />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </VersionProvider>
  );
} 