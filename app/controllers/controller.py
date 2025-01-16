from flask import render_template, jsonify, request, jsonify
from app import app
from app.services.api_service import ApiService


@app.route('/carros/marcas')
def ver_marcas_carros():
    data = ApiService.get_data("carros/marcas", {})
    if data:
        return render_template('example.html', marcas=data)
    else:
        return jsonify({"error": "Erro ao obter dados da API"}), 500
