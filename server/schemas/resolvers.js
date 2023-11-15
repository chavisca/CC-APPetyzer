const { default: mongoose } = require('mongoose');
const { User, favoriteRecipe } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'appetyzer@outlook.com',
    pass: 'groupproject!2345',
  },
});

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (_, { username }) => {
      return User.findOne({ username });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    recipeById: async (_, { idMeal }) => {
      try {
        const objectId = new mongoose.Types.ObjectId(idMeal);

        const recipe = await favoriteRecipe
          .findOne({ _id: objectId })
          .sort({ AddedOn: -1 });

        return recipe;
      } catch (error) {
        console.error("Error fetching recipe by ID:", error.message);
        throw new Error("Error fetching recipe by ID");
      }
    },
  },

  Mutation: {
    addUser: async (__, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (__, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError("Invalid email or password");
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError("Invalid email or password");
        }

        const token = signToken(user);

        return { token, user };
      } catch (error) {
        throw new Error(`Login failed: ${error.message}`);
      }
    },

    addRecipe: async (__, { idMeal }, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError(
            "You must be logged in to add a recipe"
          );
        }

        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { favorites: idMeal } },

          {
            new: true,
            runValidators: true,
          }
        );
      } catch (error) {
        console.error("Error in addRecipe resolver:", error);
      }
    },

    deleteRecipe: async (__, { idMeal }, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError(
            "You must be logged in to delete a recipe"
          );
        }
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { favorites: idMeal } },
          { new: true }
        );
      } catch (error) {
        throw new Error(`Failed to delete recipe: ${error.message}`);
      }
    },

    sendEmail: async (_, { friendName, friendEmail }) => {
      try {
        const emailOptions = {
          from: 'appetyzer@outlook.com',
          to: friendEmail,
          subject: 'Referral from Appetyzer',
          text: `Hi ${friendName},\n\nYou've been referred to Appetyzer. Check it out!\n\nBest regards,\nAppetyzer`,
        };

        
        const info = await transporter.sendMail(emailOptions);
        console.log('Referral email sent:', info);

        return 'Email sent successfully';
      } catch (error) {
        console.error('Error sending referral email:', error);
        throw new Error('Failed to send email');
      }
    },

    donate: async (_, { token, amount }) => {
      try {
      const charge = await stripe.charges.create({
        amount,          
        currency: 'usd', 
        source: token,   
        description: 'Donation to Appetyzer, Thank You for Keeping Helping Us Maintain this App', 
      });

      console.log('Stripe charge:', charge);

      const success = true;
      const message = 'Donation successful';

      return { success, message };
    } catch (error) {
      console.error('Error processing donation:', error);

      return { success: false, errorMessage: 'Error processing donation' };
      }
    }
  },
};

module.exports = resolvers;
