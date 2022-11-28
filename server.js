const express = require('express');
const logger = require('./utils/logger');
const mbiUtils = require('./utils/mbi-utils.js')
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/verify', (req,res) => {
    logger.debug(`/verify entered with with MBI '${req.body.mbi}'`);
    const result = mbiUtils.validateMbiFormat(req.body.mbi);
    const mbiVerifyResult = {valid: result}
    logger.debug(`/verify returned ${result} for given MBI '${req.body.mbi}'`);
    res.json(mbiVerifyResult);
});

app.get('/generate', (req,res) => {
    const mbi = mbiUtils.generateMbi();
    const result = {result: mbi};
    logger.debug(`/generate returned ${JSON.stringify(result)}'`);
    res.json(result);
});

const port = process.env.PORT || 8080
app.listen(port)
logger.info(`MBI tools backend app is listening on port: ${port}`)