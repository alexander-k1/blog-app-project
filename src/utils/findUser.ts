export default function findUser(username: string) {
  let storageUsers = window.sessionStorage.getItem('__users__')
  if (storageUsers) {
    let parsedStorageUsers = JSON.parse(storageUsers)
    let existingUser = parsedStorageUsers.find(
      (user: { username: string; userId: number }) => user.username === username
    )
    if (existingUser) return existingUser
    return null
  } else {
    return null
  }
}
