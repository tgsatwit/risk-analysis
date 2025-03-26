"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionProps {
  items: {
    id: string | number;
    title: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
  }[];
  defaultOpen?: string | number | string[] | number[] | 'all';
  className?: string;
}

export function Accordion({ items, defaultOpen = 'all', className }: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<(string | number)[]>(() => {
    if (defaultOpen === 'all') {
      return items.map(item => item.id);
    } else if (Array.isArray(defaultOpen)) {
      return defaultOpen;
    } else if (defaultOpen) {
      return [defaultOpen];
    }
    return [];
  });

  const toggleItem = (id: string | number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        
        return (
          <div key={item.id} className="border border-slate-200 rounded-md overflow-hidden bg-white">
            <button
              onClick={() => toggleItem(item.id)}
              className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {item.icon && <div className="text-primary">{item.icon}</div>}
                <span className="font-medium">{item.title}</span>
              </div>
              <ChevronDown 
                className={cn(
                  "h-4 w-4 text-slate-500 transition-transform",
                  isOpen && "transform rotate-180"
                )} 
              />
            </button>
            <div 
              className={cn(
                "transition-all duration-200 overflow-hidden",
                isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="px-4 py-3 border-t border-slate-100">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
} 