//document.getElementById("personagens").innerHTML = 22;

const personagensContador = document.getElementById("personagens");
const luasContador = document.getElementById("Luas");
const planetasContador = document.getElementById("Planetas");
const navesContador = document.getElementById("Naves");



preencherContadores();
preencherTabela();
google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(desenharGrafico);
async function desenharGrafico() {
  const response = await swapiGet('vehicles/');
  const vehiclesArray = response.data.results;
  const dataArray = [];
  dataArray.push(["Veículos", "Passageiros"]);
  vehiclesArray.forEach(vehicle => {
    dataArray.push([vehicle.name, Number(vehicle.passengers)]);
  })
  var data = google.visualization.arrayToDataTable( dataArray);

  var options = {
    title: 'Maiores veículos',
    is3D: true,
    legend: 'none'
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
  chart.draw(data, options);
}

function preencherContadores () {
    //personagensContador.innerHTML = swapiGet ("people/").count;

    Promise.all([swapiGet('people/'), 
              swapiGet('vehicles/'),
              swapiGet('planets/'),
              swapiGet('starships/')
            ]).then(function (results) {
      
      personagensContador.innerHTML = results [0].data.count;
      luasContador.innerHTML = results [1].data.count;
      planetasContador.innerHTML = results [2].data.count;
      navesContador.innerHTML = results [3].data.count;

    });

}

async function preencherTabela () {
 const response = await swapiGet ('films/');
 const tableData = response.data.results;
 tableData.forEach(film => {
 $('#filmsTable').append(`<tr>
 <td>${film.title}</td>
 <td>${moment (film.release_date).format ("DD/MM/YYYY")}</td>
 <td>${film.director}</td>
 <td>${film.episode_id}</td>
 </tr>`);
})
}

function swapiGet (param) {

return axios.get(`https://swapi.dev/api/${param}`);

}