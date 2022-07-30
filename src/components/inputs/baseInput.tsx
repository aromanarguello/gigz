import { FieldPath, FieldValues, UseFormRegister } from 'react-hook-form';

export interface BaseInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  register: UseFormRegister<TFieldValues>;
  labelTitle: string;
  placeHolder: string;
  isRequired?: boolean;
  inputName: TName;
  hasError?: boolean;
  valueAsDate?: boolean;
}

const baseInputStyles =
  'block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-300 dark:placeholder-gray-300 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2';

const baseLabelStyles = 'text-xs font-semibold text-gray-600 dark:text-gray-400';

const BaseInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  register,
  labelTitle,
  placeHolder,
  isRequired,
  inputName,
  hasError,
  valueAsDate,
}: BaseInputProps<TFieldValues, TName>) => {
  return (
    <>
      <label className={baseLabelStyles} htmlFor={inputName}>
        {labelTitle}
      </label>
      <input
        {...register(inputName, { required: isRequired, valueAsDate })}
        id={inputName}
        placeholder={placeHolder}
        className={baseInputStyles}
      />
      {hasError && (
        <p className="text-red-500" id={inputName}>
          This is required.
        </p>
      )}
    </>
  );
};

export default BaseInput;
