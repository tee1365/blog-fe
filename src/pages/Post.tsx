import { Heading, Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Layout from '../components/Layout';
import { usePostQuery } from '../generated/graphql';
import { useParamsQuery } from '../utils/useParamsQuery';

const Post = () => {
  const id = useParamsQuery().get('id');
  const intId = typeof id === 'string' ? +id : -1;
  const { data, loading, error } = usePostQuery({
    variables: {
      postId: intId,
    },
    skip: intId === -1,
  });

  let body: ReactNode;

  if (loading) {
    body = null;
  } else if (error) {
    body = <Box>{error.message}</Box>;
  } else if (!data?.post) {
    body = <Box>Could not find post</Box>;
  } else {
    body = (
      <>
        <Heading mb={4}>{data.post.title}</Heading>
        {data.post.text}
      </>
    );
  }

  return <Layout>{body}</Layout>;
};

export default Post;
