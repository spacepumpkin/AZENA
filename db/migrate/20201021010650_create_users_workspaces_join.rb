class CreateUsersWorkspacesJoin < ActiveRecord::Migration[5.2]
  def change
    create_table :users_workspaces do |t|
      t.references :user, foreign_key: true
      t.references :workspace, foreign_key: true
      t.timestamps
    end
  end
end
