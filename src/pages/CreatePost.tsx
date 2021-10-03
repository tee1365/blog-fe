import { Button } from '@chakra-ui/button';
import { Formik, Form } from 'formik';
import InputField from '../components/InputField';
import { useCreatePostMutation } from '../generated/graphql';
import Layout from '../components/Layout';
import { useIsAuth } from '../utils/useIsAuth';
import { useHistory } from 'react-router';
import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Box, Flex } from '@chakra-ui/react';

const CreatePost = (): JSX.Element => {
  const [createPost] = useCreatePostMutation();
  const [value, setValue] = useState('');
  const history = useHistory();
  useIsAuth();
  return (
    <Layout variant="regular">
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values) => {
          values.text = value;
          console.log(values);
          const { errors } = await createPost({
            variables: { createPostInput: values },
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
            ></InputField>
            <Box mt={4}>
              <MDEditor
                value={value}
                onChange={(value) => {
                  if (value) {
                    setValue(value);
                  } else {
                    setValue('');
                  }
                }}
                height={800}
              />
            </Box>
            <Flex flexDir="row-reverse" my={8}>
              <Button
                type="submit"
                isLoading={isSubmitting}
              >
                Create
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default CreatePost;
