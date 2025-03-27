import React, { createContext, useContext, useState, useEffect } from 'react';
import { VersionConfig, getDefaultVersion, VERSIONS } from './version-config';

interface VersionContextType {
  currentVersion: VersionConfig;
  setVersion: (versionId: string) => void;
  versions: VersionConfig[];
}

const VersionContext = createContext<VersionContextType | undefined>(undefined);

export function VersionProvider({ children }: { children: React.ReactNode }) {
  const [currentVersion, setCurrentVersion] = useState<VersionConfig>(getDefaultVersion());

  useEffect(() => {
    // Load saved version preference from localStorage
    const savedVersionId = localStorage.getItem('cps230-version');
    if (savedVersionId) {
      const savedVersion = VERSIONS.find(v => v.id === savedVersionId);
      if (savedVersion) {
        setCurrentVersion(savedVersion);
      }
    }
  }, []);

  const setVersion = (versionId: string) => {
    const version = VERSIONS.find(v => v.id === versionId);
    if (version) {
      setCurrentVersion(version);
      localStorage.setItem('cps230-version', versionId);
    }
  };

  return (
    <VersionContext.Provider value={{ currentVersion, setVersion, versions: VERSIONS }}>
      {children}
    </VersionContext.Provider>
  );
}

export const useVersion = () => {
  const context = useContext(VersionContext);
  if (context === undefined) {
    throw new Error('useVersion must be used within a VersionProvider');
  }
  return context;
}; 