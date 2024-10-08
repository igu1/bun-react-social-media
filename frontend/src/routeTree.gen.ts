/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignupImport } from './routes/signup'
import { Route as LoginImport } from './routes/login'
import { Route as CreatepostImport } from './routes/create_post'
import { Route as AboutImport } from './routes/about'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthenticatedIndexImport } from './routes/_authenticated/index'
import { Route as AuthenticatedPostsImport } from './routes/_authenticated/posts'
import { Route as AuthenticatedLogoutImport } from './routes/_authenticated/logout'

// Create/Update Routes

const SignupRoute = SignupImport.update({
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const CreatepostRoute = CreatepostImport.update({
  path: '/create_post',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  path: '/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedPostsRoute = AuthenticatedPostsImport.update({
  path: '/posts',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedLogoutRoute = AuthenticatedLogoutImport.update({
  path: '/logout',
  getParentRoute: () => AuthenticatedRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/create_post': {
      id: '/create_post'
      path: '/create_post'
      fullPath: '/create_post'
      preLoaderRoute: typeof CreatepostImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/logout': {
      id: '/_authenticated/logout'
      path: '/logout'
      fullPath: '/logout'
      preLoaderRoute: typeof AuthenticatedLogoutImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/posts': {
      id: '/_authenticated/posts'
      path: '/posts'
      fullPath: '/posts'
      preLoaderRoute: typeof AuthenticatedPostsImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/': {
      id: '/_authenticated/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthenticatedIndexImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  AuthenticatedRoute: AuthenticatedRoute.addChildren({
    AuthenticatedLogoutRoute,
    AuthenticatedPostsRoute,
    AuthenticatedIndexRoute,
  }),
  AboutRoute,
  CreatepostRoute,
  LoginRoute,
  SignupRoute,
})

/* prettier-ignore-end */
