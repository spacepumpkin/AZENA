/*
Session API Util functions with the specified parameters:

1. `signup(user)`
2. `login(user)`
3. `logout()`

*/

// create user in backend, log them in, and get user json back
export const signup = (user) => {
  console.log("posting new user");
  return $.ajax({
    url: "/api/users",
    method: "POST",
    data: { user: { username: user.username, email: user.email, password: user.password } }
  })
}

// log in user in backend and get user json back
export const login = (user) => {
  console.log("posting new session");
  return $.ajax({
    url: "/api/session",
    method: "POST",
    data: { user: { email: user.email, password: user.password } }
  })
}

// log out any current user in backend
export const logout = () => {
  console.log("deleting session");
  return $.ajax({
    url: "/api/session",
    method: "DELETE"
  })
}

// export const fetchEverything = () => {
//   console.log("fetching everything for current user");
//   return $.ajax({
//     url: `/api/everything`,
//     method: "GET"
//   })
// }

// for login
// this.state = user = {
//   email: "",
//   password: ""
// }

// State = {
//   entities: {
//     users: {
//       1: {
//         id: 1,
//         username: "test"
//         email: "test@test.com"
//       },
//     },
//   },
//   session: {
//     currentUserId: 42
//   },
// }