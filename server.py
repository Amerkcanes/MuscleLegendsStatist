from flask import Flask, request, jsonify

app = Flask(__name__)

# Пример данных игроков (замени на настоящие)
players_data = {
    "Player1": {"nickname": "Player1", "display_name": "CoolPlayer", "strength": 5000, "speed": 300, "durability": 1000, "kills": 10, "bad_karma": 5, "good_karma": 2, "rebirths": 3, "pets": ["Dragon", "Tiger"]},
    "Player2": {"nickname": "Player2", "display_name": "StrongDude", "strength": 7000, "speed": 500, "durability": 2000, "kills": 20, "bad_karma": 1, "good_karma": 10, "rebirths": 5, "pets": ["Wolf", "Lion"]}
}

@app.route("/player", methods=["GET"])
def get_player():
    nickname = request.args.get("nickname")
    if nickname in players_data:
        return jsonify(players_data[nickname])
    return jsonify({"error": "Player not found"}), 404

@app.route("/top", methods=["GET"])
def get_top():
    category = request.args.get("category")
    if category not in ["strength", "durability", "speed", "good_karma", "bad_karma", "kills", "rebirths", "pets"]:
        return jsonify({"error": "Invalid category"}), 400

    sorted_players = sorted(players_data.values(), key=lambda x: x[category], reverse=True)[:50]
    return jsonify(sorted_players)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)