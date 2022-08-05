import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { GigType } from '@prisma/client';

const options = Object.values(GigType);

interface ListboxProps {
  option: string;
  setOption: (option: GigType) => void;
}

function BaseListbox({ option, setOption }: ListboxProps) {
  return (
    <Listbox value={option} onChange={setOption}>
      <Listbox.Label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Gig type:</Listbox.Label>
      <Listbox.Button className="font-semibold text-left block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-300 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2 align">
        {option}
      </Listbox.Button>
      <Listbox.Options className="cursor-pointer">
        {options.map((type, index) => (
          <Listbox.Option key={index} value={type}>
            {({ active }) => <li className={`${active ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}>{type}</li>}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}

export default BaseListbox;
