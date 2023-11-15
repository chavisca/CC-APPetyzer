import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  Divider,
  Stack,
  SimpleGrid,
  Card,
  CardBody,
  CardFooter,
  Link as ChakraLink,
} from "@chakra-ui/react";

function SearchResultsPage() {
  const { searchTerm } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.meals || []);
      })
      .catch((error) => {
        console.error("Error with fetch request:", error);
      });
  }, [searchTerm]);

  return (
    <Box bg="brand.gray" pt={12} pb={12} w="100%">
      <SimpleGrid columns={[1, 2, 4, 5]} spacing={4} align="center">
        {searchResults.map((result) => (
          <Box key={result.id} as="article">
            <Card
              maxW="300px"
              mx="auto"
              mb={16}
              border="2px"
              borderColor="gray.300"
              borderRadius="lg"
              p={4}
              bg="brand.blue"
            >
              <Link to={`/Recipe/${result.idMeal}`}>
                <Image
                  src={result.strMealThumb}
                  alt={result.strMeal}
                  borderRadius="lg"
                />
              </Link>
              <CardBody>
                <Stack mt="6" spacing="3">
                  <Text fontSize="3xl" align="center" color="gray.800" as="u">
                    {result.strMeal}
                  </Text>
                  <Text color="green.600" fontSize="2xl" align="center">
                    {result.strCategory}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <ChakraLink
                  href={result.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  textDecoration="underline"
                  fontWeight="bold"
                  color="blue"
                  align="center"
                >
                  Video Instructions
                </ChakraLink>
              </CardFooter>
            </Card>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default SearchResultsPage;
