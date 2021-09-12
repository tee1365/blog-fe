import { Button } from '@chakra-ui/button';
import { Formik, Form } from 'formik';
import InputField from '../components/InputField';
import { useCreatePostMutation } from '../generated/graphql';
import Layout from '../components/Layout';
import { useIsAuth } from '../utils/useIsAuth';
import { useHistory } from 'react-router';
import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Box } from '@chakra-ui/react';

const CreatePost = (): JSX.Element => {
  const [, createPost] = useCreatePostMutation();
  const [value, setValue] = useState('');
  const history = useHistory();
  useIsAuth();
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values) => {
          values.text = value;
          console.log(values);
          const { error } = await createPost({ createPostInput: values });
          console.log(error);
          if (!error) {
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
            {/* <InputField
              textarea
              name="text"
              placeholder="text..."
              label="Body"
            ></InputField> */}
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
              />
            </Box>
            <Button type="submit" color="teal" mt={4} isLoading={isSubmitting}>
              Create
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default CreatePost;
