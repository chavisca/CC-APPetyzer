import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import Auth from "../../utils/auth";
import {
  Box,
  Flex,
  HStack,
  Input,
  Button,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";

const Header = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {

    if (data && !loading) {
      console.log(data);
    };
  }, [data]);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      performFetchSearch(searchTerm);

    }
  };

  function performFetchSearch(term) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const results = data.meals;
        console.log(results);
        setSearchResults(results);


        window.location.href = `/search-results/${term}`;
      })
      .catch((error) => {
        console.error("Error with fetch request: ", error);
      });
  }

  return (
    <Box bg="brand.green" p={4} as="header" w="100%" mt="auto">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        flexWrap={{ base: 'wrap', md: 'nowrap' }}
      >
        <Box >
          <Link to="/">
            <Text
              ml={{ base: 6, md: 0 }}
              fontSize={{ base: '5xl', md: '4xl' }}
              as="b"
              fontFamily="Edu TAS Beginner, cursive"
            >
              Appetyzer
            </Text>
          </Link>
        </Box>
        <Box pl={{ base: 4, md: 0 }} ml={4} maxWidth={{ base: '30%', md: '30%' }}>
          <Text fontSize={{ base: '2xl', md: 'xl' }} as="i" fontFamily="Josefin Sans, sans-serif">
            ¡¡Bon Appetite!!
          </Text>
        </Box>
        <HStack>
          <Box mb={{ base: 4, md: 0 }} mr={{ base: 0, md: 2 }}>
            <Input
              type="text"
              size="lg"
              placeholder="Search for a meal..."
              _placeholder={{ color: "brand.black" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
          </Box>
          <Link to="/search-results">
            <Button _hover={{ bg: "blue.500" }} onClick={handleSearch} ml={{ base: 0, md: 2 }}>
              Search
            </Button>
          </Link>
        </HStack>
        <HStack pl={6}>
          <Text
            fontSize={{ base: '2xl', md: 'em' }}
            as="em"
            color="brand.black"
            ml={{ base: 0, md: 5 }}
          >
            {Auth.loggedIn() ? (
              <>
                {!loading && data && (
                  <span>Hey there, {data.me.username}!</span>)}
                <Link to="/profilepage">
                  <Button _hover={{ bg: "blue.500" }} ml={4} fontSize={{ base: 'lg', md: 'lg' }} textDecoration="underline">
                    My Profile
                  </Button>
                </Link>
                <Button
                  _hover={{ bg: "blue.500" }}
                  className="btn btn-lg btn-light m-2"
                  ml={{ base: 0, md: 5 }}
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <><Link to="/login">
                <Button _hover={{ bg: "blue.500" }} fontSize={{ base: 'lg', md: 'lg' }} textDecoration="underline" mr={{ base: 3, md: 3 }}>
                  Login
                </Button>
              </Link>
                <Link to="/signup">
                  <Button _hover={{ bg: "blue.500" }} fontSize={{ base: 'lg', md: 'lg' }} textDecoration="underline">
                    Signup
                  </Button>
                </Link>
              </>
            )}
          </Text>
        </HStack>
      </Flex>
      {searchResults.length > 0 && (
        <Box className="container">
          <Text fontSize="2xl">Search Results</Text>
          <ul>
            {searchResults.map((result) => (
              <li key={result.idMeal}>{result.strMeal}</li>
            ))}
          </ul>
        </Box>
      )}
    </Box>


  )
}

export default Header;