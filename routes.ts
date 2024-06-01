/**
 * An array of routes accessible to public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
    '/'
];

/**
 * An array of routes accessible to only non logged in users like sign or register
 * These routes do not require authentication
 * @type {string[]}
 */

export const forLoggedOutUsers = [
    '/login',
    '/register'
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = '/';