class AddSectionsAndOrderToTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :section_id, :integer, foreign_key: true
    add_column :tasks, :order, :integer
  end
end
