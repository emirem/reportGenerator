var vega = require('vega');
var fs = require('fs');

const generateChart = (chartSpec) => {
  const view = new vega
    .View(vega.parse(chartSpec))
    .renderer('none')
    .initialize();

  view
    .toCanvas()
    .then((canvas) => {
      console.log('Writing PNG to file...');
      fs.writeFile(`results/${chartSpec.chartFileName}.png`, canvas.toBuffer(), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
  })
  .catch((err) => {
    console.log("Error writing PNG to file:")
    console.error(err)
  });
};

module.exports = generateChart;