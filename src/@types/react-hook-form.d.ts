declare module "react-hook-form" {
  import React from "react";

  export type FieldValues = Record<string, unknown>;
  export type FieldPath<_TFieldValues> = string;
  
  export type ControllerProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
  > = {
    name: TName;
    control?: unknown;
    defaultValue?: unknown;
    rules?: unknown;
    render: ({ field, fieldState }: { field: unknown; fieldState: unknown }) => React.ReactElement;
  };

  export type FormState<TFieldValues> = {
    isDirty: boolean;
    isSubmitting: boolean;
    isSubmitted: boolean;
    isSubmitSuccessful: boolean;
    isValid: boolean;
    isValidating: boolean;
    submitCount: number;
    dirtyFields: Record<string, boolean>;
    touchedFields: Record<string, boolean>;
    errors: Record<string, { type: string; message: string }>;
  };

  export type UseFormReturn = {
    getFieldState: (name: string, formState?: FormState<any>) => { error?: { type: string; message: string }; isDirty: boolean; isTouched: boolean };
    formState: FormState<any>;
    control: unknown;
  };

  export const Controller: <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
  >(props: ControllerProps<TFieldValues, TName>) => React.ReactElement;

  export const FormProvider: React.FC<unknown>;
  export const useForm: () => UseFormReturn;
  export const useFormContext: () => UseFormReturn;
  export const useFormState: (props: { name: string }) => FormState<any>;
  export const useController: (props: unknown) => { field: unknown; fieldState: unknown };
}
