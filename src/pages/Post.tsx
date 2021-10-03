import { Heading, Box, Textarea, Button, Flex } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Layout from '../components/Layout';
import { useCreateCommentMutation, usePostQuery } from '../generated/graphql';

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const intId = typeof id === 'string' ? +id : -1;
  const history = useHistory();
  const [value, setValue] = useState('');

  const { data, loading, error } = usePostQuery({
    variables: {
      postId: intId,
    },
    skip: intId === -1,
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
        <Heading mb={4}>{data.post.title}</Heading>
        {data.post.text}
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
              // if (!errors) {
              //   history.push('/home');
              // }
            }}
          >
            Submit
          </Button>
        </Flex>
      </>
    );
  }

  return <Layout>{body}</Layout>;
};

export default Post;
