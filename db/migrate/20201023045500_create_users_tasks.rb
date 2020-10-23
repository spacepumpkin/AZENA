class CreateUsersTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :users_tasks do |t|
      t.integer :user_id, foreign_key: true
      t.integer :task_id, foreign_key: true

      t.timestamps
    end
    add_index :users_tasks, [:user_id, :task_id], unique: true
  end
end
