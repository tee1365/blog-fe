import { Button } from '@chakra-ui/button';
import { Formik, Form } from 'formik';
import InputField from '../components/InputField';
import { useCreatePostMutation } from '../generated/graphql';
import Layout from '../components/Layout';
import { useIsAuth } from '../utils/useIsAuth';
import { useHistory } from 'react-router';

const CreatePost = (): JSX.Element => {
  const [, createPost] = useCreatePostMutation();
  const history = useHistory();
  useIsAuth();
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values) => {
          const { error } = await createPost({ createPostInput: values });
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
            <InputField
              textarea
              name="text"
              placeholder="text..."
              label="Body"
            ></InputField>
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
