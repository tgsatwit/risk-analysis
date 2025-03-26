declare module "@/components/ui/use-toast" {
  export interface Toast {
    id?: string;
    title?: string;
    description?: string;
    action?: React.ReactNode;
    duration?: number;
  }

  export interface ToastActionElement {
    altText: string;
    onClick: () => void;
    children: React.ReactNode;
  }

  export type ToastProps = Toast;

  export function useToast(): {
    toast: (props: ToastProps) => void;
    dismiss: (toastId?: string) => void;
    toasts: Toast[];
  };
} 