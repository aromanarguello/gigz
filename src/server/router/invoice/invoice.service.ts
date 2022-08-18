import { Prisma } from '@prisma/client';
import invoiceRepository from './invoice.repository';
import { Invoice } from './invoice.schema';

class InvoiceService {
  constructor() {}

  async getAll(userId: string, options?: Prisma.InvoiceFindManyArgs) {
    return await invoiceRepository.getAll(userId, options);
  }

  async getById(id: string) {
    return await invoiceRepository.getById(id);
  }

  async create(invoice: Invoice) {
    return await invoiceRepository.create(invoice);
  }
}

const invoiceService = new InvoiceService();

export default invoiceService;
