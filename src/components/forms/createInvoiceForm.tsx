import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { InvoiceSchema, ItemsSchema } from '../../server/router/invoice/invoice.schema';

import { trpc } from '../../utils/trpc';
import BaseInput from '../inputs/baseInput';

interface CreateInvoiceFormProps {
  gigId?: string;
  taskId?: string;
  clientId?: string;
}

type FormData = z.infer<typeof InvoiceSchema>;
type ItemsType = z.infer<typeof ItemsSchema>;

const CreateInvoiceForm = (props: CreateInvoiceFormProps) => {
  const [items, setItems] = useState<ItemsType>([]);

  const { mutateAsync: createInvoice } = trpc.useMutation(['invoice.create']);

  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(InvoiceSchema),
  });

  const handleAddItem = () => {
    setItems((prev) => [...prev, { title: '', amount: 0, quantity: 0, rate: 0 }]);
  };

  const onSubmit = (data: FormData) => {
    const params = {
      ...data,
    };
    createInvoice(params);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseInput labelTitle="Service title" placeHolder="Code home page" inputName="title" register={register} />
        <BaseInput
          labelTitle="Description"
          placeHolder="12 hours of work"
          inputName="description"
          register={register}
        />
      </form>
    </>
  );
};

export default CreateInvoiceForm;
