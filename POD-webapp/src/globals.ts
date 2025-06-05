// Application constants

export const APP_NAME = 'Pay On Demand';

export const USER_ROLES = {
  WORKER: 'worker',
  ADMIN: 'admin',
} as const;

export const REQUEST_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  DENIED: 'denied',
} as const;
