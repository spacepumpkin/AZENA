# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Test Users
demo = User.create!(username: "demo", email: "welcometo@azena", password: "demopass")
test = User.create!(username: "test", email: "test@test", password: "password")
boosqua = User.create!(username: "boosqua", email: "boosqua@email.com", password: "password")
cynthia = User.create!(username: "mochi", email: "mochi@email.com", password: "password")

# Make Demo Workspaces
demo_workspace1 = Workspace.create!(creator_id: demo.id, name: "My First Workspace", description: "Welcome to Azena! Try creating a new workspace and some projects")
demo_workspace2 = Workspace.create!(creator_id: demo.id, name: "Wonderful Workspace", description: "You can create as many workspaces as you'd like")
demo_workspace3 = Workspace.create!(creator_id: demo.id, name: "The Go-Getters", description: "Our team gets the go's")

demo.workspaces << demo.created_workspaces # Add all created workspaces to associated workspaces

# Make Test Workspaces
test_workspace1 = Workspace.create!(creator_id: test.id, name: "Build Testing Space", description: "This space is for testing tests that test tests")
test_workspace2 = Workspace.create!(creator_id: test.id, name: "Build Testing Space Numba 2")
test.workspaces << test.created_workspaces

test_workspace2.users << demo # Add Demo user to test's 2nd workspace's users

# Make Demo Projects
demo_workspace1_project1 = Project.create!(name: "Sleepy Project", description: "Goal: Improve Sleep", workspace_id: demo_workspace1.id, creator_id: demo.id)
demo_workspace1_project2 = Project.create!(name: "User Auth", description: "Goal: Create Secure User Auth", workspace_id: demo_workspace1.id, creator_id: demo.id)
demo_workspace1_project3 = Project.create!(name: "Backend Routes", description: "Goal: Wrangle Those API Endpoints", workspace_id: demo_workspace1.id, creator_id: demo.id)

demo_workspace2_project1 = Project.create!(name: "Wonderful Project", description: "What a wonderful project.", workspace_id: demo_workspace2.id, creator_id: demo.id)
demo_workspace3_project1 = Project.create!(name: "Go-Go Project", description: "Goal: Get >10 Go's", workspace_id: demo_workspace3.id, creator_id: demo.id)

demo.projects << demo.created_projects # Add all created projects to associated projects

# Make Test Projects
test_workspace2_project1 = Project.create!(name: "The Very First Test", description: "Testing a tasty test", workspace_id: test_workspace2.id, creator_id: test.id)

test.projects << test.created_projects # Add all created projects to associated projects
test_workspace2_project1.users << demo # Add demo to list of users

# Make Demo Tasks
workspace1_project1_task1 = Task.create!(name: "Get 8 hours of sleep", description: "sleep", due_date: "2020-10-24",project_id: demo_workspace1_project1.id, creator_id: demo.id)
workspace1_project1_task2 = Task.create!(name: "Dream of code", description: "", due_date: "2020-10-25",project_id: demo_workspace1_project1.id, creator_id: demo.id)
workspace3_project1_task1 = Task.create!(name: "DO THE THING", description: "", due_date: "2020-10-26",project_id: demo_workspace3_project1.id, creator_id: demo.id)

# demo.tasks << demo.created_tasks # Don't add created tasks to assigned tasks
