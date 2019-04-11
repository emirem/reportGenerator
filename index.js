const admin = require('firebase-admin');
const serviceAccount = require('./config/firebase.json');

// Libs
const generatePDF = require('./lib/pdfGenerator');
const generateChart = require('./lib/chartGenerator');

// Chart configs
const lineChartSpec = require('./config/line-chart.json');
const durationChartSpec = require('./config/duration-chart.json');

const arrangeData = (snapshot) => {
  if (!snapshot) { return; }

    const data = snapshot.val();
    const values = [];
    const durationChartValues = [];

    for (const property in data) {
      const { timestamp, viewers, game } = data[property];
      values.push({ timestamp, viewers });

      const gameAddedIndex = durationChartValues.findIndex(({ game: addedGame }) => addedGame === game);

      // If the game is already added, just update its `end_at` time
      if (gameAddedIndex > -1) {
        durationChartValues[gameAddedIndex].end_at = timestamp;
      } else {
        durationChartValues.push({ start_at: timestamp, end_at: timestamp, game });
      }
    }

    lineChartSpec.data[0].values = values;

    generateChart(lineChartSpec, (err) => {
      if (err) throw err;
      console.log(`
      ----------------------------
          Line chart generated.
      ----------------------------
      `);

      durationChartSpec.data[0].values = durationChartValues;

      generateChart(durationChartSpec, (err) => {
        if (err) throw err;
        console.log(`
      ----------------------------
        Duration chart generated.
      ----------------------------
        `);

        generatePDF(data, values);
      });
    });

    admin.app().delete();
};

const queryData = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://twitchsniffer-25e09.firebaseio.com'
  });

  const rootRef = admin.database().ref('streams');

  rootRef.on('value', arrangeData, (errorObject) => {
    console.log('The read failed:', errorObject.code);
  });
};

queryData();