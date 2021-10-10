import { Box, Textarea, Button, Flex, VStack, Text } from '@chakra-ui/react';
import MDEditor from '@uiw/react-md-editor';
import { ReactNode, useState } from 'react';
import { useParams } from 'react-router';
import Layout from '../components/Layout';
import {
  useCreateCommentMutation,
  useGetCommentsQuery,
  usePostQuery,
} from '../generated/graphql';

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const intId = typeof id === 'string' ? +id : -1;
  const [value, setValue] = useState('');

  const { data, loading, error } = usePostQuery({
    variables: {
      postId: intId,
    },
    skip: intId === -1,
  });

  const { data: comments } = useGetCommentsQuery({
    variables: { commentsPostId: intId },
  });

  const [createComment] = useCreateCommentMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

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
        <Box as="article" p="5" borderWidth="1px" rounded="md" width="100%">
          <MDEditor.Markdown source={data.post.text} />
        </Box>

        <Textarea
          mt={8}
          placeholder="Comment..."
          value={value}
          onChange={handleInputChange}
        />

        <Flex flexDir="row-reverse">
          <Button
            mt={4}
            onClick={async () => {
              const { errors } = await createComment({
                variables: {
                  createCommentPostId: intId,
                  createCommentText: value,
                },
                update: (cache) => {
                  cache.evict({ fieldName: 'comments' });
                },
              });
              setValue('');
              console.log(errors);
            }}
          >
            Submit
          </Button>
        </Flex>

        <VStack my={8} spacing={4}>
          {typeof comments === 'undefined'
            ? null
            : comments.comments.map((comment) => (
                <Box
                  as="article"
                  p="5"
                  borderWidth="1px"
                  rounded="md"
                  width="100%"
                  key={comment.id}
                >
                  <Text fontWeight="bold">{comment.creator.username}</Text>
                  <Text>{comment.text}</Text>
                </Box>
              ))}
        </VStack>
      </>
    );
  }

  return <Layout>{body}</Layout>;
};

export default Post;
