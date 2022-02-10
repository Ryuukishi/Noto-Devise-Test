class RemoveNoteFromTags < ActiveRecord::Migration[6.0]
  def change
    remove_reference :tags, :note, null: false, foreign_key: true
  end
end
