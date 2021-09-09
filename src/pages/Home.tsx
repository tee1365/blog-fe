import { Box, VStack } from '@chakra-ui/layout';
import { Heading, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { usePostsQuery } from '../generated/graphql';

const Home = (): JSX.Element => {
  const [{ data }] = usePostsQuery();
  return (
    <Layout add={true}>
      <VStack mt={2} spacing={3}>
        {typeof data === 'undefined'
          ? null
          : data.posts.map((p) => (
              <LinkBox
                as="article"
                p="5"
                borderWidth="1px"
                rounded="md"
                width="100%"
              >
                <Box as="time" dateTime="2021-01-15 15:30:00 +0000 UTC">
                  {/* {p.updatedAt} */}
                  time
                </Box>
                <Heading size="md" my="2">
                  <LinkOverlay href="#">{p.title}</LinkOverlay>
                </Heading>
                <Text>{p.text}</Text>
              </LinkBox>
            ))}
      </VStack>
    </Layout>
  );
};

export default Home;
