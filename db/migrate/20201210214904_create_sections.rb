class CreateSections < ActiveRecord::Migration[5.2]
  def change
    create_table :sections do |t|
      t.string :name, null: false
      t.integer :order, null: false
      t.integer :project_id, foreign_key: true, null: false
      t.timestamps
    end
    add_index :sections, :project_id
  end
end
