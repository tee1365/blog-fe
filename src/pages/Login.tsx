import { Button, Flex } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import InputField from '../components/InputField';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useParamsQuery } from '../utils/useParamsQuery';
import Layout from '../components/Layout';

const Login = (): JSX.Element => {
  const [login] = useLoginMutation();
  const history = useHistory();
  const query = useParamsQuery();
  const next = query.get('next');
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: values,
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: 'Query',
                  me: data?.login.user,
                },
              });
              cache.evict({ fieldName: 'posts' });
            },
          });

          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            if (typeof next === 'string') {
              history.push(next);
            } else {
              history.push('/home');
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or Email"
              label="username or Email"
            ></InputField>
            <InputField
              name="password"
              placeholder="password"
              label="Password"
              type="password"
            ></InputField>
            <Flex direction="row-reverse" mt={2}>
              <Link to="/forgotPassword">
                <Button>forgot password?</Button>
              </Link>
            </Flex>
            <Button type="submit" color="teal" mt={4} isLoading={isSubmitting}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default Login;
