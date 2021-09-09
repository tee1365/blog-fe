import { Box, VStack } from '@chakra-ui/layout';
import Layout from '../components/Layout';
import { usePostsQuery } from '../generated/graphql';

const Home = (): JSX.Element => {
  const [{ data }] = usePostsQuery();
  return (
    <Layout>
      <VStack mt={2} spacing={3}>
        {typeof data === 'undefined'
          ? null
          : data.posts.map((p) => <Box>{p.title}</Box>)}
      </VStack>
    </Layout>
  );
};

export default Home;
