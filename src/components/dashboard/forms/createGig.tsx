import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '../../../utils/trpc';
import { CreateGigSchema } from '../../../constants/schemas/gig';
import { z } from 'zod';
import BaseInput from '../../inputs/baseInput';
import BaseButton from '../../buttons/base';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useS3Upload } from 'next-s3-upload';

export const GigSchema = z.object({
  title: z.string(),
  description: z.string(),
  startDate: z.date(),
  // type: z.string(),
});

type FormData = z.infer<typeof GigSchema>;

export const CreateGigForm = () => {
  const [imageUrl, setImageUrl] = useState('');

  const { uploadToS3 } = useS3Upload();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(GigSchema),
  });

  const { mutateAsync: createGigMutation } = trpc.useMutation(['gig.create-gig']);

  const onSubmit = (data: FormData) => {
    const params = {
      ...data,
      logoUrl: imageUrl,
      type: 'CONSULTING',
    };
    createGigMutation(params);
    reset();
  };

  const handleFileChange = async (event: any) => {
    const { url } = await uploadToS3(event.target.files[0]);

    setImageUrl(url);
  };

  return (
    <>
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
        <input
          type="file"
          onChange={handleFileChange}
          className="w-32 self-center mt-8 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        />
        <button
          type="submit"
          className="w-32 self-center mt-8 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          CREATE
        </button>
      </form>
    </>
  );
};

export default CreateGigForm;
