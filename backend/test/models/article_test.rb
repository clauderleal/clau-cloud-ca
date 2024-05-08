require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  test "article is not valid without a title" do
    article = Article.new(body: "Lorem ipsum", published: true)
    assert_not article.valid?
  end

  test "article is not valid without a body" do
    article = Article.new(title: "Test Article", published: true)
    assert_not article.valid?
  end

  test "article is valid with all attributes" do
    article = Article.new(title: "Test Article", body: "Lorem ipsum", published: true)
    assert article.valid?
  end

  test "article default published value" do
    article = Article.new(title: "Test Article", body: "Lorem ipsum")
    assert_not article.published?
  end
end
