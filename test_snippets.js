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
// const testuser = {username: "testuser", email: "test@test.com", password: "password"};
// const testuser2 = {username: "testuser2", email: "test2@test.com", password: "password"};

// window.sessionSignUp(testuser2);
// window.sessionLogin(testuser);
// window.sessionLogout();

// window.getState();
// window.dispatch(signup({username: "testuser3", email: "test3@test.com", password: "password"}))
// window.dispatch(login({ username: "testuser2", password: "password" }));
// window.dispatch(logout());

