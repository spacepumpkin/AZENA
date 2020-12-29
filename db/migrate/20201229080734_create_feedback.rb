class CreateFeedback < ActiveRecord::Migration[5.2]
  def change
    create_table :feedbacks do |t|
      t.string :name
      t.string :email
      t.string :improvements
      t.string :other_comments

      t.timestamps
    end
  end
end
