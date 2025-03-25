# UI Standards for Risk Copilot Setup Wizard

## General Layout

All wizard steps should follow these general layout guidelines:

1. Full-width responsive design
2. Simplified visual hierarchy with minimal nested containers
3. Consistent margins and spacing
4. Standard color palette and text styling
5. Mobile-first approach to ensure proper display on all devices

## Step Types

There are two main types of step layouts:

### 1. Introduction Steps (Welcome)

Used for the welcome/introduction screen:

```tsx
<div className="space-y-6">
  <Alert className="bg-blue-50 border-blue-100">
    <AlertDescription className="text-blue-700">
      <p className="font-medium mb-1">Main Heading</p>
      <p className="text-sm">Primary description text.</p>
      <p className="text-sm mt-2">Secondary description text.</p>
    </AlertDescription>
  </Alert>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Feature cards */}
    <div className="border rounded-md p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-5 w-5 text-accent" />
        <h3 className="font-medium">Feature Title</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Feature description text.
      </p>
    </div>
    {/* More feature cards */}
  </div>

  {/* Additional content sections */}
  <div className="border rounded-md p-5">
    <h3 className="font-medium mb-4">Section Title</h3>
    {/* Section content */}
  </div>
</div>
```

### 2. Content Steps with Accordions (All Other Steps)

For steps with detailed instructional content, use the accordion pattern:

```tsx
<div className="space-y-6">
  <Alert className="bg-blue-50 border-blue-100">
    <AlertDescription className="text-sm text-blue-700">
      Important information about this step.
    </AlertDescription>
  </Alert>

  <Accordion items={accordionItems} defaultOpen="first-item-id" />
</div>
```

Where `accordionItems` follows this structure:

```tsx
const accordionItems = [
  {
    id: 'unique-id',
    title: '1. Section Title',
    icon: <Icon className="h-5 w-5 text-primary" />,
    content: (
      <div className="space-y-3">
        <p className="text-sm">Section description.</p>
        {/* Section content */}
      </div>
    ),
  },
  // More accordion items
];
```

## Styling Guidelines

### Text Styles

- Headings: `font-medium` for section headings
- Body text: `text-sm` for main content, `text-xs` for supporting text
- Text colors: `text-muted-foreground` for secondary text

### Alert Component

Alerts should use consistent colors:

```tsx
<Alert className="bg-blue-50 border-blue-100">
  <AlertDescription className="text-sm text-blue-700">
    Alert content
  </AlertDescription>
</Alert>
```

### Borders & Containers

- Use `border rounded-md` for container borders
- Use `p-4` or `p-5` for container padding
- Use `space-y-4` or `space-y-6` for vertical spacing

### Icons

- Use icons from `lucide-react` library
- Standard size: `h-5 w-5` 
- Use semantic colors: `text-primary`, `text-violet-500`, etc.

## Color Palette

- Primary blue: `text-blue-700`, `bg-blue-50`, `border-blue-100`
- Feature icons: Purple (`text-violet-500`), Green (`text-green-500`), Orange (`text-orange-500`), Red (`text-red-500`)
- Borders: Default border color (`border`)
- Background: Default background (`bg-background`) or subtle (`bg-gray-50`)

## Spacing

- Outer container: `space-y-6`
- Inner containers: `space-y-4` or `space-y-3`
- Grid gaps: `gap-4` or `gap-3`

## Responsive Behavior

- Use `grid-cols-1 md:grid-cols-2` for responsive grids
- Ensure text is readable on mobile (min font size `text-xs`)
- Test all layouts on mobile and desktop viewports

By following these standards, we ensure a consistent user experience throughout the Risk Copilot Setup Wizard. 