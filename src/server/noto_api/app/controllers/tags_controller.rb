class TagsController < ApplicationController
  before_action :set_tag_by_id, only: [:show, :update, :destroy]
  before_action :read_tags, only: [:index, :destroy]

  def index
    render json: @tags
  end
  
  def show
    render json: @tag
  end

  def create
    @tag = Tag.find_or_create_by(title: params[:title])
    render json: @tag
  end

  def update
    @tag.update(title: params[:title])
    render json: @tag
  end

  def destroy
    @tag.destroy
    render json: @tags
  end

  private
  
  def set_tag_by_id
    @tag = Tag.find(params[:id])
  end
  def read_tags
    @tags = Tag.all
  end
  def tag_params
    params.require(:tag).permit(:title)
  end
end
