import { Button, Flex } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const Login = (): JSX.Element => {
  const [{}, login] = useLoginMutation();
  const history = useHistory();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          // const response = await login(values);
          // if (response.data?.login.errors) {
          //   setErrors(toErrorMap(response.data.login.errors));
          // } else if (response.data?.login.user) {
          //   if (typeof router.query.next === 'string') {
          //     history.push(router.query.next);
          //   } else {
          //     history.push('/home');
          //   }
          // }
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
    </Wrapper>
  );
};

export default Login;
