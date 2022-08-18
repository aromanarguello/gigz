import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { prisma } from './../../db/client';
import { Invoice } from './invoice.schema';

class InvoiceRepository {
  constructor() {}

  getAll(id: string, options?: Prisma.InvoiceFindManyArgs) {
    return prisma.invoice.findMany({ where: { userId: id }, ...options });
  }

  getById(id: string) {
    return prisma.invoice.findUnique({ where: { id } });
  }

  create(invoice: Invoice) {
    return prisma.invoice.create({ data: invoice });
  }
}

const invoiceRepository = new InvoiceRepository();

export default invoiceRepository;
