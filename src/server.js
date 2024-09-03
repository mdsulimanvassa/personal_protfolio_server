const app = require('./app');
const connectDtabase = require('./config/db');
const { port } = require('./secret');


app.listen(port, async () => {
  console.log(`Example app listening on port: http://localhost:${port}`);
  await connectDtabase();
})