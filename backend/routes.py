from flask import current_app,jsonify,request
from app import create_app,db
from models import Articles,ArticlesShema


app = create_app()

article_schema = ArticlesShema()
articles_schema = ArticlesShema(many=True)

@app.route("/articles", methods=["GET"], strict_slashes=False)
def articles():

	articles = Articles.query.all()
	results = articles_schema.dump(articles)

	return jsonify(results)

@app.route("/articles/<int:article_id>/",methods=("GET", "POST"),strict_slashes=False)
def article(article_id):
    article = Articles.query.filter_by(id=article_id).first()
    return article_schema.jsonify(article)



@app.route("/add", methods=["POST"], strict_slashes=False)
def add_articles():
	title = request.json['title']
	body = request.json['body']

	article = Articles(
		title=title,
		body=body
		)

	db.session.add(article)
	db.session.commit()

	return article_schema.jsonify(article)



@app.route("/articles/update/<int:article_id>/",methods=['PUT'],strict_slashes=False)
def update_article(article_id):
    article = Articles.query.filter_by(id=article_id).first()

    title = request.json['title']
    body = request.json['body']

    article.title = title
    article.body = body

    db.session.commit()

    return article_schema.jsonify(article)


@app.route("/articles/delete/<int:article_id>/",methods=['DELETE'],strict_slashes=False)
def delete_article(article_id):
    article = Articles.query.filter_by(id=article_id).first()

    db.session.delete(article)
    db.session.commit()

    return article_schema.jsonify(article)






if __name__ == "__main__":
	app.run(debug=True)