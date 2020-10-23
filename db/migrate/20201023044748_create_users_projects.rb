class CreateUsersProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :users_projects do |t|
      t.integer :user_id, foreign_key: true
      t.integer :project_id, foreign_key: true

      t.timestamps
    end
    add_index :users_projects, [:user_id, :project_id], unique: true
  end
end
