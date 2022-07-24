import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '../../../utils/trpc';
import { CreateGigSchema } from '../../../constants/schemas/gig';
import { z } from 'zod';

const baseInputStyles =
  'block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-300 dark:placeholder-gray-300 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2';

const baseLabelStyles = 'text-xs font-semibold text-gray-600 dark:text-gray-400';

type FormData = z.infer<typeof CreateGigSchema>;

export const CreateGigForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateGigSchema),
  });

  const { mutateAsync: createGigMutation } = trpc.useMutation(['gig.create-gig']);

  const onSubmit = async (data: FormData) => await createGigMutation(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col m-4">
      <label className={baseLabelStyles} htmlFor="title">
        Title
      </label>
      <input {...register('title', { required: true })} placeholder="Amazon" className={baseInputStyles} />
      {errors.title && (
        <p className="text-red-500" id="title">
          This is required.
        </p>
      )}
      <label className={baseLabelStyles} htmlFor="description">
        Description
      </label>
      <input {...register('description')} placeholder="Consulting" className={baseInputStyles} id="description" />

      <label className={baseLabelStyles} htmlFor="startDate">
        Start Date
      </label>
      <input
        {...register('startDate', { valueAsDate: true })}
        placeholder="03/02/1990"
        className={baseInputStyles}
        id="startDate"
      />

      <button className="mt-2 text-gray-400 border border-gray-400 rounded-lg w-full text-sm h-8" type="submit">
        Submit
      </button>
    </form>
  );
};

export default CreateGigForm;
