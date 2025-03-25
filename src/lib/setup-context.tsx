"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SetupState, SetupContext as SetupContextType } from './types';

const initialState: SetupState = {
  currentStep: 0,
  completedSteps: [],
  documents: [],
};

const SetupContext = createContext<SetupContextType>({
  state: initialState,
  updateState: () => {},
  reset: () => {},
});

export function useSetup() {
  return useContext(SetupContext);
}

export function SetupProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SetupState>(() => {
    // Try to load state from localStorage on client side
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('setupState');
      return savedState ? JSON.parse(savedState) : initialState;
    }
    return initialState;
  });

  // Save state to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('setupState', JSON.stringify(state));
    }
  }, [state]);

  const updateState = (newState: Partial<SetupState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  const reset = () => {
    setState(initialState);
  };

  return (
    <SetupContext.Provider value={{ state, updateState, reset }}>
      {children}
    </SetupContext.Provider>
  );
} 