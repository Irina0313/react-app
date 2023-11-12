import { createContext } from 'react';
import { IApiResp } from '../api/Client';

interface SearchContextType {
  onSearch: (searchQuery: string | null) => void;
  prevSearchParams: string | null;
}

export const ProductsContext = createContext<IApiResp | null>(null);
export const LoadingContext = createContext<boolean>(false);
export const SearchContext = createContext<SearchContextType>({
  onSearch: () => {},
  prevSearchParams: null,
});
