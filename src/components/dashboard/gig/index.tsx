import { Checkbox } from '@chakra-ui/react';
import {
  DocumentTextIcon,
  EyeIcon,
  FolderIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
  ViewGridIcon,
  ViewListIcon,
} from '@heroicons/react/solid';
import { Gig, GigTasks } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';

import { trpc } from '../../../utils/trpc';
import SearchInput from '../../inputs/searchInput';

const spanBaseStyles = 'text-sm text-gray-400';

const listItemBaseStyles = 'my-2 font-semibold text-sm flex items-center text-gray-400';

const menuButtonStyles = 'focus:text-blue-500';

const iconStyles = 'w-6 h-6 text-gray-400 mr-2';

type GigType = (Gig & {
  tasks: GigTasks[];
})[];

export const GigTab = () => {
  const [orderBy, setOrderBy] = useState('desc');
  const [searchParams, setSearchParams] = useState('');
  const [gigs, setGigs] = useState<GigType>([]);
  const { data } = trpc.useQuery(['gig.gigs', { orderBy, searchParams }]);
  const router = useRouter();

  const editGig = (id: string) => {
    router.push(`/dashboard/gig/${id}`);
  };

  useEffect(() => {
    setGigs(data || []);
  }, [data]);

  const handleOrderBy = (orderBy: string) => setOrderBy(orderBy);

  const handleSearch = (e: FormEvent<HTMLInputElement>) => setSearchParams(e.currentTarget.value);

  return (
    <>
      <div className="w-full grid md:grid-cols-3 items-center">
        <div className="h-10 my-2 flex items-center justify-between">
          <p className="text-l font-bold text-gray-500 ml-10">You have {data?.length} gigs</p>
          <div className="bg-white rounded-3xl mr-2 h-10 w-24 flex flex-row justify-around items-center text-gray-400 p-2">
            <ViewGridIcon className="w-6 h-6" />
            <ViewListIcon className="w-6 h-6" />
          </div>
        </div>
        <SearchInput onChange={handleSearch} placeholder="Search Gigs" inputStyles="ml-4" />
        <div className="flex space-x-8 text-gray-400 text-sm font-semibold justify-self-center">
          <p>Sort By:</p>
          <ul className="flex space-x-8">
            <li>
              <button className={menuButtonStyles} onClick={() => handleOrderBy('title')}>
                Title
              </button>
            </li>
            <li>
              <button className={menuButtonStyles} onClick={() => handleOrderBy('desc')}>
                Newest
              </button>
            </li>
            <li>
              <button className={menuButtonStyles} onClick={() => handleOrderBy('asc')}>
                Oldest
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="border border-gray-200" />
      <div className="h-[800px] overflow-y-auto">
        <div className=" w-full flex flex-wrap overflow-y-auto justify-center ">
          {gigs?.map((gig) => (
            <div
              key={gig.id}
              className="m-4 max-w-sm rounded-lg bg-transparent overflow-hidden border-2 border-gray-200 w-64 h-64 flex flex-col"
            >
              <div className="h-16 flex justify-between items-center px-4">
                <Checkbox size="lg" />
                <div className="flex space-x-4">
                  <PencilIcon
                    onClick={() => editGig(gig.id)}
                    className={`${iconStyles} opacity-60 cursor-pointer hover:text-blue-500`}
                  />
                  <TrashIcon className={`${iconStyles} opacity-60 cursor-pointer hover:text-blue-500`} />
                  <EyeIcon className={`${iconStyles} opacity-60 cursor-pointer hover:text-blue-500`} />
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-24 h-14 flex rounded-lg justify-center text-gray-100 border-r-gray-300">
                  {gig.logo ? (
                    <Image className="rounded-lg" src={gig.logo} alt={gig.title} width={64} height={60} />
                  ) : null}
                </div>
                <div className="flex items-start border-r-gray-300 flex-col justify-center space-y-2">
                  <p className="text-gray-600 font-semibold text-sm">{gig.title || 'Untitled'}</p>
                  <p className="mt-4 text-xs font-semibold text-gray-400 capitalize">{gig.type?.replace('_', ' ')}</p>
                </div>
              </div>
              <div className="p-2 mt-1">
                <ul className="pl-2">
                  <li className={listItemBaseStyles}>
                    <UserIcon className={iconStyles} />
                    <span className={spanBaseStyles}>aromanarguello@gmail.com</span>
                  </li>
                  <li className={listItemBaseStyles}>
                    <DocumentTextIcon className={iconStyles} />
                    <span className={spanBaseStyles}>{gig.description || 'Not added'}</span>
                  </li>
                  <li className={listItemBaseStyles}>
                    <FolderIcon className={iconStyles} />
                    Tasks:{' '}
                    <span className={`ml-1 ${spanBaseStyles}`}>
                      {gig.tasks.filter((task) => task.isActive)?.length}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GigTab;
