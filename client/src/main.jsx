import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Recipe from './pages/Recipe';
import Login from './pages/Login';
import DonationForm from './pages/DonationForm.jsx';

import ErrorPage from './pages/ErrorPage';
import SearchResultsPage from './pages/SearchResultsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/Recipe/:idMeal',
        element: <Recipe />
      }, {
        path: '/search-results',
        element: <SearchResultsPage />
      }, {
        path: '/search-results/:searchTerm',
        element: <SearchResultsPage />
      }, {
        path: '/profilepage',
        element: <ProfilePage />
      }, {
        path: '/donate',
        element: <DonationForm />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
