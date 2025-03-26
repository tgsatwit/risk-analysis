declare module "react-hook-form" {
  import React from "react";

  export type FieldValues = Record<string, any>;
  export type FieldPath<TFieldValues extends FieldValues> = string;
  
  export type ControllerProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
  > = {
    name: TName;
    control?: any;
    defaultValue?: any;
    rules?: any;
    render: ({ field, fieldState }: { field: any; fieldState: any }) => React.ReactElement;
  };

  export const Controller: <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
  >(props: ControllerProps<TFieldValues, TName>) => React.ReactElement;

  export const FormProvider: React.FC<any>;
  export const useForm: () => any;
  export const useFormContext: () => any;
  export const useFormState: (props: { name: string }) => any;
  export const useController: (props: any) => { field: any; fieldState: any };
}
