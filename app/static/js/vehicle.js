document.addEventListener("DOMContentLoaded", function () {
  const veiculoSelect = document.getElementById("veiculo");
  const marcasSelect = document.getElementById("marcas");
  const modelosSelect = document.getElementById("modelos");
  const anosSelect = document.getElementById("anos");
  const valorVeiculo = document.getElementById("valor-veiculo");

  // Preenche um dropdown com opções baseadas em um array de objetos
  const preencherDropdown = (selectElement, items, placeholder) => {
    selectElement.innerHTML = `<option value="" disabled selected>${placeholder}</option>`;
    items.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.codigo;
      option.textContent = item.nome || item.anoModelo;
      selectElement.appendChild(option); // entenedr o que essa linha faz
    });
  };

  // Limpa todas as opções de um dropdown e define um placeholder quando dependências anteriores mudam (por exemplo, ao escolher outro veículo, limpa as marcas, modelos e anos)
  const limparDropdown = (selectElement, placeholder) => {
    selectElement.innerHTML = `<option value="" disabled selected>${placeholder}</option>`;
  };

  // Faz uma requisição GET para a URL especificada e, ao receber os dados, preenche o dropdown
  const carregarDados = async (url, selectElement, placeholder) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      preencherDropdown(selectElement, data, placeholder);
    } catch (error) {
      limparDropdown(selectElement, "Erro ao carregar dados");
    }
  };

  //Os eventos de change são adicionados a cada dropdown para carregar os próximos dados com base na seleção atual

  // Quando o veículo é selecionado, limpa os dropdowns dependentes (marcas, modelos, anos) e busca as marcas disponíveis para o veículo selecionado.
  veiculoSelect.addEventListener("change", () => {
    const veiculo = veiculoSelect.value;
    if (veiculo) {
      limparDropdown(marcasSelect, "Carregando marcas...");
      limparDropdown(modelosSelect, "Selecione um modelo");
      limparDropdown(anosSelect, "Selecione um ano");
      valorVeiculo.textContent =
        "Selecione todas as opções acima para ver o valor.";
      carregarDados(`/${veiculo}/marcas`, marcasSelect, "Selecione uma marca");
    }
  });

  marcasSelect.addEventListener("change", () => {
    const veiculo = veiculoSelect.value;
    const marcaCodigo = marcasSelect.value;
    if (veiculo && marcaCodigo) {
      limparDropdown(modelosSelect, "Carregando modelos...");
      limparDropdown(anosSelect, "Selecione um ano");
      valorVeiculo.textContent =
        "Selecione todas as opções acima para ver o valor.";
      carregarDados(
        `/${veiculo}/marcas/${marcaCodigo}/modelos`,
        modelosSelect,
        "Selecione um modelo"
      );
    }
  });

  modelosSelect.addEventListener("change", () => {
    const veiculo = veiculoSelect.value;
    const marcaCodigo = marcasSelect.value;
    const modeloCodigo = modelosSelect.value;
    if (veiculo && marcaCodigo && modeloCodigo) {
      limparDropdown(anosSelect, "Carregando anos...");
      valorVeiculo.textContent =
        "Selecione todas as opções acima para ver o valor.";
      carregarDados(
        `/${veiculo}/marcas/${marcaCodigo}/modelos/${modeloCodigo}/anos`,
        anosSelect,
        "Selecione um ano"
      );
    }
  });

  anosSelect.addEventListener("change", async () => {
    const veiculo = veiculoSelect.value;
    const marcaCodigo = marcasSelect.value;
    const modeloCodigo = modelosSelect.value;
    const anoCodigo = anosSelect.value;

    if (veiculo && marcaCodigo && modeloCodigo && anoCodigo) {
      valorVeiculo.textContent = "Carregando valor...";
      try {
        const response = await fetch(
          `/${veiculo}/marcas/${marcaCodigo}/modelos/${modeloCodigo}/anos/${anoCodigo}`
        );
        const data = await response.json();

        if (data && data.Valor) {
          valorVeiculo.textContent = `O valor do veículo é ${data.Valor}.`;
        } else {
          valorVeiculo.textContent =
            "Não foi possível obter o valor do veículo.";
        }
      } catch (error) {
        console.error("Erro ao carregar valor do veículo:", error);
        valorVeiculo.textContent = "Erro ao carregar o valor do veículo.";
      }
    }
  });
});
