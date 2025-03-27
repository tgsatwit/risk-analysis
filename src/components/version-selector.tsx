import React from 'react';
import { useVersion } from '@/lib/version-context';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function VersionSelector() {
  const { currentVersion, setVersion, versions } = useVersion();

  return (
    <div className="flex items-center gap-2">
      <Select value={currentVersion.id} onValueChange={setVersion}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select Version" />
        </SelectTrigger>
        <SelectContent>
          {versions.map((version) => (
            <SelectItem key={version.id} value={version.id}>
              <div className="flex items-center gap-2">
                {version.name}
                {version.isDefault && <Badge variant="outline" className="ml-2 text-xs">Default</Badge>}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-help">
              <Info className="h-4 w-4 text-muted-foreground" />
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-md p-2">
            <p className="text-sm">{currentVersion.description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
} 