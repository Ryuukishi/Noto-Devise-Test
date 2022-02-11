class Note < ApplicationRecord
  has_many :note_tags
  has_many :tags, through: :note_tags
  validates :title, presence: true
  validates :description, presence: true
  validates :code, presence: true
  validates :public, presence: true  
end
