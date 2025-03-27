"use client";

import React from 'react';
import { useSetup } from '@/lib/setup-context';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { 
  FileSpreadsheet, 
  Upload,
  CheckCircle2,
  AlertCircle,
  Database
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function ControlRegisterStep() {
  const { state, updateState } = useSetup();

  React.useEffect(() => {
    // Mark this step as viewed when component mounts
    if (!state.completedSteps.includes(2)) {
      updateState({
        completedSteps: [...state.completedSteps, 2]
      });
    }
  }, [state.completedSteps, updateState]);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Control Register Preparation</h2>
        <p className="text-muted-foreground">
          Upload and prepare the control register from Archer or other GRC systems for use in your risk assessments.
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="format">Format Requirements</TabsTrigger>
          <TabsTrigger value="example">Example Register</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Preparing Your Control Register</CardTitle>
              <CardDescription>
                The control register is a key input for the revised assessment approach
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-md font-medium">Why This Is Important</h3>
                <p className="text-sm text-muted-foreground">
                  In the refined approach, we map identified risks to your existing control register rather than creating theoretical controls. This creates a more accurate view of your control environment and helps identify genuine gaps.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-md font-medium">Steps to Prepare</h3>
                <ol className="list-decimal pl-6 space-y-2 text-sm">
                  <li>Export your control register from Archer, ServiceNow, MetricStream or other GRC tool</li>
                  <li>Save as an Excel file named <code>CPS230_Control_Register.xlsx</code></li>
                  <li>Upload to the global references folder in SharePoint (<code>/CPS230_Global/</code>)</li>
                  <li>Ensure access permissions are set for users and the Copilot agent</li>
                </ol>
              </div>

              <div className="flex items-center justify-center p-4 border rounded-md bg-slate-50 mt-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    <FileSpreadsheet className="h-8 w-8 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">CPS230_Control_Register.xlsx</h4>
                    <p className="text-sm text-muted-foreground">Upload to: <code>/CPS230_Global/</code></p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-4">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="format" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Control Register Format</CardTitle>
              <CardDescription>
                Required fields and format for your control register
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-md border">
                <h3 className="text-md font-medium flex items-center mb-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  Required Fields
                </h3>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li><strong>Control ID:</strong> Unique identifier for each control</li>
                  <li><strong>Control Name:</strong> Brief descriptive name</li>
                  <li><strong>Control Description:</strong> Detailed description of what the control does and how it works</li>
                  <li><strong>Control Type:</strong> Preventative, Detective, or Corrective</li>
                  <li><strong>Implementation Method:</strong> Manual, Automated, or Semi-automated</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-4 rounded-md border mt-4">
                <h3 className="text-md font-medium flex items-center mb-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2" />
                  Optional But Recommended Fields
                </h3>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li><strong>Control Owner:</strong> Person or role responsible for the control</li>
                  <li><strong>Risk Area:</strong> What type of risk this control addresses</li>
                  <li><strong>Last Assessment Date:</strong> When the control was last tested or assessed</li>
                  <li><strong>Control Status:</strong> Active, In Development, Retired, etc.</li>
                  <li><strong>Control Frequency:</strong> How often the control is performed (Daily, Weekly, Monthly, etc.)</li>
                </ul>
              </div>

              <div className="bg-red-50 p-4 rounded-md border mt-4">
                <h3 className="text-md font-medium flex items-center mb-2 text-red-700">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                  Common Issues to Avoid
                </h3>
                <ul className="list-disc pl-6 text-sm space-y-1 text-red-700">
                  <li>Missing control descriptions or vague descriptions</li>
                  <li>Inconsistent control type classifications</li>
                  <li>Too much unstructured text in a single field</li>
                  <li>Controls without unique identifiers</li>
                  <li>Mixing controls with other types of data in the same register</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="example" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Example Control Register</CardTitle>
              <CardDescription>
                Sample format for your control register with example entries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Control ID</TableHead>
                      <TableHead className="w-[200px]">Control Name</TableHead>
                      <TableHead className="w-[300px]">Control Description</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Implementation</TableHead>
                      <TableHead>Owner</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">CTL-001</TableCell>
                      <TableCell>Segregation of Duties</TableCell>
                      <TableCell>Different individuals are responsible for initiating, approving and recording transactions</TableCell>
                      <TableCell>Preventative</TableCell>
                      <TableCell>Manual</TableCell>
                      <TableCell>Operations</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">CTL-002</TableCell>
                      <TableCell>Approval Matrix</TableCell>
                      <TableCell>Documented approval matrix defining authority levels for financial transactions based on amount and type</TableCell>
                      <TableCell>Preventative</TableCell>
                      <TableCell>Manual</TableCell>
                      <TableCell>Finance</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">CTL-003</TableCell>
                      <TableCell>System Access Review</TableCell>
                      <TableCell>Quarterly review of user access rights to critical systems to ensure appropriate access levels</TableCell>
                      <TableCell>Detective</TableCell>
                      <TableCell>Semi-automated</TableCell>
                      <TableCell>IT Security</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">CTL-004</TableCell>
                      <TableCell>Automated Data Validation</TableCell>
                      <TableCell>System performs data validation checks on all customer inputs before processing</TableCell>
                      <TableCell>Preventative</TableCell>
                      <TableCell>Automated</TableCell>
                      <TableCell>IT</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">CTL-005</TableCell>
                      <TableCell>Exception Reporting</TableCell>
                      <TableCell>Daily exception reports identifying transactions outside of normal parameters for review</TableCell>
                      <TableCell>Detective</TableCell>
                      <TableCell>Automated</TableCell>
                      <TableCell>Compliance</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-center mt-6">
                <Button variant="outline" className="flex items-center">
                  <Database className="h-4 w-4 mr-2" />
                  Download Example Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 