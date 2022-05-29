import { rest } from 'msw'
import { renderHook } from '@testing-library/react-hooks'
import { server } from '../setupTests'
import { createWrapper } from './utils'
import useCreatePost from '../hooks/useCreatePost'
import { act } from 'react-dom/test-utils'

describe('query hook', () => {
  test('successful query hook', async () => {
    const { result, waitFor } = renderHook(() => useCreatePost(), {
      wrapper: createWrapper(),
    })
    act(() => {
      result.current.mutate({
        title: 'New post',
        body: 'New post text',
        id: 1001,
        userId: 99,
      })
    })
    await waitFor(() => result.current.isSuccess)

    expect(result.current.data?.id).toBe(1001)
    expect(result.current.data?.title).toBe('New post')
  })

  test('failure query hook', async () => {
    server.use(
      rest.post('*', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    const { result, waitFor } = renderHook(() => useCreatePost(), {
      wrapper: createWrapper(),
    })
    act(() => {
      result.current.mutate({
        title: 'New post',
        body: 'New post text',
        id: 1001,
        userId: 99,
      })
    })
    await waitFor(() => result.current.isError)
    expect(result.current.error).toBeDefined()
  })
})
