import { render, screen } from '@testing-library/react'
import { AuthContext } from '../auth-context'
import AuthenticatedApp from '../authenticated/AuthenticatedApp'
import userEvent from '@testing-library/user-event'
function getRenderResult() {
  const view = render(
    <AuthContext.Provider
      value={{
        user: { username: 'john doe', userId: '007' },
        login: (username: string) => null,
        logout: () => null,
      }}
    >
      <AuthenticatedApp />
    </AuthContext.Provider>
  )
  return view
}
describe('Unauthed app', () => {
  test('it renders authed app with a link to create new posts', async () => {
    render(
      <AuthContext.Provider
        value={{
          user: { username: 'john doe', userId: '007' },
          login: (username: string) => null,
          logout: () => null,
        }}
      >
        <AuthenticatedApp />
      </AuthContext.Provider>
    )
    expect(
      screen.getByRole('link', {
        name: /log out/i,
      })
    ).toBeInTheDocument()
    const newPostLink = screen.getByRole('link', {
      name: /new post/i,
    })
    expect(newPostLink).toBeInTheDocument()
    //go to new post page
    userEvent.click(newPostLink)
    expect(
      await screen.findByRole('heading', {
        name: /new post/i,
      })
    ).toBeInTheDocument()
    expect(await screen.findByText(/title/i)).toBeInTheDocument()
    expect(await screen.findByText(/^post$/i)).toBeInTheDocument()
    const titleInput = screen.getByRole('textbox', {
      name: /title/i,
    })
    const postBodyInput = screen.getByRole('textbox', {
      name: /post/i,
    })
    //create a new post
    await userEvent.type(titleInput, 'New post title')
    await userEvent.type(postBodyInput, 'New post text')
    expect(titleInput).toHaveValue('New post title')
    expect(postBodyInput).toHaveValue('New post text')
    //return to home page
    await userEvent.click(screen.getByRole('link', { name: /home/i }))
  })
  test('it allows to read posts and add comments', async () => {
    render(
      <AuthContext.Provider
        value={{
          user: { username: 'john doe', userId: '007' },
          login: (username: string) => null,
          logout: () => null,
        }}
      >
        <AuthenticatedApp />
      </AuthContext.Provider>
    )
    //list of authors with 2 test names
    expect(
      await screen.findByRole('heading', {
        name: /authors/i,
      })
    ).toBeInTheDocument()
    expect(await screen.findAllByRole('article')).toHaveLength(2)
    //select a user
    const testUser = await screen.findByText(/john doe/i)
    await userEvent.click(testUser)
    //select a post
    const testPost = await screen.findByText(/post with id 99/i)
    await userEvent.click(testPost)
    expect(
      await screen.findByRole('heading', {
        name: /leave a comment/i,
      })
    ).toBeInTheDocument()
    const commentTitle = screen.getByRole('textbox', {
      name: /title/i,
    })
    const commentBody = screen.getByRole('textbox', {
      name: /comment/i,
    })
    //create a new comment
    await userEvent.type(commentTitle, 'New comment title')
    await userEvent.type(commentBody, 'New comment text')
    expect(commentTitle).toHaveValue('New comment title')
    expect(commentBody).toHaveValue('New comment text')
  })
})
