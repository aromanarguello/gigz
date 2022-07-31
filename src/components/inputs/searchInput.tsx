import { SearchIcon } from '@heroicons/react/solid';

export interface SearchInputProps {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
  inputStyles?: string;
  containerStyles?: string;
}

const SearchInput = (props: SearchInputProps) => {
  return (
    <div className={`relative ${props.containerStyles}`}>
      <SearchIcon className="absolute w-4 h-4 mr-2 top-1/2 transform -translate-y-1/2 left-8 text-gray-400" />
      <input
        onChange={props.onChange}
        className={`px-10 bg-white text-gray-500 font-medium rounded-3xl shadow-xs shadow-gray-300 h-10 w-64 placeholder:text-sm placeholder:font-semibold ${props.inputStyles}`}
        placeholder={props.placeholder}
        type="text"
      />
    </div>
  );
};

export default SearchInput;
