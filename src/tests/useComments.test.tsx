import { rest } from 'msw'
import * as React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { server } from '../setupTests'
import { createWrapper } from './utils'
import useComments from '../hooks/useComments'
describe('query hook', () => {
  test('successful query hook', async () => {
    const { result, waitFor } = renderHook(() => useComments(99), {
      wrapper: createWrapper(),
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data?.length).toBe(3)
    expect(result.current.data?.[0].name).toBe('Lorem1')
  })

  test('failure query hook', async () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    const { result, waitFor } = renderHook(() => useComments(99), {
      wrapper: createWrapper(),
    })

    await waitFor(() => result.current.isError)

    expect(result.current.error).toBeDefined()
  })
})
