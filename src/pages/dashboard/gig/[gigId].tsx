import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import DashboardLayout from '../../../components/layouts/dashboard';
import { trpc } from '../../../utils/trpc';

const GigPage = () => {
  const router = useRouter();
  const gigId = router.query.gigId as string;
  const { data: gig } = trpc.useQuery(['gig.gig-by-id', { id: gigId }]);

  const handleBack = () => router.back();

  return (
    <DashboardLayout>
      <button onClick={handleBack}>Back</button>
      <div>{gig?.title}</div>
      <div>{gig?.description}</div>
      <div>{gig?.type}</div>
      <div>
        {gig?.invoices.map((invoice) => (
          <div key={invoice.id}>
            <div>{invoice.title}</div>
          </div>
        ))}
      </div>
      <div>
        {gig?.tasks.map((task) => (
          <div key={task.id}>
            <div>{task.title}</div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};
export default GigPage;
