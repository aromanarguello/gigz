import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { InvoiceSchema, ServiceSchema } from '../../server/router/invoice/invoice.schema';

import { trpc } from '../../utils/trpc';
import BaseInput from '../inputs/baseInput';

interface CreateInvoiceFormProps {
  gigId?: string;
  taskId?: string;
  clientId?: string;
}

type FormData = z.infer<typeof InvoiceSchema>;
type ItemsType = z.infer<typeof ServiceSchema>;

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
    <div className="w-[400px] h-[400px] bg-gray-100 rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseInput labelTitle="Service title" placeHolder="Code home page" inputName="title" register={register} />
        <BaseInput
          labelTitle="Description"
          placeHolder="12 hours of work"
          inputName="description"
          register={register}
        />
      </form>
    </div>
  );
};

export default CreateInvoiceForm;
