import { history } from '..';
import { useEffect } from 'react';
import { useMeQuery } from '../generated/graphql';

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  useEffect(() => {
    if (!fetching && !data?.me) {
      // history.replace('/login?next=' + router.pathname);
      history.replace('/login?next=');
    }
  }, [data, fetching]);
};
