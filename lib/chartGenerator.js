var vega = require('vega');
var fs = require('fs');

const generateChart = (chartSpec, fileWriteCB = () => {}) => {
  const view = new vega
    .View(vega.parse(chartSpec))
    .renderer('none')
    .initialize();

  view
    .toCanvas()
    .then((canvas) => {
      console.log(`
      ----------------------------
          Writing chrat to file
      ----------------------------
      `);
      fs.writeFile(`results/${chartSpec.chartFileName}.png`, canvas.toBuffer(), fileWriteCB);
  })
  .catch((err) => {
    console.log('Error writing PNG to file:')
    console.error(err)
  });
};

module.exports = generateChart;