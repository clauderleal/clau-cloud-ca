class ArticlesController < ApplicationController
  protect_from_forgery except: [:create, :update, :destroy]

  before_action :set_article, only: [:show, :update, :destroy]

  # GET /articles
  def index
    if params[:published].present?
      if params[:published] == "true"
        @articles = Article.where(published: true)
      elsif params[:published] == "false"
        @articles = Article.where(published: false)
      else
        @articles = Article.all
      end
    else
      @articles = Article.all
    end

    render json: @articles
  end

  #GET /articles/:id
  def show
        render json: @article
  end

  # POST /articles
  def create
    @article = Article.new(article_params)
    if @article.save
      render json: @article, status: :created
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end

  # PUT /articles/:id
  def update
    if @article.update(article_params)
      render json: @article
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end

  # DELETE /articles/:id
  def destroy
    @article.destroy
    head :no_content
  end

  private

  def set_article
    @article = Article.find(params[:id])
  end

  def article_params
    params.require(:article).permit(:title, :body, :published)
  end
end

