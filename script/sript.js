window.onload = function () {
  buscarDados();
};
function buscarDados() {
  $.ajax({
    method: "POST",
    url: "https://studiopowerstrong.000webhostapp.com/climatempo.php",
    dataType: "json",
    //data: { acao: "setByCity", idCidade: 5136, token: "346557c402363dca608d1e94753834de" }
    data: {
      acao: "getByCity",
      idCidade: 5136,
      token: "346557c402363dca608d1e94753834de",
    },
  })
    .done(function (data) {
      // console.log(data);

      montarDados(data);
    })
    .fail(function (jqXHR, textStatus, msg) {
      console.log(jqXHR);
      console.log(textStatus);
      alert(msg);
    });
}

function montarDados(data) {
  let temperature = document.getElementById("temperature");
  let windDirection = document.getElementById("wind_direction");
  let windVelocity = document.getElementById("wind_velocity");
  let condition = document.getElementById("condition");
  let sensation = document.getElementById("sensation");
  let humidity = document.getElementById("humidity");
  let descricao = document.getElementById("descricao");
  let fundo = document.getElementById("fundo");

  temperature.innerText = data.data.temperature + "º";
  windDirection.innerText = data.data.wind_direction;
  windVelocity.innerText = data.data.wind_velocity + "km";
  condition.innerText = data.data.condition;
  sensation.innerText = data.data.sensation + "º";
  humidity.innerText = data.data.humidity + "%";

  //sol
  if (data.data.icon === "1") {
    fundo.setAttribute("class", "fundoSol");
    descricao.innerText = "Ensolarado";
  }

  // Noite sem nuvens
  if (data.data.icon === "1n") {
    fundo.setAttribute("class", "fundoNoiteSemNuvens");
    descricao.innerText = "Noite Limpa";
  }

  // //Sol com algumas nuvens ou Sol com algumas nuvens
  if (data.data.icon === "2" || data.data.icon === "2r") {
    fundo.setAttribute("class", "fundoDiaComNuvens");
    descricao.innerText = "Nublado";
  }

  //Noite com algumas nuvens ou Noite com muitas nuvens
  if (data.data.icon === "2n" || data.data.icon === "2nr") {
   
    fundo.setAttribute("class", "fundoNoiteComNuvens");
    descricao.innerText = "Noite Nublada";
  }

  //Nublado
  if (data.data.icon === "3") {
    fundo.setAttribute("class", "fundoNublado");
    descricao.innerText = "Nublado";
  }

  //Sol e chuva
  if (data.data.icon === "4" || data.data.icon === "4r") {
    fundo.setAttribute("class", "fundoNublado");
    descricao.innerText = "Chuvoso";
  }
  // // Sol com muitas nuvens e chuva
  // if (data.data.icon === "4r") {
  // }

  //Noite chuvosa
  if (data.data.icon === "4n") {
    fundo.setAttribute("class", "fundoNoiteComChuva");
    descricao.innerText = "Chuvoso";
  }

  // // nublada e chuvosa
  if (data.data.icon === "4rn") {
    fundo.setAttribute("class", "fundoNoiteComChuva");
    descricao.innerText = "Chuvosa";
  }

  // Sol entre nuvens e pancadas de chuva, com trovoadas
  if (data.data.icon === "4t") {
    fundo.setAttribute("class", "fundoNublado");
    descricao.innerText = "Tempestade";
  }

  // Pancadas de chuva durante a noite
  if (data.data.icon === "4tn") {
    fundo.setAttribute("class", "fundoNoiteComChuva");
    descricao.innerText = "Chuvosa";
  }

  // Chuvoso
  if (data.data.icon === "5") {
    fundo.setAttribute("class", "fundoNoiteComChuva");
    descricao.innerText = "Chuvoso";
  }

  // e trovoadas
  if (data.data.icon === "6") {
    fundo.setAttribute("class", "fundoNoiteComTempestade");
    descricao.innerText = "Chuvoso";
  }

  //Geada
  if (data.data.icon === "7") {
    fundo.setAttribute("class", "fundoGeada");
    descricao.innerText = "Geada";
  }

  //Neve
  if (data.data.icon === "8") {
    fundo.setAttribute("class", "fundoNeve");
    descricao.innerText = "Neve";
  }

  //nevoeiro
  if (data.data.icon === "9") {

    fundo.setAttribute("class", "fundoNevoeiro");
    descricao.innerText = "Nevoeiro";
  }
}
