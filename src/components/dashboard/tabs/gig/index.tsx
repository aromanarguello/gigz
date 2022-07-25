import { trpc } from '../../../../utils/trpc';

export const GigTab = () => {
  const { data } = trpc.useQuery(['gig.gigs']);

  return (
    <div className=" w-full flex flex-wrap overflow-y-auto justify-center">
      {data?.map((gig) => (
        <div
          key={gig.id}
          className="m-4 max-w-sm rounded-lg overflow-hidden shadow-lg w-72 h-72 grid grid-rows-[1.5fr_2fr]"
        >
          <div className="grid grid-cols-[1.2fr_2fr] border border-b-gray-300">
            <div className="h-full w-full border bg-gray-300 flex justify-center items-center text-gray-100">A</div>
            <div className="flex items-start p-4 border-r-gray-300 flex-col justify-center">
              <p className="text-gray-600 font-semibold">{gig.title}</p>
              <p className="mt-4 text-xs font-semibold text-gray-400">{gig.type?.toLocaleLowerCase()}</p>
            </div>
          </div>
          <div className="p-4">
            <ul>
              <li>Description: {gig.description}</li>
              <li>Open Tasks: 0</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GigTab;
