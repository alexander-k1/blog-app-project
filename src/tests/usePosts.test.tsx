import { rest } from 'msw'
import { renderHook } from '@testing-library/react-hooks'
import { server } from '../setupTests'
import { createWrapper } from './utils'
import usePosts from '../hooks/usePosts'
describe('query hook', () => {
  test('successful query hook', async () => {
    const { result, waitFor } = renderHook(() => usePosts(22), {
      wrapper: createWrapper(),
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data?.length).toBe(2)
    expect(result.current.data?.[1].title).toBe('Post with id 100')
  })

  test('failure query hook', async () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    const { result, waitFor } = renderHook(() => usePosts(99), {
      wrapper: createWrapper(),
    })

    await waitFor(() => result.current.isError)

    expect(result.current.error).toBeDefined()
  })
})
