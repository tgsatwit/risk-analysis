# Risk Copilot Setup Wizard Implementation Guide

## Visual Design Updates

We've updated the wizard with a cleaner, more consistent UI featuring:

1. Full-width responsive layout
2. Simplified visual hierarchy with fewer boxes and borders
3. Consistent horizontal alignment of steps
4. Collapsible sections using accordions 
5. Improved margins and padding for better readability

## Accordion Implementation Pattern

Each wizard step should follow this pattern for implementing collapsible sections:

```tsx
import { Accordion } from '@/components/ui/accordion';
import { Icon1, Icon2, Icon3 } from 'lucide-react'; // Use appropriate icons

export function YourWizardStep() {
  // Define your accordion items
  const accordionItems = [
    {
      id: 'section-1',
      title: '1. First Section Title',
      icon: <Icon1 className="h-5 w-5 text-primary" />,
      content: (
        <div className="space-y-3">
          <p className="text-sm">Your section description here.</p>
          {/* Your section content here */}
        </div>
      ),
    },
    {
      id: 'section-2',
      title: '2. Second Section Title',
      icon: <Icon2 className="h-5 w-5 text-primary" />,
      content: (
        <div className="space-y-3">
          {/* Your section content here */}
        </div>
      ),
    },
    // Add more sections as needed
  ];

  return (
    <WizardLayout 
      title="Your Step Title" 
      description="Your step description here."
    >
      <div className="space-y-6">
        {/* Optional: Add an alert for important information */}
        <Alert className="bg-blue-50 border-blue-100">
          <AlertDescription className="text-sm text-blue-700">
            Important information about this step.
          </AlertDescription>
        </Alert>

        {/* Include the accordion with your items */}
        <Accordion items={accordionItems} defaultOpen="section-1" />
      </div>
    </WizardLayout>
  );
}
```

## Styling Guidelines

- Use subtle background colors (`bg-slate-50`, `bg-blue-50`) instead of bold colors
- Keep text sizes consistent (`text-sm` for most content, `text-xs` for secondary information)
- Use icons consistently to represent different types of content
- Limit the number of nested borders and containers
- Ensure all content is fully responsive and readable on all screen sizes

## Implementation Steps

1. Start with the existing `SharePointStep` component as a template
2. Convert each wizard step to use the accordion pattern
3. Organize content into logical sections (3-5 sections per step is ideal)
4. Use consistent numbering and styling across all steps
5. Ensure all steps have comprehensive information without external links

## Accessibility Considerations

- All accordions should be keyboard navigable
- Ensure proper color contrast for all text
- Include appropriate ARIA attributes for screen readers
- Test navigation with keyboard-only users in mind

This implementation provides a consistent user experience while making the wizard more manageable by hiding detailed content until needed. 