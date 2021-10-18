import { history } from '..';
import { useEffect } from 'react';
import { useMeQuery } from '../generated/graphql';
import { useLocation } from 'react-router';

// this function is used to check whether users are loged in. If not, they will be redirected to the log in page.

export const useIsAuth = () => {
  const { data, loading } = useMeQuery();
  const location = useLocation();
  useEffect(() => {
    if (!loading && !data?.me) {
      history.replace('/login?next=' + location.pathname);
    }
  }, [data, loading, location.pathname]);
};
