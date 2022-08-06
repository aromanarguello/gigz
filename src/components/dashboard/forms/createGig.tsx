import { UploadIcon } from '@heroicons/react/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { useS3Upload } from 'next-s3-upload';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';
import { trpc } from '../../../utils/trpc';
import BaseInput from '../../inputs/baseInput';
import { GigType } from '@prisma/client';
import BaseListbox from '../../listBox/baseListBox';

export const GigSchema = z.object({
  title: z.string(),
  description: z.string(),
  startDate: z.date(),
});

type FormData = z.infer<typeof GigSchema>;

export const CreateGigForm = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [gigType, setGigType] = useState<GigType>('CONSULTING');

  const { uploadToS3, openFileDialog, FileInput } = useS3Upload();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(GigSchema),
  });

  const { mutateAsync: createGigMutation } = trpc.useMutation(['gig.createGig']);

  const onSubmit = (data: FormData) => {
    const params = {
      ...data,
      logoUrl: imageUrl,
      type: GigType[gigType],
    };

    createGigMutation(params);
    setImageUrl('');
    reset();
  };

  const handleFileChange = async (event: any) => {
    const { url } = await uploadToS3(event);

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
        <BaseListbox option={gigType} setOption={setGigType} />
        <div className="flex justify-center">
          {imageUrl && <Image src={imageUrl} alt="logo-preview" className="w-32 h-32" width={100} height={100} />}
          <FileInput onChange={handleFileChange} />
          <button
            type="button"
            onClick={openFileDialog}
            className="w-32 self-center mt-8 inline-flex items-center justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <UploadIcon className="w-4 h-4 mr-2" />
            Upload
          </button>
        </div>
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
