# User can create workspace, which he can then access through workspaces and own_workspaces -- PASS
# demo = User.find_by(username: "demo")

# # Create workspace, then add to current_user's workspaces
# demo_workspace1 = Workspace.new(creator_id: demo.id, name: "workspacetest1")
# demo.workspaces << demo_workspace1 # does Workspace.create then UsersWorkspace.create

# # or for Seeding
# # Create workspaces where creator == current_user.id
# demo_workspace2 = Workspace.create(creator_id: demo.id, name: "workspacetest2")
# demo_workspace3 = Workspace.create(creator_id: demo.id, name: "workspacetest2")

# # Then add them to current_users' workspaces
# demo.workspaces << demo.own_workspaces # does UsersWorkspace.create for each

# # The workspace can reference the user -- PASS
# Workspace.first.users
# Workspace.first.workspace_creator

# Users can add other users to their workspace -- PASS
# NOTE: I THOUGHT THIS WAS A BUG BUT ACTUALLY WHEN YOU TEST IN RAILS C
# YOUR VARIABLES AREN'T ALWAYS LIVE, THEY DON'T ALWAYS UPDATE TO THE CURRENT DB
# SO WHEN I TRIED TO DO DEMO.WORKSPACES, IT DIDN'T WORK, BUT
# USER.FIRST.WORKSPACES WORKED; I THINK THIS HAS TO DO WITH RAILS CACHE NOT UPDATING.
# Apparently new model instances will not always update in cache when new associations
# are made; you would either have to map the new changes to the cache or do 
# a reload!

# We want:
# @user.workspaces 

# entities: {
#   workspaces: {@user.workspaces}
#   users: {}
# }

# Workspace.includes(projects:[:tasks]).find_by(:)