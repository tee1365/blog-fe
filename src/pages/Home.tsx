import { Box, VStack } from '@chakra-ui/layout';
import Layout from '../components/Layout';
import { usePostsQuery } from '../generated/graphql';
import { Button } from '@chakra-ui/button';
import { Link } from 'react-router-dom';

const Home = (): JSX.Element => {
  const [{ data }] = usePostsQuery();
  return (
    <Layout>
      <Link to="/createPost">
        <Button>Create Post</Button>
      </Link>
      <br />
      <VStack mt={2} spacing={3}>
        {typeof data === 'undefined'
          ? null
          : data.posts.map((p) => <Box>{p.title}</Box>)}
      </VStack>
    </Layout>
  );
};

export default Home;
