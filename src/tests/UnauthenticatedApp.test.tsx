import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthContextProvider } from '../auth-context'
import UnauthenticatedApp from '../unauthenticated/UnauthenticatedApp'

describe('Unauthed app', () => {
  test('it renders unauthed app with a list blog authors', async () => {
    render(
      <AuthContextProvider>
        <UnauthenticatedApp />
      </AuthContextProvider>
    )
    expect(
      screen.getByRole('link', {
        name: /log in/i,
      })
    ).toBeInTheDocument()
    //list of authors with 2 test names
    expect(
      await screen.findByRole('heading', {
        name: /authors/i,
      })
    ).toBeInTheDocument()
    expect(await screen.findAllByRole('article')).toHaveLength(2)
    expect(await screen.findByText(/john doe/i)).toBeInTheDocument()
    expect(await screen.findByText(/jane doe/i)).toBeInTheDocument()
    expect(screen.queryByText(/father christmas/i)).not.toBeInTheDocument()
  })
  test('it allows to view posts and read comments', async () => {
    render(
      <AuthContextProvider>
        <UnauthenticatedApp />
      </AuthContextProvider>
    )
    const testUser = await screen.findByText(/john doe/i)
    await userEvent.click(testUser)
    expect(await screen.findAllByRole('link')).toHaveLength(2)
    const testPost = await screen.findByText(/post with id 99/i)
    await userEvent.click(testPost)
    //selected post
    expect(
      await screen.findByRole('heading', { name: /post with id 99/i })
    ).toBeInTheDocument()
    //list of 3 test comments
    expect(await screen.findByRole('list')).toBeInTheDocument()
    expect(await screen.findAllByRole('listitem')).toHaveLength(3)
  })
})
