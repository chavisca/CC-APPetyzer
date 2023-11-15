import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

import {
    Box,
    SimpleGrid,
    Stack,
    Divider,
    Text,
    Image,
    Card,
    CardBody,
    CardFooter,
    Link as ChakraLink,
} from "@chakra-ui/react";





const ProfilePage = () => {
    const { loading, data } = useQuery(QUERY_ME);
    const [myMeals, setMyMeals] = useState([]);

    const fetchMyMeals = async () => {
        try {
            let myMealsArray = [];
            await Promise.all(
                data.me.favorites.map(async (favId) => {
                    const recipeUrl = `https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${favId}`;
                    const response = await fetch(recipeUrl);

                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        myMealsArray.push(data.meals[0]);
                    }
                }));
            setMyMeals(myMealsArray);
        } catch (error) {
            console.error("Error fetching meals:", error);
        }
    };
    useEffect(() => {

        if (data && !loading) {
            console.log(data);
            fetchMyMeals();
        };
    }, [data]);



    return (
        <Box bg="brand.gray" pt={12} pb={12}>
            < Text fontSize='3xl' fontWeight='bold' fontFamily='Josefin Sans,sans-serif' pl={4}>My Account
                <br></br>
                {!loading && data && (
                    <span fontSize="2xl" as="em" color='brand.black'>
                        My Username: {data.me.username}
                    </span>
                )}
                <br></br>
                <span fontSize="2xl" as="em" color='brand.black'>
                    My Email: {Auth.getProfile().data.email}!
                </span>
                <br></br>
                <br></br>

            </Text >
            <SimpleGrid columns={[1, 2, 4, 5]} spacing={4}>
                {myMeals.map((favMeal, index) => (
                    <Card
                        key={index}
                        maxW="300px"
                        mx="auto"
                        mb={1}
                        border="3px"
                        borderColor="gray.300"
                        borderRadius="lg"
                        p={2}
                        bg="brand.blue"
                    >
                        <Link to={`/recipe/${favMeal.idMeal}`}>
                            <Image
                                src={favMeal.strMealThumb}
                                alt={favMeal.strMeal}
                                borderRadius="lg"
                            />
                        </Link>
                        <CardBody>
                            <Stack mt="6" spacing="3">
                                <Text fontSize="3xl" align="center" color="brand.black" as="u">
                                    {favMeal.strMeal}
                                </Text>
                                <Text color="green.600" fontSize="2xl" align="center">
                                    {favMeal.strCategory}
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
                                href={favMeal.strYoutube}
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
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default ProfilePage;
