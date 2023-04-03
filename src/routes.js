import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import PrivateComponent from './privateComponent';

import DashboardAppPage from './pages/DashboardAppPage';
import ApplicationForm from './layouts/form/form';
import UpdateApplication from './layouts/form/updateForm';
import ApplicantDetails from './layouts/form/ApplicantDetails';
import CheckboxGroup from './layouts/form/form2';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element:<PrivateComponent/>,
      children:[
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        
      ],
    },
    {
      path:'/UpdateApplication/:id',
      element:<UpdateApplication/>

    },
    {
      path:'/yash',
      element:<CheckboxGroup/>

    },
    {
      path:'/ApplicantDetails/:id',
      element:<ApplicantDetails/>

    },

    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
        {path:'ApplicationForm',element:<ApplicationForm/>}
      ],
    },
    
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]},
    {
      path: 'login',
      element: <LoginPage />,
    },
  ]);

  return routes;
}
