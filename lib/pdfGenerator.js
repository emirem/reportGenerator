const fs = require('fs');
const request = require('request');
const PdfPrinter = require('pdfmake');

// PDF config
const PDFConfig = require('../config/pdfConfig.js');

const fonts = {
  Roboto: {
    normal: 'assets/fonts/Roboto-Regular.ttf',
    medium: 'assets/fonts/Roboto-Medium.ttf',
    bold: 'assets/fonts/Roboto-Bold.ttf',
    italics: 'assets/fonts/Roboto-Italic.ttf',
    bolditalics: 'assets/fonts/Roboto-MediumItalic.ttf'
  }
};

const formatNumber = number => {
  // return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(number);
  return Number(number).toLocaleString('en-IN');
};

const garbageCollection = () => {
  console.log(`
      ----------------------------
         Deleting unused files...
      ----------------------------
  `);
  fs.unlinkSync('results/logo.png');
  fs.unlinkSync('results/chart_1.png');
  // fs.unlinkSync('results/chart_2.png');
  console.log(`
      ----------------------------
                 Done.
      ----------------------------
  `);
};

const download = (uri, filename, callback) => {
  request.head(uri, () => request(uri).pipe(fs.createWriteStream(filename)).on('close', callback));
};

const prepareData = (firstDataObject, lastDataObject, values) => {
  const viewersTotal = values
    .map(({ viewers }) => viewers)
    .reduce((total, current) => total = total + current, 0);
  const avgViewers = viewersTotal / (values.length - 1);
  const maxViewers = Math.max.apply(Math, values.map(({ viewers }) => viewers));
  const { name, followers, partner, views, created_at } = firstDataObject

  // Duration calc
  const date1 = new Date(lastDataObject.timestamp);
  const date2 = new Date(created_at);
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600));

  return {
    name,
    views,
    partner,
    maxViewers,
    duration: diffDays,
    initialFollowers: followers,
    followers: lastDataObject.followers,
    avgViewers: Math.round(avgViewers * 100) / 100
  };
};

const fillDocument = (
  {
    name,
    views = 0,
    duration = 0,
    followers = 0,
    avgViewers = 0,
    maxViewers = 0,
    partner = false,
    initialFollowers = 0,
  }
) => {
  PDFConfig.content[0].table.body[1][1].text = name.toUpperCase(); // channel name
  PDFConfig.content[0].table.body[1][2].image = 'results/logo.png'; // channel logo
  PDFConfig.content[0].table.body[1][4].text = new Date().toLocaleDateString(); // report date
  PDFConfig.content[0].table.body[2][1].text = formatNumber(followers); // follower count
  PDFConfig.content[0].table.body[2][4].text = partner ? 'Partnered' : 'Not partnered'; // partner status
  PDFConfig.content[0].table.body[3][1].text = formatNumber(views); // total views
  PDFConfig.content[0].table.body[3][4].text = 1; // report number

  // PDFConfig.content[1].image; // first chart url

  const multiple = duration.toString().charAt(duration.length - 1) !== '1';

  PDFConfig.content[2].columns[1].text = `${duration}hr${multiple ? 's' : ''} \n\n ${followers - initialFollowers}`; // `${duration} \n\n ${followers}` // durationNewFollowers

  PDFConfig.content[2].columns[3].text = `${formatNumber(avgViewers)} \n\n ${formatNumber(maxViewers)}` //avgViewersmaxViewers

  // PDFConfig.content[3].image; // second chart url

  return PDFConfig;
};

const generatePDF = (data, values) => {
  const firstDataObject = data[Object.keys(data)[0]];
  const lastDataObject = data[Object.keys(data)[Object.keys(data).length - 1]];

  download(firstDataObject.logo, 'results/logo.png', () => {
    const config = fillDocument(prepareData(firstDataObject, lastDataObject, values));
    const printer = new PdfPrinter(fonts);
    const pdfDoc = printer.createPdfKitDocument(config);

    pdfDoc.pipe(fs.createWriteStream('results/document.pdf'));
    pdfDoc.end();
    console.log(`
      ----------------------------
            Document generated.
      ----------------------------
    `);

    garbageCollection();
  });
};

module.exports = generatePDF;