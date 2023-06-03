from flask import Flask, request, jsonify, render_template
from nltk.sentiment import SentimentIntensityAnalyzer

import os

import nltk
nltk.data.path.append('./nltk_data/')

app = Flask(__name__,template_folder='./template')
sia = SentimentIntensityAnalyzer()

@app.route('/',methods=['POST'])
def sentiment():
    # get the input sentences from the request body
    sentences = request.json['sentences']
    #now, scores list that contain outputs
    scores = []
    # calculate the sentiment score for each sentence
    for sentence in sentences:
        score = sia.polarity_scores(sentence)
        scores.append(score)
    # return the sentiment scores as a JSON object
    return jsonify(scores)

@app.route('/test', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        text = request.form['text']
        score = sia.polarity_scores(text)
        return jsonify(score)
    else:
        return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True)