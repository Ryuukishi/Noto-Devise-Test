class NoteTagsController < ApplicationController
  def index
    @noteTags = NoteTag.all
    render json: @noteTags
  end
end
