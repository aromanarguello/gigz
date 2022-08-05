import { SearchIcon, ViewGridIcon, ViewListIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { trpc } from '../../../../utils/trpc';
import SearchInput from '../../../inputs/searchInput';

const spanBaseStyles = 'text-sm text-gray-400';

const listItemBaseStyles = 'my-2 font-semibold text-sm';

const menuButtonStyles = 'focus:text-blue-500';

export const GigTab = () => {
  const [orderBy, setOrderBy] = useState('desc');
  const { data } = trpc.useQuery(['gig.gigs', { orderBy }]);
  const router = useRouter();

  const handleOpenPage = (id: string) => {
    router.push(`/dashboard/gig/${id}`);
  };

  const handleOnSearch = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    // TODO
  };

  const handleOrderBy = (orderBy: string) => setOrderBy(orderBy);

  return (
    <>
      <div className="w-full grid md:grid-cols-3 items-center">
        <div className="border h-20 flex items-center justify-between">
          <p className="text-l font-bold text-gray-500 ml-10">You have {data?.length} gigs</p>
          <div className="bg-white rounded-3xl mr-2  h-10 w-24 flex flex-row justify-around items-center text-gray-400 p-2">
            <ViewGridIcon className="w-6 h-6" />
            <ViewListIcon className="w-6 h-6" />
          </div>
        </div>
        <SearchInput onChange={handleOnSearch} placeholder="Search Gigs" inputStyles="ml-4" />
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
      <div className="border border-gray-300" />
      <div className="h-[800px] overflow-y-auto mt-4">
        <div className=" w-full flex flex-wrap overflow-y-auto justify-center">
          {data?.map((gig) => (
            <div
              key={gig.id}
              className="m-4 max-w-sm rounded-lg bg-gray-100 overflow-hidden shadow-lg w-72 h-72 grid grid-rows-[1.5fr_2fr]"
            >
              <div className="grid grid-cols-[1.2fr_2fr] border border-b-gray-300">
                <div className="w-28 border flex justify-center text-gray-100 border-r-gray-300">
                  {gig.logo ? <Image src={gig.logo} alt={gig.title} width={112} height={100} /> : null}
                </div>
                <div className="flex items-start p-4 border-r-gray-300 flex-col justify-center">
                  <p className="text-gray-600 font-semibold">{gig.title || 'Untitled'}</p>
                  <p className="mt-4 text-xs font-semibold text-gray-400 capitalize">{gig.type?.replace('_', ' ')}</p>
                </div>
              </div>
              <div className="p-4">
                <ul>
                  <li className={listItemBaseStyles}>
                    Description: <span className={spanBaseStyles}>{gig.description || 'Not added'}</span>
                  </li>
                  <li className={listItemBaseStyles}>
                    Open Tasks:{' '}
                    <span className={spanBaseStyles}>{gig.tasks.filter((task) => task.isActive)?.length}</span>
                  </li>
                  <li className={listItemBaseStyles}>
                    Contact: <span className={spanBaseStyles}>aromanarguello@gmail.com</span>
                  </li>
                </ul>
                <div className="flex justify-center">
                  <button
                    onClick={() => handleOpenPage(gig.id)}
                    className="border border-gray-300 my-2 rounded-lg w-24 h-8 text-sm text-gray-400 font-semibold"
                  >
                    Open
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GigTab;
