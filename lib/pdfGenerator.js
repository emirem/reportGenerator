const fs = require('fs');
const PdfPrinter = require('pdfmake');
const pdfConfig = require('../config/pdfConfig.js');
const fonts = {
  Roboto: {
    normal: 'assets/fonts/Roboto-Regular.ttf',
    medium: 'assets/fonts/Roboto-Medium.ttf',
    bold: 'assets/fonts/Roboto-Bold.ttf',
    italics: 'assets/fonts/Roboto-Italic.ttf',
    bolditalics: 'assets/fonts/Roboto-MediumItalic.ttf'
  }
};
const printer = new PdfPrinter(fonts); 
const pdfDoc = printer.createPdfKitDocument(pdfConfig);

pdfDoc.pipe(fs.createWriteStream('results/document.pdf'));
pdfDoc.end();