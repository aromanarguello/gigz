import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { trpc } from '../../utils/trpc';
import BaseInput from '../inputs/baseInput';

const QuickTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
});

type FormData = z.infer<typeof QuickTaskSchema>;

export interface QuickTaskFormProps {
  gigId: string;
}

const QuickTaskForm = ({ gigId }: QuickTaskFormProps) => {
  const { mutateAsync: createTask } = trpc.useMutation(['task.create-task']);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(QuickTaskSchema),
  });

  const onSubmit = (data: FormData) => {
    const params = {
      gigId,
      ...data,
    };
    createTask(params);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseInput labelTitle="Name" placeHolder="Code home page" inputName="title" register={register} />
      <BaseInput labelTitle="Description" placeHolder="Code home page" inputName="description" register={register} />
      <button
        type="submit"
        className="w-32 self-center mt-8 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        CREATE
      </button>
    </form>
  );
};

export default QuickTaskForm;
