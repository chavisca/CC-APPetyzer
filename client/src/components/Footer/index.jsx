import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SEND_EMAIL_MUTATION } from '../../utils/mutations';
import DonationForm from '../../pages/DonationForm';
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  SimpleGrid,
  Stack,
  Heading,
  Divider,
  Button,
  Text,
  Image,
  HStack,
  Spacer,
  Link as ChakraLink,
} from "@chakra-ui/react";

const ReferAFriendModal = ({ onClose, referFriend }) => {
  const [friendName, setFriendName] = useState('');
  const [friendEmail, setFriendEmail] = useState('');


  const handleInputChange = (e) => {
    console.log('Input changed:', e.target.value);
    const { id, value } = e.target;
    if (id === 'friendName') {
      console.log('friendName');
      setFriendName(value);
    } else if (id === 'friendEmail') {
      console.log('friendEmail');
      setFriendEmail(value);
    }
  };

  const handleSubmit = async () => {
    try {
      await referFriend(friendName, friendEmail);
      console.log(`Referring a friend with name: ${friendName} and email: ${friendEmail}`);
      onClose();
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>Refer a Friend</p>
        <label htmlFor="friendName">Friend's Name:</label>
        <input
          type="text"
          id="friendName"
          value={friendName}
          onChange={handleInputChange}
        />
        <label htmlFor="friendEmail">Friend's Email:</label>
        <input
          type="email"
          id="friendEmail"
          value={friendEmail}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

const Footer = () => {
  const [isReferModalOpen, setReferModalOpen] = useState(false);
  const [sendEmail] = useMutation(SEND_EMAIL_MUTATION);
  const navigate = useNavigate();

  const openReferModal = () => setReferModalOpen(true);
  const closeReferModal = () => setReferModalOpen(false);

  const referFriend = async (friendName, friendEmail) => {
    try {
      const response = await sendEmail({
        variables: {
          friendName,
          friendEmail,
        },
      });

      if (response.data.sendEmail) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email', response);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };



  return (
    <Box as="footer" w="100%" mt="auto" bg="brand.green" p={4}>
      <HStack spacing={2} align="center" mb={{ base: 4, md: 0 }}>
        <Button
          colorScheme="red"
          variant="solid"
          ml={16}
          onClick={openReferModal}

        >
          Refer a Friend
        </Button>
        <Spacer />
        <Button
          colorScheme="red"
          variant="solid"
          mr={16}
          onClick={() => navigate('/donate')}
        >
          Donate
        </Button>
      </HStack>
      {isReferModalOpen &&
        <ReferAFriendModal onClose={closeReferModal} referFriend={referFriend} />
      }
      <Heading as="h2" fontSize="xl" mt={3} align="center">
        Made with{" "}
        <span role="img" aria-label="heart" aria-hidden="false">
          ❤️
        </span>{" "}
        by the Appetyzer team.
      </Heading>
      <HStack
        spacing={2}
        align="center"
        justify="center"
        mb={{ base: 4, md: 0 }}
      >
        <Box
          as={Link}
          to="https://main--lively-khapse-b22e43.netlify.app/"
          _hover={{ color: "blue.500" }}
          fontSize="2xl"
          textDecoration="underline"
        >
          <Text m={1}>Charles Chavis</Text>
        </Box>
        <Box
          as={Link}
          to="https://babread.github.io/IntoTheWorld"
          _hover={{ color: "blue.500" }}
          fontSize="2xl"
          textDecoration="underline"
        >
          <Text m={1}>Donald Leon</Text>
        </Box>
        <Box
          as={Link}
          to="https://rrciii.github.io/Working_Portfolio"
          _hover={{ color: "blue.500" }}
          fontSize="2xl"
          textDecoration="underline"
        >
          <Text m={1}>Ricky Carter</Text>
        </Box>
        <Box
          as={Link}
          to="https://rvanvlietii.github.io/My-Portfolio-Showcase"
          _hover={{ color: "blue.500" }}
          fontSize="2xl"
          textDecoration="underline"
        >
          <Text m={1}>Robert Campbell Van Vliet II</Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default Footer;

