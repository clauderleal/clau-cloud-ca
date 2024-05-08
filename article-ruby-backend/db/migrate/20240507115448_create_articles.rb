class CreateArticles < ActiveRecord::Migration[7.1]
  def change
    create_table :articles do |t|
      t.string :title
      t.string :body
      t.boolean :published

      t.timestamps
    end
  end
end
