import { Button, Box } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useState } from 'react';
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import { useForgotPasswordMutation } from '../generated/graphql';

const ForgotPassword = (): JSX.Element => {
  const [forgotPassword] = useForgotPasswordMutation();
  const [complete, setComplete] = useState(false);
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values, { setErrors }) => {
          await forgotPassword({ variables: values });
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              if an account with that email exists, we sent you an email!
            </Box>
          ) : (
            <Form>
              <InputField
                name="email"
                placeholder="Email"
                label="Email"
                type="email"
              ></InputField>
              <Button
                type="submit"
                color="teal"
                mt={4}
                isLoading={isSubmitting}
              >
                Submit
              </Button>
            </Form>
          )
        }
      </Formik>
    </Layout>
  );
};

export default ForgotPassword;
