import { history } from '..';
import { useEffect } from 'react';
import { useMeQuery } from '../generated/graphql';
import { useLocation } from 'react-router';

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  const location = useLocation();
  useEffect(() => {
    if (!fetching && !data?.me) {
      // history.replace('/login?next=' + router.pathname);
      history.replace('/login?next=' + location.pathname);
    }
  }, [data, fetching, location.pathname]);
};
