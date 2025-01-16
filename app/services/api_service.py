import requests


class ApiService:
    BASE_URL = 'https://parallelum.com.br/fipe/api/v1'

    @staticmethod
    def get_data(endpoint, params=None):
        try:
            response = requests.get(f"{ApiService.BASE_URL}/{endpoint}", params=params)
            response.raise_for_status() # Levanta exceção se status != 200
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Erro ao acessar a API: {e}")
            return None


# Uma aplicação web para saber o valor de um veículo de acordo com a tabela fipe
