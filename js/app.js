//https://www.youtube.com/watch?v=_kqaMr2gMMI
//empleos vacantes desarrollo
//https://garajedeideas.teamtailor.com/jobs?department=Tecnolog%C3%ADa&utm_source=Youtube

Chart.defaults.color = '#fff'
Chart.defaults.borderColor = '#444'

const printCharts = () => {

    fetchCoastersData('https://coasters-api.herokuapp.com', 'https://coasters-api.herokuapp.com/country/China')
        .then(([allCoaster, nationalCoaster]) => {
            //console.log(allCoaster, nationalCoaster)
            renderModelsChart(allCoaster)
            renderFeatureChart(nationalCoaster)
            renderYearsChart(allCoaster)
            enableEventHandlers(nationalCoaster)
        })


}

const renderModelsChart = coasters => {

    const uniqueModels = [...new Set(coasters.map(coaster => coaster.model))]

    //console.log(uniqueModels.map(cuerrentModel => coasters.filter(coaster => coaster.model === cuerrentModel).length))

    const data = {
        labels: uniqueModels,
        datasets: [{
            data: uniqueModels.map(cuerrentModel => coasters.filter(coaster => coaster.model === cuerrentModel).length),
            borderColor: getDataColors(),
            backgroundColor: getDataColors(20)
        }]
    }

    const options = {
        plugins: {
            legend: { position: 'left' } //posicion de la leyenda   
        }
    }

    new Chart('modelsChart', { type: 'doughnut', data, options })
}

const renderFeatureChart = coasters => {
    const data = {
        labels: coasters.map(coaster => coaster.name),
        datasets: [{
            label: 'altura (m)',
            data: coasters.map(coaster => coaster.height),
            borderColor: getDataColors()[0],
            backgroundColor: getDataColors(20)[0]
        }]
    }
    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            r: {
                ticks: {
                    display: false,//para esconder las medidas del grafico de fondo
                }
            }
        }
    }
    new Chart('featuresChart', { type: 'radar', data, options })
}

const renderYearsChart = coasters => {
    const years = ['1998-1000', '2001-2003', '2004-2006', '2007-2009', '2013-2015', '2016-2018', '2019-2021']
    console.log(getCoastersByYear(coasters, years))
    data = {
        labels: years,
        datasets: [{
            data: getCoastersByYear(coasters, years),
            tension: 0.5,
            borderColor: getDataColors()[1],
            backgroundColor: getDataColors(20)[1],
            fill: true,
            pointBorderWidth: 15
        }]

    }

    options = {
        plugins: {
            legend: {
                display: false
            }
        },

    }

    new Chart('yearsChart', { type: 'line', data, options })
}
printCharts()