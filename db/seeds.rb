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
demo_workspace2 = Workspace.create!(creator_id: demo.id, name: "Test Workspace", description: "You can create as many workspaces as you'd like")
demo_workspace3 = Workspace.create!(creator_id: demo.id, name: "Another Test", description: "You can create as many workspaces as you'd like")

demo.workspaces << demo.own_workspaces

# Make Test Workspaces
test_workspace1 = Workspace.create!(creator_id: test.id, name: "Testing Build", description: "")
test_workspace2 = Workspace.create!(creator_id: test.id, name: "Testing Build Again")
test.workspaces << test.own_workspaces

# Add Demo user to "Testing Build Again" users
test_workspace2.users << demo 

