class NotesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_note_by_id, only: [:show, :update]
  before_action :set_note_tags_and_join, only: [:destroy]
  before_action :read_notes, only: [:index, :destroy]

  def index
      render json: @notes.order("id ASC")
  end
  
  def show
    render json: @note
  end

  def create
    @note = Note.create(title: params[:title],description: params[:description], code: params[:code], public: params[:public])
    tagParams = params[:tags]
    @tags = Tag.all
    existingTagNames = []
    @tags.each do |tag|
      existingTagNames << tag.title
    end
    if (tagParams - existingTagNames).length > 0
      newTagNames = tagParams - existingTagNames
      newTagNames.each do |tag|
        newTag = Tag.create(title: tag)
      end
    end
    foundTags = []
    tagParams.each do |tag|
      foundTag = @tags.find_by(title: tag)
      foundTags << foundTag
    end
    foundTags.each do |tag|
      NoteTag.create(note_id: @note.id, tag_id: tag.id)
    end
    render json: @note
  end

  def update
    @note.update(title: params[:title],description: params[:description], code: params[:code], public: params[:public])
    render json: @note
  end

  def destroy
    @noteTagJoins.each do |join|
        join.destroy
    end
    @note.destroy
    @noteTags.each do |tag|
      if tag.notes.length === 0
        tag.destroy
      end
    end
    render json: @notes
  end

  private
  
  def set_note_by_id
    @note = Note.find(params[:id])
  end
  def set_note_tags_and_join
    @note = Note.find(params[:id])
    @noteTags = @note.tags
    @noteTagJoins = @note.note_tags
  end
  def read_notes
    @notes = Note.all
  end
  def note_params
    params.require(:note).permit(:id, :title, :description, :code, :public,:tags)
  end
end
