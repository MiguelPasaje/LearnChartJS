const enableEventHandlers = (coasters) => {
    document.querySelector('#featuresOptions').onchange = e => {

        const { value: property, text: label } = e.target.selectedOptions[0]
        console.log(property, label)

        const newData = coasters.map(coaster => coaster[property])
        console.log(newData)
        updateChartData('featuresChart', newData, label)
        //return newData

    }
}