import { render } from '@testing-library/react'
import { rest } from 'msw'
import * as React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthContextProvider } from '../auth-context'

export const handlers = [
  rest.get(
    'https://jsonplaceholder.typicode.com/posts/*/comments',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            postId: 99,
            id: 1001,
            name: 'Lorem1',
            email: 'mail@mail.com',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis suscipit varius. Cras sit amet urna elit. Phasellus commodo fringilla eleifend. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed et dictum nibh.',
          },
          {
            postId: 99,
            id: 1002,
            name: 'Lorem2',
            email: 'mail@mail.com',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis suscipit varius. Cras sit amet urna elit. Phasellus commodo fringilla eleifend. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed et dictum nibh.',
          },
          {
            postId: 99,
            id: 1003,
            name: 'Lorem3',
            email: 'mail@mail.com',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis suscipit varius. Cras sit amet urna elit. Phasellus commodo fringilla eleifend. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed et dictum nibh.',
          },
        ])
      )
    }
  ),
  rest.post(
    'https://jsonplaceholder.typicode.com/comments',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(req.body))
    }
  ),
  rest.post('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(req.body))
  }),
  rest.get(
    'https://jsonplaceholder.typicode.com/users/*/posts',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 99,
            userId: 1,
            title: 'Post with id 99',
            body: 'Post body',
          },
          {
            id: 100,
            userId: 2,
            title: 'Post with id 100',
            body: 'Post body',
          },
        ])
      )
    }
  ),
  rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          username: 'John Doe',
        },
        {
          id: 2,
          username: 'Jane Doe',
        },
      ])
    )
  }),
  rest.get('https://jsonplaceholder.typicode.com/users/*', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        username: 'John Doe',
      })
    )
  }),
  rest.get('https://jsonplaceholder.typicode.com/posts/*', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 99,
        userId: 1,
        title: 'Post with id 99',
        body: 'Post body',
      })
    )
  }),
]

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  })

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient()
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  )
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderUi}
        </QueryClientProvider>
      ),
  }
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient()
  return ({ children }: { children: React.ReactNode }) => (
    <AuthContextProvider>
      <QueryClientProvider client={testQueryClient}>
        {children}
      </QueryClientProvider>
    </AuthContextProvider>
  )
}
