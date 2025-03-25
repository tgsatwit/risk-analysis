"use client";

import React, { forwardRef, useState } from 'react';
import { useSetup } from '@/lib/setup-context';
import { v4 as uuidv4 } from 'uuid';
import { COUNTRY_OPTIONS, INDUSTRY_OPTIONS } from '@/lib/constants';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface OrganizationStepProps {
  onStepComplete?: () => void;
}

export const OrganizationStep = forwardRef<HTMLFormElement, OrganizationStepProps>((props, ref) => {
  const { state, updateState } = useSetup();
  const { organization } = state;
  const { onStepComplete } = props;

  const [formData, setFormData] = useState({
    name: organization?.name || '',
    industry: organization?.industry || 'finance',
    size: organization?.size || 'medium',
    country: organization?.country || 'australia',
    contactEmail: organization?.contactEmail || '',
    contactPhone: organization?.contactPhone || '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || formData.name.length < 2) {
      toast.error('Organization name must be at least 2 characters');
      return;
    }

    // Update organization details
    updateState({
      organization: {
        id: organization?.id || uuidv4(),
        ...formData as any, // Type cast to avoid TS errors
      },
    });

    // Add this step to completed steps if it's not already there
    const currentStep = 1; // The organization step is step 1
    const newCompleted = [...(state.completedSteps || [])];
    if (!newCompleted.includes(currentStep)) {
      newCompleted.push(currentStep);
    }
    
    // Update completed steps
    updateState({
      completedSteps: newCompleted
    });

    toast.success('Organization details saved successfully');
    
    // Call the onStepComplete callback to move to the next step
    if (onStepComplete) {
      onStepComplete();
    }
  };

  return (
    <form ref={ref} onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Organization Name</Label>
        <Input 
          id="name"
          value={formData.name} 
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Australian Super Company" 
        />
        <p className="text-sm text-muted-foreground">
          The name of the organization where the Copilot agent will be deployed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Select 
            value={formData.industry}
            onValueChange={(value) => handleChange('industry', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRY_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            The industry sector of your organization.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="size">Organization Size</Label>
          <Select 
            value={formData.size}
            onValueChange={(value) => handleChange('size', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small (1-100 employees)</SelectItem>
              <SelectItem value="medium">Medium (101-1000 employees)</SelectItem>
              <SelectItem value="large">Large (1000+ employees)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            The approximate size of your organization.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Select 
          value={formData.country}
          onValueChange={(value) => handleChange('country', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {COUNTRY_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          The primary country where your organization operates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="contactEmail">Contact Email (Optional)</Label>
          <Input 
            id="contactEmail"
            type="email"
            value={formData.contactEmail} 
            onChange={(e) => handleChange('contactEmail', e.target.value)}
            placeholder="contact@example.com" 
          />
          <p className="text-sm text-muted-foreground">
            Email address for contact purposes.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPhone">Contact Phone (Optional)</Label>
          <Input 
            id="contactPhone"
            value={formData.contactPhone} 
            onChange={(e) => handleChange('contactPhone', e.target.value)}
            placeholder="+61 2 1234 5678" 
          />
          <p className="text-sm text-muted-foreground">
            Phone number for contact purposes.
          </p>
        </div>
      </div>

      <div className="hidden">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
});

// Add display name for the component
OrganizationStep.displayName = "OrganizationStep"; 