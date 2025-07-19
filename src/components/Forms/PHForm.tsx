import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
} from 'react-hook-form';

type TFormConfig = {
  resolver?: any;
  defaultValues?: Record<string, any>;
  schema?: any;
  className?: string;
};

type TFormProps = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
} & TFormConfig;

const PHForm = ({
  children,
  onSubmit,
  resolver,
  defaultValues,
  schema: _schema,
  className,
}: TFormProps) => {
  const formConfig: TFormConfig = {};

  if (resolver) {
    formConfig['resolver'] = resolver;
  }

  if (defaultValues) {
    formConfig['defaultValues'] = defaultValues;
  }

  const methods = useForm(formConfig);
  const { handleSubmit } = methods;

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    // reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
};

export default PHForm;
