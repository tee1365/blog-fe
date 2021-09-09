import { Box, Button, Flex } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { useChangePasswordMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

const ChangePassword = () => {
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('');
  const history = useHistory();
  const params = useParams();
  console.log(params);
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          // const response = await changePassword({
          //   newPassword: values.newPassword,
          //   token:
          //     typeof router.query.token === 'string' ? router.query.token : '',
          // });
          // if (response.data?.changePassword.errors) {
          //   const errorMap = toErrorMap(response.data.changePassword.errors);
          //   if ('token' in errorMap) {
          //     setTokenError(errorMap.token);
          //   }
          //   setErrors(errorMap);
          // } else if (response.data?.changePassword.user) {
          //   history.push('/home');
          // }
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
    </Wrapper>
  );
};

export default ChangePassword;
