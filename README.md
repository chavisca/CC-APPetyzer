# APPetyzer - Project 3
## Description

This project is meant to demonstrate the application of the MERN stack in creating a single-page application from the ground up using agile development methodologies.  This includes storing the code in GitHub, managing with a project management tool (Excalidraw), and using Git branch workflows for features and bug requests.  Requirements included using JWT user authentication, a MongoDB back end, a GraphQL API, and Express.js and Node.js server with a React front-end.  Queries and Mutations were necessary for retrieving, adding, deleting, and updating data, and the polished, finished product is to be deployed to Heroku.  Of course, responsiveness and interactivity were required as well.  Going beyond, the team chose to exercise styling via Chakra UI and implementing the Stripe payment platform as an additional optional exercise, since the team chose not to develop an eCommerce site.  

The APPetyzer app was created to encompass all of the requirements as an application that accepts user input to search for a recipe by ingredient, as well as by offering a random selection of meals upfront to pique user interest.  The base UI includes cards with an image of the meal, the name of the meal, and a link to the related Youtube video instructions.  Clicking on the meal image takes the user to a recipe page that details the ingredient list and instructions, provides yet another link to the related Youtube video, and has a heart icon to save the recipe as a favorite to the user's profile.  A Refer-a-friend function was added, as well as a donation button, and links to the profile pages for the individual team members.  

## Future Development  
There is a plethora of opportunity regarding future development based on the original brainstorming session for the application.  Such ideas were tabled in the interest of having a fully functional platform in relation to the time constraints, but I will list the prominent ideas here, should any contributors wish to add to the work:  
- Feature: UI Selector page to allow users to search multiple ingredients as criteria for their meal
- Feature: Form/functionality to create/remove new recipes created by user to add to database
- Feature: Refer-a-friend allows for linkage to direct recipe instead of site base URL.
- Feature: Ability to find other meals when reviewing recipe card to find "others-like-it"
- Feature: RSS Feed/email subscription for "Meal of the Day"
- Feature: Implement comments section for each recipe so users can share thoughts

## Credits
Credit to the teachers and TA staff and UNC for the knowledge provided via the bootcamp, along with our base code used for the auth.js and related files.  

Credit to the MealDB for creating the api used in our project and for mirroring our passion for food.  

Credit to the APPetyzer team - Charles Chavis, Donald Leon, Ricky Carter, and Robert Campbell Van Vliet II, for the extra hours and commitment to not just a working product, but an exhibition of everything we've learned so far, with an injection of ambition to go above the minimum requirements to showcase our capabilities by creating an application that we call all be proud of.  It deserve additional mention that after the failures this same team experience with Project 2, and given the choice to select their own teams for this project, the APPetyzer team decided to regroup and conquer the previous shortcomings rather than go their separate ways, a testament to their belief in one another, the team dynamic, and their resilience.

## License
This was created using the MIT License for educational purposes only.  

## Tests  
Multiple tests were run to achieve the displayed styling, as well as testing for functionality and responsiveness.  
Testing was performed on the login process, site flow, and each component/page for expected and desired output.  
GraphQL testing via Apollo was also necessary to ensure that the database queries and mutations were operating as expected for the favorite function.  


## Link to Deployed Application
https://appetyzer-a23045d116f7.herokuapp.com/

## Link to Github
https://github.com/BaBread/APPetyzer

## Screenshot

![Screenshot_of_the_Appetyzer](/assets/images/Screenshot.jpg)