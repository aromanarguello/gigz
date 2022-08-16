import { ByIdInputSchema } from './../../../constants/schemas/shared';
import { createRouter } from '../context';
import invoiceService from './invoice.service';
import { InvoiceSchema } from './invoice.schema';

export const invoiceRouter = createRouter()
  .query('getAll', {
    input: ByIdInputSchema,
    resolve({ input: { id } }) {
      return invoiceService.getAll(id);
    },
  })
  .mutation('create', {
    input: InvoiceSchema,
    resolve({ input }) {
      return invoiceService.create(input);
    },
  });
