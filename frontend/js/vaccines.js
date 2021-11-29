var objJson = [];

const URL = `https://caroline-vacinacao-api.herokuapp.com/vaccines`;

function getVaccine() {
  fetch(URL)
    .then((resposta) => resposta.json())
    .then((data) => preencherDados(data))
    .catch((erro) => console.error(erro));
}

getVaccine();

function favoriteVaccine() {}

var listing_table = document.getElementById("tabela-lista-corpo");

listing_table.innerHTML = "";

function preencherDados(lista) {
  lista.forEach((element, index) => {
    let linha = document.createElement("tr");
    let itemDaLinhaId = document.createElement("td");
    itemDaLinhaId.innerText = element.id;
    let itemDaLinhaNome = document.createElement("td");
    itemDaLinhaNome.innerText = element.name;
    let itemDaLinhaDataPrevista = document.createElement("td");
    itemDaLinhaDataPrevista.innerHTML = element.expected_date;
    let itemDaLinhaVacinado = document.createElement("td");
    itemDaLinhaVacinado.innerHTML = element.vaccinated;
    let itemDaLinhaFavorite = document.createElement("td");

    const buttonFav = document.createElement("button");
    buttonFav.addEventListener("click", function () {
      fetch(`${URL}/${element.id}/favorite`, {
        method: "PATCH",
        body: JSON.stringify({ favorite: !element.favorite }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resposta) => {
          resposta.json();
        })
        .then((data) => window.location.reload())
        .catch((erro) => console.error(erro));
    });

    linha.appendChild(itemDaLinhaId);
    linha.appendChild(itemDaLinhaNome);
    linha.appendChild(itemDaLinhaDataPrevista);
    linha.appendChild(itemDaLinhaVacinado);
    listing_table.appendChild(linha);
  });
}
