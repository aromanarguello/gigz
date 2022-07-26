import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import DashboardLayout from '../../components/layouts/dashboard';
import { trpc } from '../../utils/trpc';

const GigPage = () => {
  const router = useRouter();
  const gigId = router.query.gigId as string;

  const { data: gig } = trpc.useQuery(['gig.gig', { id: gigId }]);

  return (
    <DashboardLayout>
      <button>Back</button>
      <div>{gig?.title}</div>
    </DashboardLayout>
  );
};
export default GigPage;
