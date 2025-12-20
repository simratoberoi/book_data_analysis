from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app) 


df = pd.read_csv("bestsellers.csv")
df.drop_duplicates(inplace=True)
df.rename(columns={"Name": "Title", "Year": "Publication Year", "User Rating": "Rating"}, inplace=True)
df["Price"] = df["Price"].astype(float)

@app.route('/api/top-authors', methods=['GET'])
def get_top_authors():
    """Get top 10 authors by number of bestsellers"""
    top_authors = df["Author"].value_counts().head(10)
    result = [{"author": author, "count": int(count)} 
              for author, count in top_authors.items()]
    return jsonify(result)

@app.route('/api/genre-ratings', methods=['GET'])
def get_genre_ratings():
    """Get average rating by genre"""
    avg_genre_rating = df.groupby("Genre")["Rating"].mean()
    result = [{"genre": genre, "rating": float(rating)} 
              for genre, rating in avg_genre_rating.items()]
    return jsonify(result)

@app.route('/api/yearly-ratings', methods=['GET'])
def get_yearly_ratings():
    """Get average rating by year"""
    year_rating = df.groupby("Publication Year")["Rating"].mean().sort_index()
    result = [{"year": int(year), "rating": float(rating)} 
              for year, rating in year_rating.items()]
    return jsonify(result)

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get general statistics"""
    return jsonify({
        "max_price": float(df["Price"].max()),
        "total_books": int(len(df))
    })

@app.route('/api/all-data', methods=['GET'])
def get_all_data():
    """Get all processed data in one call (optional)"""
    return jsonify({
        "books": df.to_dict('records')
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)