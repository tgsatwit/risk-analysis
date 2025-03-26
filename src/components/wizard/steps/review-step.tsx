"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";

import { Accordion } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// @ts-expect-error - useToast doesn't properly expose type
import { useToast } from "@/components/ui/use-toast";

import { useSetup } from "@/lib/setup-context";
import { DOCUMENT_TYPES } from "@/lib/constants";

export default function ReviewStep() {
  const { state, updateState } = useSetup();
  const { toast } = useToast();
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentComplete, setDeploymentComplete] = useState(false);

  function goBack() {
    updateState({ currentStep: state.currentStep - 1 });
  }

  function handleDeploy() {
    setIsDeploying(true);
    
    // Simulate deployment process
    setTimeout(() => {
      setIsDeploying(false);
      setDeploymentComplete(true);
      
      toast({
        title: "Deployment successful",
        description: "Your CPS 230 Risk Assessment Copilot is now ready to use.",
      });
      
      updateState({
        completedSteps: [...state.completedSteps, state.currentStep],
      });
    }, 3000);
  }

  function getDocumentTypeName(type: string) {
    const docType = DOCUMENT_TYPES.find(t => t.value === type);
    return docType ? docType.label : type;
  }

  const accordionItems = [
    {
      id: 'organization',
      title: 'Organization Details',
      content: (
        <>
          {state.organization ? (
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Organization Name</p>
                    <p className="text-sm text-gray-500">{state.organization.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Industry</p>
                    <p className="text-sm text-gray-500">{state.organization.industry}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Size</p>
                    <p className="text-sm text-gray-500">{state.organization.size}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Country</p>
                    <p className="text-sm text-gray-500">{state.organization.country}</p>
                  </div>
                  {state.organization.contactEmail && (
                    <div>
                      <p className="text-sm font-medium">Contact Email</p>
                      <p className="text-sm text-gray-500">{state.organization.contactEmail}</p>
                    </div>
                  )}
                  {state.organization.contactPhone && (
                    <div>
                      <p className="text-sm font-medium">Contact Phone</p>
                      <p className="text-sm text-gray-500">{state.organization.contactPhone}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Alert className="bg-red-50 border-red-100">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="ml-2 text-red-600">
                <p className="font-medium">Missing Information</p>
                <p>Please complete the Organization Details step.</p>
              </AlertDescription>
            </Alert>
          )}
        </>
      )
    },
    {
      id: 'microsoft',
      title: 'Microsoft Copilot Studio',
      content: (
        <>
          {state.msftCredentials ? (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Tenant ID</p>
                    <p className="text-sm text-gray-500">{state.msftCredentials.tenantId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Authentication Method</p>
                    <p className="text-sm text-gray-500">{state.msftCredentials.authMethod}</p>
                  </div>
                  {state.msftCredentials.clientId && (
                    <div>
                      <p className="text-sm font-medium">Client ID</p>
                      <p className="text-sm text-gray-500">{state.msftCredentials.clientId}</p>
                    </div>
                  )}
                  {state.msftCredentials.clientSecret && (
                    <div>
                      <p className="text-sm font-medium">Client Secret</p>
                      <p className="text-sm text-gray-500">••••••••••••••••</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Alert className="bg-red-50 border-red-100">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="ml-2 text-red-600">
                <p className="font-medium">Missing Information</p>
                <p>Please complete the Microsoft Copilot Studio step.</p>
              </AlertDescription>
            </Alert>
          )}
        </>
      )
    },
    {
      id: 'sharepoint',
      title: 'SharePoint Configuration',
      content: (
        <>
          {state.sharePointConfig ? (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">SharePoint Site URL</p>
                    <p className="text-sm text-gray-500">{state.sharePointConfig.siteUrl}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Process Documents Library</p>
                    <p className="text-sm text-gray-500">{state.sharePointConfig.processDocsLibrary}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Reference Documents Library</p>
                    <p className="text-sm text-gray-500">{state.sharePointConfig.referenceDocsLibrary}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Alert className="bg-red-50 border-red-100">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="ml-2 text-red-600">
                <p className="font-medium">Missing Information</p>
                <p>Please complete the SharePoint Configuration step.</p>
              </AlertDescription>
            </Alert>
          )}
        </>
      )
    },
    {
      id: 'documents',
      title: 'Documents',
      content: (
        <>
          {state.documents.length > 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium">{state.documents.length} documents configured</p>
                  <ul className="space-y-2">
                    {state.documents.map((doc) => (
                      <li key={doc.id} className="text-sm">
                        <span className="font-medium">{doc.title}</span> - {getDocumentTypeName(doc.type)}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Alert className="bg-red-50 border-red-100">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="ml-2 text-red-600">
                <p className="font-medium">Missing Information</p>
                <p>Please add at least one document in the Documents step.</p>
              </AlertDescription>
            </Alert>
          )}
        </>
      )
    },
    {
      id: 'agent',
      title: 'Copilot Agent',
      content: (
        <>
          {state.agentConfig ? (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Agent Name</p>
                    <p className="text-sm text-gray-500">{state.agentConfig.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Description</p>
                    <p className="text-sm text-gray-500">{state.agentConfig.description}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Welcome Message</p>
                    <p className="text-sm text-gray-500">{state.agentConfig.welcomeMessage}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <p className="text-sm text-gray-500">{state.agentConfig.isActive ? "Active" : "Inactive"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Alert className="bg-red-50 border-red-100">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="ml-2 text-red-600">
                <p className="font-medium">Missing Information</p>
                <p>Please complete the Copilot Agent Configuration step.</p>
              </AlertDescription>
            </Alert>
          )}
        </>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Review & Deploy</h2>
        <p className="text-gray-500">
          Review your configuration and deploy your CPS 230 Risk Assessment Copilot.
        </p>
      </div>

      <Accordion items={accordionItems} defaultOpen="organization" />

      <div className="flex justify-between">
        <Button onClick={goBack} variant="outline">
          Back
        </Button>
        <Button 
          onClick={handleDeploy} 
          disabled={isDeploying || deploymentComplete}
        >
          {isDeploying ? "Deploying..." : deploymentComplete ? "Deployed" : "Deploy"}
        </Button>
      </div>
    </div>
  );
} 