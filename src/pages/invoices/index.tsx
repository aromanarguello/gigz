import CreateInvoiceForm from '../../components/forms/createInvoiceForm';
import DashboardLayout from '../../components/layouts/dashboard';

const Invoice = () => {
  return (
    <DashboardLayout>
      <div className="w-64">
        <CreateInvoiceForm />
      </div>
    </DashboardLayout>
  );
};

export default Invoice;
