class CreateWorkspaces < ActiveRecord::Migration[5.2]
  def change
    create_table :workspaces do |t|
      t.string :name, null: false
      t.text :description
      t.integer :creator_id
      t.timestamps
    end
    add_index :workspaces, [:creator_id, :name], unique: true
  end
end
