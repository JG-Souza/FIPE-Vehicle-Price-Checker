from flask import render_template, jsonify, request, jsonify
from app import app
from app.services.api_service import ApiService


@app.route('/', methods=['GET', 'POST'])
def ver_marcas_carros():
    marcas = ApiService.get_data("carros/marcas", {})
    modelos = []
    marca_selecionada = None

    if request.method == 'POST':
        marca_selecionada = request.form.get("marcas")
        if marca_selecionada:
            modelos_data = ApiService.get_data(f"carros/marcas/{marca_selecionada}/modelos")
            if modelos_data and "modelos" in modelos_data:
                modelos = modelos_data["modelos"]

    return render_template(
        'example.html',
        marcas=marcas,
        modelos=modelos,
        marca_selecionada=marca_selecionada
    )


