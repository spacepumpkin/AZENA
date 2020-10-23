class CreateProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :projects do |t|
      t.string :name, null: false
      t.text :description
      t.integer :workspace_id, foreign_key: true, null: false
      t.integer :creator_id, foreign_key: true, null: false

      t.timestamps
    end
    add_index :projects, [:workspace_id, :name], unique: true
  end
end
