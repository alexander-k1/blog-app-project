export default function getSessionStorageUsers() {
  let storageUsers = window.sessionStorage.getItem('__users__')
  let parsedUsers: { username: string; userId: number }[] | undefined =
    undefined
  if (storageUsers) {
    parsedUsers = JSON.parse(storageUsers)
    return parsedUsers!.map((element: { username: string; userId: number }) => {
      return { username: element.username, id: element.userId }
    })
  } else {
    return null
  }
}
