import { DeleteIcon } from '@chakra-ui/icons';
import { Box, VStack, Text } from '@chakra-ui/layout';
import { Button, Flex, Heading, IconButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import {
  useDeletePostMutation,
  useMeQuery,
  usePostsQuery,
} from '../generated/graphql';

const Home = (): JSX.Element => {
  const { data, loading, fetchMore, variables } = usePostsQuery({
    variables: { postsLimit: 5, postsCursor: null },
    notifyOnNetworkStatusChange: true,
  });

  const { data: me } = useMeQuery();

  const [deletePost] = useDeletePostMutation();

  if (!loading && !data) {
    return <Text>no post to display or query failed</Text>;
  }

  return (
    <Layout add={true} variant="small">
      <VStack mt={2} spacing={3}>
        {typeof data === 'undefined'
          ? null
          : data.posts.posts.map((p) => (
              <Box
                as="article"
                p="5"
                borderWidth="1px"
                rounded="md"
                width="100%"
                key={p.id}
              >
                <Box as="time">
                  {new Date(+p.createdAt).toLocaleString('en-NZ')}
                </Box>
                <Flex align="center" justifyContent="space-between">
                  <Heading my="2" size="lg">
                    <Link to={'/post/' + p.id}>{p.title}</Link>
                  </Heading>
                  {me?.me?.isAdmin ? (
                    <IconButton
                      ml={8}
                      icon={<DeleteIcon />}
                      aria-label="delete-post"
                      onClick={() => {
                        deletePost({
                          variables: {
                            deletePostId: p.id,
                          },
                          update: (cache) => {
                            cache.evict({ fieldName: 'posts' });
                          },
                        });
                      }}
                    ></IconButton>
                  ) : null}
                </Flex>
              </Box>
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
