import os
import time

import requests

from dotenv import load_dotenv
from flask import Flask, jsonify, render_template, request


# Загружаем секретные значения из файла .env
load_dotenv()


app = Flask(__name__)


# Время последней отправки
last_notification_time = 0


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/gift", methods=["POST"])
def receive_gift():
    global last_notification_time

    current_time = time.time()

    # Защита от многократных быстрых нажатий
    if current_time - last_notification_time < 30:
        return jsonify({
            "success": True,
            "already_sent": True
        })

    bot_token = os.environ.get("TELEGRAM_BOT_TOKEN")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID")

    if not bot_token or not chat_id:
        return jsonify({
            "success": False,
            "message": "Telegram не настроен"
        }), 500

    telegram_url = (
        f"https://api.telegram.org/"
        f"bot{bot_token}/sendMessage"
    )

    telegram_message = (
        "🎁 Милана нажала кнопку «Получить подарок»!\n\n"
        "Пора вручать подарок 💗"
    )

    try:
        telegram_response = requests.post(
            telegram_url,
            json={
                "chat_id": chat_id,
                "text": telegram_message
            },
            timeout=10
        )

        telegram_response.raise_for_status()

        last_notification_time = current_time

        return jsonify({
            "success": True
        })

    except requests.RequestException as error:
        print("Ошибка Telegram:", error)

        return jsonify({
            "success": False,
            "message": "Не удалось отправить сообщение"
        }), 500


if __name__ == "__main__":
    app.run(debug=True)