class CreateNotes < ActiveRecord::Migration[6.0]
  def change
    create_table :notes do |t|
      t.string :title, null: false
      t.text :description
      t.text :code
      t.boolean :public
      t.timestamps
    end
  end
end
