from flask import Flask, render_template, redirect, jsonify
import sqlite3
from sqlite3 import Error

app = Flask(__name__)
 
database = "net_migration.sqlite"

@app.route("/")
def main():
    return render_template("index.html")

@app.route('/data')
def data():
    cursor = sqlite3.connect(database).cursor()
    cursor.execute('''select * from Migration''')
    r = [dict((cursor.description[i][0].replace("_"," "), value)
              for i, value in enumerate(row)) for row in cursor.fetchall()]
    return jsonify({'myCollection' : r})

@app.route("/states")
def names():

    cursor = sqlite3.connect(database).cursor()
    cursor.execute('''select DISTINCT `Current State` from Migration''')

    result=cursor.fetchall()
    state_list=[]
    for x in result:
        new_x=x[0]
        state_list.append(new_x)
    
    return jsonify(state_list)

@app.route("/<year>/<state>")
def detailed_data(year,state):
    cursor = sqlite3.connect(database).cursor()
    cursor.execute("select * from Migration where YEAR="+year+" AND `Current State`='"+state+"'")
    r = [dict((cursor.description[i][0].replace("_"," "), value)
              for i, value in enumerate(row)) for row in cursor.fetchall()]
    return jsonify({'myCollection' : r})

if __name__ == '__main__':
    app.run()