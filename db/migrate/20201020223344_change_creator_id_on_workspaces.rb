class ChangeCreatorIdOnWorkspaces < ActiveRecord::Migration[5.2]
  def change
    change_column_null :workspaces, :creator_id, false
  end
end
