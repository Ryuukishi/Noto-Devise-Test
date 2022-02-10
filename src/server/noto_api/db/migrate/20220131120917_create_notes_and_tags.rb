class CreateNotesAndTags < ActiveRecord::Migration[6.0]
  def change
    create_table :notes_tags do |t|
      t.belongs_to :note
      t.belongs_to :tag
    end
  end
end
