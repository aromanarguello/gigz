import { ByIdInputSchema } from './../../../constants/schemas/shared';
import { createRouter } from '../context';
import invoiceService from './invoice.service';

export const invoiceRouter = createRouter().query('getAll', {
  input: ByIdInputSchema,
  resolve({ input: { id } }) {
    return invoiceService.getAll(id);
  },
});
