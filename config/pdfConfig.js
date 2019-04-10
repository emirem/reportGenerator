module.exports = {
  content: [
    {
			table: {
        widths: [60, '*', 150, '*', '*'],
				body: [
          ['', '', '', '', ''],
          [
            { text: 'Channel:', style: ['tableFontStyle', 'tableLabel'] },
            { text: 'Some channel', style: ['tableFontStyle'] },
            { image: 'assets/user.png', rowSpan: 3, width: 50, alignment: 'center' },
            { text: 'Date:', style: ['tableFontStyle', 'tableLabel'], alignment: 'right' },
            { text: '21/04/2019', style: ['tableFontStyle'], alignment: 'right' },
          ],
          [
            { text: 'Followers:', style: ['tableFontStyle', 'tableLabel'] },
            { text: '2052156', style: ['tableFontStyle'],  },
            '',
            { text: 'Status:', style: ['tableFontStyle', 'tableLabel'], alignment: 'right' },
            { text: 'Partner', style: ['tableFontStyle'], alignment: 'right' },
          ],
					[
            { text: 'Views:', style: ['tableFontStyle', 'tableLabel'] },
            { text: '5265215641', style: ['tableFontStyle'] },
            '',
            { text: 'Report no.:', style: ['tableFontStyle', 'tableLabel'], alignment: 'right' },
            { text: '1', style: ['tableFontStyle'], alignment: 'right'},
          ]
				]
			},
			layout: {
        defaultBorder: false,
        fillColor: '#FFF'
			}
    },
    {
      image: 'results/chart_1.png',
      width: 510,
      margin: [0, 40, 0, 10]
    },
    {
      alignment: 'left',
      margin: [20, 40, 20, 40],
			columns: [
				{
          text: 'Duration:\n\nNew followers:',
          width: '30%',
          style: ['label', 'tableLabel'],
          alignment: 'right',
          margin: [ 0, 10, 0, 0 ]
        },
        {
          text: 'Some name\n\n28/04/2019',
          width: '15%',
          margin: [ 0, 10, 0, 0 ]
        },
        {
          text: 'Average viewers:\n\nMax viewers:',
          width: '30%',
          alignment: 'right',
          style: ['label', 'tableLabel'],
          margin: [ 0, 10, 0, 0 ]
        },
        {
          text: 'Some name\n\n28/04/2019',
          width: '15%',
          margin: [ 0, 10, 0, 0 ]
        }
      ],
      columnGap: 5
    },
    {
      image: 'results/chart_2.png',
      width: 510
    },
  ],
  footer: {
    columns: [
      {
        text: 'Reference [Twitch API, Vega charts, pdfMake]',
        alignment: 'right',
        fontSize: 7,
        margin: [ 40, 0, 40, 0 ]
      },
    ]
  },
  styles: {
		label: {
      fontSize: 12,
      bold: true
    },
    tableLabel: {
      alignment: 'left',
      bold: true
    }
  },
  defaultStyle: {
    fontSize: 12,
    normal: true,
    lineHeight: 1.2,
    color: '#252525'
	}
};