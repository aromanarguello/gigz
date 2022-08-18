import ActionButton from '../../components/buttons/action';
import BaseButton from '../../components/buttons/base';
import CreateInvoiceForm from '../../components/forms/createInvoiceForm';
import DashboardLayout from '../../components/layouts/dashboard';
import InvoiceTable from '../../components/tables/invoice';

const Invoice = () => {
  const handleOpenModal = () => {
    //
  };

  return (
    <DashboardLayout>
      <div className="w-full h-24 mt-4 flex justify-end items-center">
        <ActionButton text="Create New Invoice" onClick={handleOpenModal} />
      </div>
      <div className="mt-10 flex justify-center">
        <InvoiceTable />
      </div>
    </DashboardLayout>
  );
};

export default Invoice;
