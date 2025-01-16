function enviarValor() {
  var marcaCodigo = document.getElementById("marcas").value;

  if (marcaCodigo) {
    // URL base definida no Flask
    var urlBase = "https://parallelum.com.br/fipe/api/v1";

    // Fazendo a requisição AJAX para obter os modelos
    $.get(
      urlBase + "/carros/marcas/" + marcaCodigo + "/modelos",
      function (data) {
        console.log(data); // Verificando a resposta da API

        var modelosSelect = $("#modelos");
        modelosSelect.empty(); // Limpa os modelos atuais
        modelosSelect.append('<option value="">Selecione um modelo</option>'); // Adiciona a opção inicial

        // Verificando se "data.modelos" existe e tem dados
        if (data && data.modelos && data.modelos.length > 0) {
          // Popula o select de modelos com os dados retornados da API
          data.modelos.forEach(function (modelo) {
            modelosSelect.append(
              '<option value="' +
                modelo["codigo"] +
                '">' +
                modelo["nome"] +
                "</option>"
            );
          });
        } else {
          modelosSelect.append(
            '<option value="">Nenhum modelo disponível</option>'
          );
        }
      }
    ).fail(function () {
      alert("Erro ao carregar os modelos.");
    });
  } else {
    // Limpa os modelos caso nenhuma marca seja selecionada
    $("#modelos")
      .empty()
      .append('<option value="">Selecione um modelo</option>');
  }
}
