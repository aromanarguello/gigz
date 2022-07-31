import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import BaseButton from '../../../components/buttons/base';
import DashboardLayout from '../../../components/layouts/dashboard';
import { trpc } from '../../../utils/trpc';

const GigPage = () => {
  const router = useRouter();
  const gigId = router.query.gigId as string;
  const { data: gig } = trpc.useQuery(['gig.gig-by-id', { id: gigId }]);

  const handleBack = () => router.back();

  return (
    <DashboardLayout>
      <div>
        <p className="text-3xl capitalize text-gray-500 font-semibold">{gig?.title}</p>
      </div>
      <div className="h-full border  self-center flex flex-col justify-center">
        <div className="h-3/4 border border-gray-300 rounded-lg"></div>
        <BaseButton onClick={handleBack} text="BACK" />
      </div>
    </DashboardLayout>
  );
};
export default GigPage;
