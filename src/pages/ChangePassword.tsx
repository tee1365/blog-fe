import { Box, Button, Flex } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import {
  MeDocument,
  MeQuery,
  useChangePasswordMutation,
} from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useParamsQuery } from '../utils/useParamsQuery';

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('');
  const history = useHistory();
  const query = useParamsQuery();
  const token = query.get('token');
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            variables: {
              newPassword: values.newPassword,
              token: typeof token === 'string' ? token : '',
            },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: 'Query',
                  me: data?.changePassword.user,
                },
              });
            },
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ('token' in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            history.push('/home');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="new password"
              label="New Password"
              type="password"
            ></InputField>
            {tokenError ? (
              <Flex justifyContent="space-between">
                <Box color="red">{tokenError}</Box>
                <Link to="/forgotPassword">
                  <Button>Go forget page</Button>
                </Link>
              </Flex>
            ) : null}
            <Button type="submit" color="teal" mt={4} isLoading={isSubmitting}>
              Confirm
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default ChangePassword;
