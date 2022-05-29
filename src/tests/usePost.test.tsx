import { rest } from 'msw'
import { renderHook } from '@testing-library/react-hooks'
import { server } from '../setupTests'
import { createWrapper } from './utils'
import usePost from '../hooks/usePost'
describe('query hook', () => {
  test('successful query hook', async () => {
    const { result, waitFor } = renderHook(() => usePost(99), {
      wrapper: createWrapper(),
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data?.id).toBe(99)
    expect(result.current.data?.title).toBe('Post with id 99')
  })

  test('failure query hook', async () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    const { result, waitFor } = renderHook(() => usePost(99), {
      wrapper: createWrapper(),
    })

    await waitFor(() => result.current.isError)

    expect(result.current.error).toBeDefined()
  })
})
