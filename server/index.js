const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '/../client/public')));

app.listen(port, () => {
  console.log(`web-clone is listening on port ${port}`);
});