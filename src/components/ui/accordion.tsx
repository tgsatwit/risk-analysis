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
  defaultOpen?: string | number;
  className?: string;
}

export function Accordion({ items, defaultOpen, className }: AccordionProps) {
  const [openItem, setOpenItem] = React.useState<string | number | undefined>(defaultOpen);

  const toggleItem = (id: string | number) => {
    setOpenItem(openItem === id ? undefined : id);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item) => (
        <div key={item.id} className="border rounded-md overflow-hidden">
          <button
            onClick={() => toggleItem(item.id)}
            className="flex w-full items-center justify-between px-4 py-3 text-left bg-slate-50 hover:bg-slate-100"
          >
            <div className="flex items-center gap-3">
              {item.icon && <div>{item.icon}</div>}
              <span className="font-medium">{item.title}</span>
            </div>
            <ChevronDown 
              className={cn(
                "h-4 w-4 transition-transform",
                openItem === item.id && "transform rotate-180"
              )} 
            />
          </button>
          <div 
            className={cn(
              "px-4 py-3 bg-white transition-all overflow-hidden",
              openItem === item.id ? "max-h-[1000px]" : "max-h-0 p-0"
            )}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
} 