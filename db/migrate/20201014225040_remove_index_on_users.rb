class RemoveIndexOnUsers < ActiveRecord::Migration[5.2]
  def change
    remove_index :users, :username
  end
end
