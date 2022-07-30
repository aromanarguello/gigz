import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '../../../utils/trpc';
import { CreateGigSchema } from '../../../constants/schemas/gig';
import { z } from 'zod';
import BaseInput from '../../inputs/baseInput';
import BaseButton from '../../buttons/base';

type FormData = z.infer<typeof CreateGigSchema>;

export const CreateGigForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(CreateGigSchema),
  });

  const { mutateAsync: createGigMutation } = trpc.useMutation(['gig.create-gig']);

  const onSubmit = (data: FormData) => {
    createGigMutation(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col m-4">
      <BaseInput
        register={register}
        labelTitle="Title"
        placeHolder="Amazon gig"
        isRequired
        inputName="title"
        hasError={errors.title !== undefined}
      />
      <BaseInput
        register={register}
        labelTitle="Description"
        placeHolder="Amazon"
        inputName="description"
        hasError={errors.description !== undefined}
      />
      <BaseInput
        register={register}
        labelTitle="Start Date"
        placeHolder="03/02/1990"
        inputName="startDate"
        hasError={errors.startDate !== undefined}
        valueAsDate
      />
      <BaseButton type="submit" text="Create Gig" />
    </form>
  );
};

export default CreateGigForm;
