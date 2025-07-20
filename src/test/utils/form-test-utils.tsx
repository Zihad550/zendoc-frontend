import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { ReactElement } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

// Wrapper for testing form components
export const FormTestWrapper = ({
  children,
  defaultValues = {},
  onSubmit,
  formErrors,
}: {
  children: React.ReactNode;
  defaultValues?: Record<string, any>;
  onSubmit?: (data: any) => void;
  formErrors?: Record<string, any>;
}) => {
  const methods = useForm({ defaultValues });

  const handleSubmit = (data: any) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>{children}</form>
    </FormProvider>
  );
};

// Render component with form context
export const renderWithForm = (
  ui: ReactElement,
  {
    defaultValues = {},
    onSubmit,
    formErrors,
    ...renderOptions
  }: {
    defaultValues?: Record<string, any>;
    onSubmit?: (data: any) => void;
    formErrors?: Record<string, any>;
  } & Omit<RenderOptions, 'wrapper'> = {}
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <FormTestWrapper
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      formErrors={formErrors}
    >
      {children}
    </FormTestWrapper>
  );

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    user: userEvent.setup(),
  };
};
