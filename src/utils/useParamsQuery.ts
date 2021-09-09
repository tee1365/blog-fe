import { useLocation } from 'react-router-dom';

export const useParamsQuery = () => {
  return new URLSearchParams(useLocation().search);
};
