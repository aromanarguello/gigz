import { useRouter } from 'next/router';
import { trpc } from '../../../../utils/trpc';

const spanBaseStyles = 'text-sm text-gray-400';

const listItemBaseStyles = 'my-2 font-semibold text-sm';

export const GigTab = () => {
  const { data } = trpc.useQuery(['gig.gigs']);
  const router = useRouter();

  const handleOpenPage = (id: string) => {
    router.push(`/dashboard/gig/${id}`);
  };

  return (
    <div className=" w-full flex flex-wrap overflow-y-auto justify-center">
      {data?.map((gig) => (
        <div
          key={gig.id}
          className="m-4 max-w-sm rounded-lg bg-gray-100 overflow-hidden shadow-lg w-72 h-72 grid grid-rows-[1.5fr_2fr]"
        >
          <div className="grid grid-cols-[1.2fr_2fr] border border-b-gray-300">
            <div className="h-full w-full border  flex justify-center items-center text-gray-100 border-r-gray-300">
              A
            </div>
            <div className="flex items-start p-4 border-r-gray-300 flex-col justify-center">
              <p className="text-gray-600 font-semibold">{gig.title || 'Untitled'}</p>
              <p className="mt-4 text-xs font-semibold text-gray-400">{gig.type?.toLocaleLowerCase()}</p>
            </div>
          </div>
          <div className="p-4">
            <ul>
              <li className={listItemBaseStyles}>
                Description: <span className={spanBaseStyles}>{gig.description || 'Not added'}</span>
              </li>
              <li className={listItemBaseStyles}>
                Open Tasks: <span className={spanBaseStyles}>{gig.tasks?.length}</span>
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
  );
};

export default GigTab;
