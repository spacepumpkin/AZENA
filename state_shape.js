let sampleState =

{
  entities: {
    workspaces: {
      1: {
        id: 1,
        name: "Engineering",
        description: "",
      },
      2: {
        id: 2,
        name: "The Go-Getters",
        description: "Getting things done. Fast.",
      },
    },
    projects: {
      5: {
        id: 5,
        name: "CentOS Integration",
        description: "Integrate all servers with CentOS",
        workspaceId: 1
      },
      85: {
        id: 85,
        name: "Go-Getter App Frontend",
        description: "Developing the frontend of our fantastic app",
        workspaceId: 2
      },
      101: {
        id: 101,
        name: "Go-Getter App Backend",
        description: "Developing the backend of our fantastic app",
        workspaceId: 2
      },
    },
    users: {
      13: {
        id: 13,
        username: "Julia-Go-Getter",
        email: "julia@gogetters.com",
      },
      42: {
        id: 42,
        username: "Ryan-Go-Getter",
        email: "ryan@gogetters.com",
      }
    },
    tasks: {
      73: {
        id: 73,
        name: "implement user sign up form",
        dueDate: "2020-10-31",
        description: "add user sign up form to frontend",
        priority: "",
        status: "",
        projectId: 85,
      },
      231: {
        id: 231,
        name: "implement user login form",
        dueDate: "2020-11-05",
        description: "",
        priority: "high",
        status: "on track",
        projectId: 85,
      },
      582: {
        id: 582,
        name: "implement user authentication",
        dueDate: "2020-10-29",
        description: "user needs to be able to login and maintain session",
        priority: "",
        status: "at risk",
        projectId: 101,
      },
    },
    usersTasks: {
      2: {
        id: 2,
        userId: 13,
        taskId: 582,
      },
      4: {
        id: 4,
        userId: 42,
        taskId: 73,
      },
    },
    usersProjects: {
      1: {
        id: 1,
        userId: 13,
        projectId: 85,
      },
      2: {
        id: 2,
        userId: 13,
        projectId: 101,
      },
    },
    usersWorkspaces: {
      1: {
        id: 1,
        userId: 13,
        workspaceId: 2,
      },
      2: {
        id: 2,
        userId: 42,
        workspaceId: 2,
      }
    }
  },
  ui: {
    loading: true,
  },
  errors: {
    login: ["Incorrect username/password combination"],
    signup: ["Username already taken", "Password must be at least 6 characters"],
    taskForm: ["Task must have a name and due date"],
  },
  session: {
    currentUserId: 42,
  },
};
