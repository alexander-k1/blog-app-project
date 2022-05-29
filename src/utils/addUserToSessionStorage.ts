export default function addUserToSessionStorage(
  username: string,
  userId: number
) {
  let storageUsers = window.sessionStorage.getItem('__users__')
  if (storageUsers) {
    let parsedStorageUsers = JSON.parse(storageUsers)
    let isExistingUser = parsedStorageUsers.find(
      (user: { username: string; userId: number }) => user.userId === userId
    )
    if (isExistingUser) return
    let newUsers = [...parsedStorageUsers, { username, userId }]
    window.sessionStorage.setItem('__users__', JSON.stringify(newUsers))
  } else {
    window.sessionStorage.setItem(
      '__users__',
      JSON.stringify([{ username, userId }])
    )
  }
}
