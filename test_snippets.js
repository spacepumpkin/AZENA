// BACKEND SESSION
// signup--
// $.ajax({url: "api/users", method: "POST", data: {user: {username: "testuser", email: "test@test.com", password: "password"}}})

// signin--
// $.ajax({url: "api/session", method: "POST", data: {user: {username: "testuser", password: "password"}}}).then((user) => console.log(user))

// signout--
// $.ajax({url: "api/session", method: "DELETE"})

// show--
// $.ajax({url: "api/users/1", method: "GET"})

// FRONTEND SESSION
// window.getState();
// window.dispatch(login({username: "testuser", password: "password"}))
// window.getState();

