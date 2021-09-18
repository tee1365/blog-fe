import { Box, VStack, Text } from '@chakra-ui/layout';
import { Button, Flex, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import MDEditor from '@uiw/react-md-editor';
import Layout from '../components/Layout';
import { usePostsQuery } from '../generated/graphql';

const Home = (): JSX.Element => {
  const { data, loading, fetchMore, variables } = usePostsQuery({
    variables: { postsLimit: 3, postsCursor: null },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    return <Text>no post to display or query failed</Text>;
  }

  return (
    <Layout add={true}>
      <VStack mt={2} spacing={3}>
        {typeof data === 'undefined'
          ? null
          : data.posts.posts.map((p) => (
              <LinkBox
                as="article"
                p="5"
                borderWidth="1px"
                rounded="md"
                width="100%"
                key={p.id}
              >
                <Box as="time" dateTime="2021-01-15 15:30:00 +0000 UTC">
                  {new Date(+p.createdAt).toLocaleString('en-NZ')}
                </Box>
                <Heading size="md" my="2">
                  <LinkOverlay href="#">{p.title}</LinkOverlay>
                </Heading>
                <MDEditor.Markdown source={p.textSnippet} />
              </LinkBox>
            ))}
      </VStack>
      {data && !loading && data.posts.hasMore ? (
        <Flex>
          <Button
            mx="auto"
            my={8}
            onClick={() => {
              fetchMore({
                variables: {
                  postsLimit: variables?.postsLimit,
                  postsCursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                },
              });
            }}
          >
            Load More
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default Home;
