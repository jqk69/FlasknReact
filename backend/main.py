from flask import Flask,request,jsonify
from flask_cors import CORS

app=Flask(__name__)
cors=CORS(app)

items=[]
next_id=1

@app.route("/items",methods=["GET"])
def home():
    return jsonify(items)

@app.route("/items",methods=["POST"])
def add_items():
    global next_id
    data=request.get_json()
    data["id"]=next_id
    next_id+=1
    items.append(data)
    return jsonify({"message":"Successfully added"}),201

@app.route("/items/<int:id>",methods=["PUT"])
def update_items(id):
    data=request.get_json()
    if(0<=id<len(items)):
        items[id]=data
        return jsonify({"message":"Success"})
    return jsonify({"message":"Item not found"}),404

@app.route("/items/<int:id>",methods=["DELETE"])
def delete_items(id):
    if(0<=id<len(items)):
        items.pop(id)
        return jsonify({"message":"Success"})
    return jsonify({"message":"Item not found"}),404
    

if __name__ =="__main__":
    app.run(debug=True)
