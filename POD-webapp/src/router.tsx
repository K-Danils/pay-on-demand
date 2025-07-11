import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { paths } from './routes';

// Lazy loaded components
const HomePage = React.lazy(() => import('./pages/home-page'));
const SignInPage = React.lazy(() => import('./pages/auth/sign-in-page'));
const OverviewPage = React.lazy(() => import('./pages/dashboard/overview-page'));
const NotFoundPage = React.lazy(() => import('./pages/errors/not-found-page'));
const DashboardLayout = React.lazy(() => import('./components/layout/dashboard-layout'));
const CompaniesPage = React.lazy(() => import('./pages/admin/companies-page'));
const CompaniesListPage = React.lazy(() => import('./pages/admin/companies/list-page'));
const CreateCompanyPage = React.lazy(() => import('./pages/admin/companies/create-page'));
const EditCompanyPage = React.lazy(() => import('./pages/admin/companies/edit-page'));
const CompanyDetailsPage = React.lazy(() => import('./pages/admin/companies/details-page'));
const CreateUserPage = React.lazy(() => import('./pages/admin/companies/create-user-page'));
const EditUserPage = React.lazy(() => import('./pages/admin/companies/edit-user-page'));
const CreateOccupationPage = React.lazy(() => import('./pages/admin/companies/create-occupation-page'));
const EditOccupationPage = React.lazy(() => import('./pages/admin/companies/edit-occupation-page'));
const PaymentRequestsListPage = React.lazy(() => import('./pages/admin/payment-requests/list-page'));

// Admin components
const AdminDashboardPage = React.lazy(() => import('./pages/admin/admin-dashboard-page'));

// Placeholder components (temporary - will be replaced with actual components)
const UsersPage = () => <div>Users Page</div>;
const OccupationsPage = () => <div>Occupations Page</div>;
const PayRequestsPage = () => <div>Pay Requests Page</div>; // For worker dashboard
const AccountPage = () => <div>Account Page</div>;
const HistoryPage = () => <div>History Page</div>;
const SettingsPage = () => <div>Settings Page</div>;
const UnauthorizedPage = () => <div>401 - Unauthorized</div>;
const ServerErrorPage = () => <div>500 - Server Error</div>;

// Single route configuration - this is our source of truth
const routeConfig: RouteObject[] = [
  // Home route
  {
    path: paths.home,
    element: <HomePage />,
  },

  // Auth routes
  {
    path: paths.auth.signIn,
    element: <SignInPage />,
  },

  // Dashboard routes (worker)
  {
    path: '/dashboard',
    element: <DashboardLayout userType="worker" />,
    children: [
      {
        index: true,
        element: <OverviewPage />,
      },
      {
        path: 'account',
        element: <AccountPage />,
      },
      {
        path: 'pay-requests',
        element: <PayRequestsPage />,
      },
      {
        path: 'history',
        element: <HistoryPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },

  // Admin routes
  {
    path: '/admin',
    element: <DashboardLayout userType="admin" />,
    children: [
      {
        index: true,
        element: <AdminDashboardPage />,
      },
      {
        path: 'dashboard',
        element: <Navigate to="/admin" replace />,
      },
      {
        path: 'companies',
        element: <CompaniesListPage />,
      },
      {
        path: 'companies/create',
        element: <CreateCompanyPage />,
      },
      {
        path: 'companies/:id',
        element: <CompanyDetailsPage />,
      },
      {
        path: 'companies/:id/edit',
        element: <EditCompanyPage />,
      },
      {
        path: 'companies/:id/users/create',
        element: <CreateUserPage />,
      },
      {
        path: 'companies/:id/users/:userId/edit',
        element: <EditUserPage />,
      },
      {
        path: 'companies/:id/occupations/create',
        element: <CreateOccupationPage />,
      },
      {
        path: 'companies/:id/occupations/:occupationId/edit',
        element: <EditOccupationPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'occupations',
        element: <OccupationsPage />,
      },
      {
        path: 'payment-requests',
        element: <PaymentRequestsListPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },

  // Error routes
  {
    path: paths.errors.notFound,
    element: <NotFoundPage />,
  },
  {
    path: paths.errors.unauthorized,
    element: <UnauthorizedPage />,
  },
  {
    path: paths.errors.serverError,
    element: <ServerErrorPage />,
  },

  // Catch-all route for 404
  {
    path: '*',
    element: <Navigate to={paths.errors.notFound} replace />,
  },
];

// Create the router
const router = createBrowserRouter(routeConfig);

// Export both the config and the router for flexibility
export { routeConfig };
export default router;
