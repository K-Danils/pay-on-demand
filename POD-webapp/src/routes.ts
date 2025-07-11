export const paths = {
  home: '/',
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    resetPassword: '/auth/reset-password',
  },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    payRequests: '/dashboard/pay-requests',
    history: '/dashboard/history',
    settings: '/dashboard/settings',
  },
  admin: {
    overview: '/admin',
    dashboard: '/admin/dashboard',
    companies: '/admin/companies',
    users: '/admin/users',
    occupations: '/admin/occupations',
    payRequests: '/admin/payment-requests',
    settings: '/admin/settings',
  },
  errors: {
    notFound: '/errors/not-found',
    unauthorized: '/errors/unauthorized',
    serverError: '/errors/server-error',
  },
} as const;

// Helper type to extract route paths
export type AppPaths = typeof paths;

// Flatten paths for easier access in components
export const flatPaths = {
  home: paths.home,
  signIn: paths.auth.signIn,
  signUp: paths.auth.signUp,
  resetPassword: paths.auth.resetPassword,
  dashboard: paths.dashboard.overview,
  dashboardAccount: paths.dashboard.account,
  dashboardPayRequests: paths.dashboard.payRequests,
  dashboardHistory: paths.dashboard.history,
  dashboardSettings: paths.dashboard.settings,
  admin: paths.admin.overview,
  adminDashboard: paths.admin.dashboard,
  adminCompanies: paths.admin.companies,
  adminUsers: paths.admin.users,
  adminOccupations: paths.admin.occupations,
  adminPayRequests: paths.admin.payRequests,
  adminSettings: paths.admin.settings,
  notFound: paths.errors.notFound,
  unauthorized: paths.errors.unauthorized,
  serverError: paths.errors.serverError,
} as const;
