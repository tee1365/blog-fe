import { Button } from '@chakra-ui/button';
import { Formik, Form } from 'formik';
import InputField from '../components/InputField';
import { usePostQuery, useUpdatePostMutation } from '../generated/graphql';
import Layout from '../components/Layout';
import { useIsAuth } from '../utils/useIsAuth';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { PostFormInitialStateType } from '../types';

const EditPost = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const intId = typeof id === 'string' ? +id : -1;
  const [editPost] = useUpdatePostMutation();
  const { data } = usePostQuery({
    variables: {
      postId: intId,
    },
    skip: intId === -1,
  });
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (data?.post) {
      setText(data.post.text);
      setTitle(data.post.title);
    }
  }, [data]);

  useIsAuth();
  return (
    <Layout variant="regular">
      <Formik
        initialValues={{ text, title }}
        onSubmit={async () => {
          const { errors } = await editPost({
            variables: {
              updatePostId: intId,
              updatePostText: text,
              updatePostTitle: title,
            },
            update: (cache) => {
              cache.evict({ fieldName: 'posts' });
            },
          });
          if (!errors) {
            history.push('/home');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              placeholder="title"
              label="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></InputField>
            <Box mt={4}>
              <MDEditor
                value={text}
                onChange={(value) => {
                  if (value) {
                    setText(value);
                  } else {
                    setText('');
                  }
                }}
                height={800}
              />
            </Box>
            <Flex flexDir="row-reverse" my={8}>
              <Button type="submit" isLoading={isSubmitting}>
                Confirm
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default EditPost;
