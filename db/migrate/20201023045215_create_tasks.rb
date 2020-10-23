class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :name, null: false
      t.text :description
      t.datetime :due_date
      t.integer :project_id, foreign_key: true, null: false
      t.integer :creator_id, foreign_key: true, null: false

      t.timestamps
    end
  end
end
