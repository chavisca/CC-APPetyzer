import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import {
  Box,
  Input,
  Flex,
  Heading,
  Button,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="calc(100vh - 240px)"
      bg='brand.gray'
      w="100%"
    >
      <Box w="full" maxW="lg" p={6}>
        <Box bg="brand.black" p={8} borderRadius="lg">
          <Heading as="h4" size="md" color="white" mb={4}>
            Sign Up
          </Heading>
          <Box>
            {data ? (
              <Text color="green.500">
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </Text>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <Input
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                  mb={4}
                  color='white'
                />
                <Input
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  mb={4}
                  color='white'
                />
                <Input
                  placeholder="Choose a secure password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                  mb={4}
                  color='white'
                />
                <Button
                  colorScheme="green"
                  size="lg"
                  type="submit"
                  isFullWidth
                >
                  Submit
                </Button>
              </form>
            )}
            {error && (
              <Box mt={4} bg="red.500" p={3} borderRadius="md">
                <Text color="white">{error.message}</Text>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Signup;
