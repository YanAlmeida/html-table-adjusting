from flask import Flask, url_for, render_template
import pandas as pd

app=Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/retorno")
def retornar():
    return pd.read_excel("teste.xlsx").to_json()

app.run(debug=True)