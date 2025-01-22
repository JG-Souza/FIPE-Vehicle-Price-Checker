from flask import render_template, jsonify
from app import app
from app.services.api_service import ApiService


@app.route('/')
def home():
    # Inicializa sem carregar marcas, pois dependerão do tipo de veículo selecionado
    return render_template('index.html')


@app.route('/<veiculo>/marcas')
def obter_marcas(veiculo):
    # Busca as marcas com base no tipo de veículo
    marcas = ApiService.get_data(f"{veiculo}/marcas", {})
    if marcas:
        return jsonify(marcas)
    else:
        return render_template('erro.html')


@app.route('/<veiculo>/marcas/<marca_codigo>/modelos')
def obter_modelos(veiculo, marca_codigo):
    # Busca os modelos de uma marca específica
    modelos_data = ApiService.get_data(f"{veiculo}/marcas/{marca_codigo}/modelos")
    if modelos_data and "modelos" in modelos_data:
        return jsonify(modelos_data["modelos"])
    else:
        return render_template('erro.html')


@app.route('/<veiculo>/marcas/<marca_codigo>/modelos/<modelo_codigo>/anos')
def obter_anos(veiculo, marca_codigo, modelo_codigo):
    # Busca os anos de um modelo específico
    anos_data = ApiService.get_data(
        f"{veiculo}/marcas/{marca_codigo}/modelos/{modelo_codigo}/anos"
    )
    if anos_data:
        return jsonify(anos_data)
    else:
        return render_template('erro.html')


@app.route('/<veiculo>/marcas/<marca_codigo>/modelos/<modelo_codigo>/anos/<ano_codigo>')
def obter_valor_veiculo(veiculo, marca_codigo, modelo_codigo, ano_codigo):
    # Faz a requisição para obter o valor do veículo
    valor_data = ApiService.get_data(
        f"{veiculo}/marcas/{marca_codigo}/modelos/{modelo_codigo}/anos/{ano_codigo}"
    )
    if valor_data:
        return jsonify(valor_data)
    else:
        return render_template('erro.html')



