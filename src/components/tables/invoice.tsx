import { BellIcon, CheckCircleIcon, PencilIcon } from '@heroicons/react/outline';
import { InvoiceStatus } from '@prisma/client';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { Invoice } from '../../server/router/invoice/invoice.schema';
import { formatDate } from '../../utils/helpers';
import { trpc } from '../../utils/trpc';

const formatDollarAmount = (amount: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(amount);
};

const statusIcons = (status: string) => {
  return {
    [InvoiceStatus.PENDING]: <PencilIcon className="w-8 h-8 text-orange-500 cursor-pointer" />,
    [InvoiceStatus.SUBMITTED]: <CheckCircleIcon className="w-8 h-8 text-green-600 cursor-pointer" />,
  }[status];
};
const InvoiceTable = () => {
  const [invoices, setInvoices] = useState([]);
  const { data, isLoading } = trpc.useQuery(['invoice.getAll']);
  console.log('🚀 ~ file: invoice.tsx ~ line 7 ~ InvoiceTable ~ data', data);

  useEffect(() => {
    if (data) {
      setInvoices(data);
    }
  }, [data]);

  const columnHelper = createColumnHelper<Invoice>();

  const columns = [
    columnHelper.accessor('title', {
      header: 'Title',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('amount', {
      header: 'Amount',
      cell: (info) => formatDollarAmount(info.getValue()),
    }),
    columnHelper.accessor('createdAt', {
      header: 'Created On',
      cell: (info) => formatDate(info.getValue()),
    }),
    columnHelper.accessor('sentAt', {
      header: 'Sent On',
      cell: (info) => info.getValue() && formatDate(info.getValue()),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => statusIcons(info.getValue()),
    }),
  ];

  const table = useReactTable({ data: invoices, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="w-20 md:w-52 border-b border-gray-300">
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="align-middle border-b border-gray-300">
                <div className="flex justify-center h-24 items-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default InvoiceTable;
