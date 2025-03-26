declare module "react-hook-form" {
  import React from "react";

  export type FieldValues = Record<string, unknown>;
  export type FieldPath<TFieldValues> = string;
  
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

  export const Controller: <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
  >(props: ControllerProps<TFieldValues, TName>) => React.ReactElement;

  export const FormProvider: React.FC<unknown>;
  export const useForm: () => unknown;
  export const useFormContext: () => unknown;
  export const useFormState: (props: { name: string }) => unknown;
  export const useController: (props: unknown) => { field: unknown; fieldState: unknown };
}
