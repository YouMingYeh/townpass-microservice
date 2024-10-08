import type { ReactNode } from 'react';
import { cn } from 'ui';
import { ErrorMessage } from '@hookform/error-message';
import type { FieldValues, Path } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel } from 'ui/src/components/ui/form';

export type FormFieldsetProps<T> = {
  path: Path<T>;
  label?: string;
  hint?: string;
  children?: ReactNode;
};

export function FormFieldset<T extends FieldValues>({
  path,
  label,
  hint,
  children,
}: FormFieldsetProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormField
      control={control}
      name={path}
      render={() => (
        <FormItem className='flex flex-col gap-1'>
          <FormLabel className='text-md' htmlFor={path}>
            {label}
          </FormLabel>
          {children}
          <p className='text-muted-foreground text-sm'>{hint}</p>

          <ErrorMessage
            errors={errors}
            name={path}
            render={({ message }: { message: string }) => (
              <p
                className={cn([
                  'text-sm',
                  'leading-tight',
                  'text-red-500',
                  'dark:text-red-400',
                  'font-medium',
                ])}
              >
                {message}
              </p>
            )}
          />
        </FormItem>
      )}
    />
  );
}
