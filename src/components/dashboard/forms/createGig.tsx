import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

const schema = z.object({
  title: z.string(),
  description: z.string().optional(),
  startDate: z.date().optional(),
});

const baseInputStyles =
  'block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-300 dark:placeholder-gray-300 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2';

const baseLabelStyles = 'text-xs font-semibold text-gray-600 dark:text-gray-400';

export const CreateGigForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
      className="flex flex-col m-4"
    >
      <label className={baseLabelStyles} htmlFor="title">
        Title
      </label>
      <input {...register('title', { required: true })} placeholder="Amazon" className={baseInputStyles} />

      <label className={baseLabelStyles} htmlFor="description">
        Description
      </label>
      <input {...register('description')} placeholder="Consulting" className={baseInputStyles} />

      <label className={baseLabelStyles} htmlFor="startDate">
        Start Date
      </label>
      <input {...register('startDate')} placeholder="03/02/1990" className={baseInputStyles} />

      <button className="mt-2 text-gray-400 border border-gray-400 rounded-lg w-full text-sm h-8" type="submit">
        Submit
      </button>
    </form>
  );
};

export default CreateGigForm;
