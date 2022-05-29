/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable jest/valid-expect */

describe('network requests', () => {
  it('sends requests and receives data', () => {
    //request comments
    cy.request(
      'GET',
      'https://jsonplaceholder.typicode.com/posts/1/comments'
    ).then((response) => {
      //5 comments are supposed to be returned
      expect(response.body).to.have.length(5)
      //they must have the following properties
      response.body.forEach((item) => {
        expect(item).to.have.all.keys('id', 'postId', 'name', 'email', 'body')
      })
    })

    //create a comment
    const testComment = {
      postId: 1,
      name: 'Test comment title',
      body: 'Test comment body',
    }
    cy.request(
      'POST',
      'https://jsonplaceholder.typicode.com/comments',
      testComment
    ).then((response) => {
      //created comment is returned
      expect(response.body.postId).to.equal(testComment.postId)
      expect(response.body.name).to.equal(testComment.name)
      expect(response.body.body).to.equal(testComment.body)
    })

    //create a post
    const testPost = {
      userId: 1,
      title: 'Test post title',
      body: 'Test post body',
    }
    cy.request(
      'POST',
      'https://jsonplaceholder.typicode.com/posts',
      testPost
    ).then((response) => {
      //created post is returned
      expect(response.body.userId).to.equal(testPost.userId)
      expect(response.body.title).to.equal(testPost.title)
      expect(response.body.body).to.equal(testPost.body)
    })

    //request a post
    cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/1').then(
      (response) => {
        //post must have the following properties
        expect(response.body).to.have.all.keys('id', 'userId', 'title', 'body')
      }
    )

    //request all posts by a particular user
    cy.request(
      'GET',
      'https://jsonplaceholder.typicode.com/users/1/posts'
    ).then((response) => {
      //10 posts are supposed to be returned
      expect(response.body).to.have.length(10)
      //they must have the following properties
      response.body.forEach((item) => {
        expect(item).to.have.all.keys('id', 'userId', 'title', 'body')
      })
    })

    //request a user
    cy.request('GET', 'https://jsonplaceholder.typicode.com/users/1').then(
      (response) => {
        //user object must have the following properties
        expect(response.body).to.have.all.keys(
          'id',
          'username',
          'name',
          'email',
          'address',
          'phone',
          'website',
          'company'
        )
      }
    )

    //request a list of users
    cy.request('GET', 'https://jsonplaceholder.typicode.com/users/').then(
      (response) => {
        //10 users are supposed to be returned
        expect(response.body).to.have.length(10)
        //user objects must have the following properties
        response.body.forEach((item) => {
          expect(item).to.have.all.keys(
            'id',
            'username',
            'name',
            'email',
            'address',
            'phone',
            'website',
            'company'
          )
        })
      }
    )
  })
})
