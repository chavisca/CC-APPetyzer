const typeDefs = `
  type User {
    _id: ID
    favorites: [String]!
    username: String
    email: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
    
  }


type Recipe {
  idMeal: String
}

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    recipeById(idMeal: ID!): Recipe
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addRecipe(idMeal: String!): User
    deleteRecipe(idMeal: ID!): User  
    sendEmail(friendName: String!, friendEmail: String!): String
    donate(token: String!, amount: Int!): DonationResponse
  }

  type DonationResponse {
    success: Boolean!
    message: String
    errorMessage: String

  }
`;

module.exports = typeDefs;

