const logger = require('./logger');

const alphaChoices = 'ACDEFGHJKMNPQRTUVWXY';
const numericChoicesWithoutZero = '123456789'
const numericChoices = '0123456789'

// This validator will allow for lowercase letters although our generated MBI will use uppercase only for readability.  This regex also allows for formatting dashes
const mbiPattern = /\b[1-9][AC-HJKMNP-RT-Yac-hjkmnp-rt-y][AC-HJKMNP-RT-Yac-hjkmnp-rt-y0-9][0-9]-?[AC-HJKMNP-RT-Yac-hjkmnp-rt-y][AC-HJKMNP-RT-Yac-hjkmnp-rt-y0-9][0-9]-?[AC-HJKMNP-RT-Yac-hjkmnp-rt-y]{2}[0-9]{2}\b/;

function validateMbiFormat(mbi) {
    return mbiPattern.test(mbi);
}

// Spec: https://www.cms.gov/medicare/new-medicare-card/understanding-the-mbi.pdf
function generateMbi() {

    let alreadyExists = false;
    let mbi;

    // These values are used for the potential collision with existing mbis
    const MAX_TRIES = 100;
    let tries = 0;

    do {
        mbi = randomChar(numericChoicesWithoutZero) +
            randomChar(alphaChoices) +
            randomChar(alphaChoices + numericChoices) +
            randomChar(numericChoices) +
            randomChar(alphaChoices) +
            randomChar(alphaChoices + numericChoices) +
            randomChar(numericChoices) +
            randomChar(alphaChoices) +
            randomChar(alphaChoices) +
            randomChar(numericChoices) +
            randomChar(numericChoices);

        tries++;
        alreadyExists = mbiExists(mbi);
    }
    while (alreadyExists && tries <= MAX_TRIES);

    if (alreadyExists) {
        logger.error("Gave up, generated 100 MBI's but all already existed, suspect problem with mbiExists()");
        return null;
    }

    return mbi;
}

// This is a stubbed method that in the real world would check to see if our randomly generated MBI
// already exists.  The likelihood is low, but it should be checked.
let mbiExists = function mbiExists(mbi) {
    return false;
}

module.exports = { validateMbiFormat, generateMbi, mbiExists }

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function randomChar(vals) {
    return vals.charAt(getRandomInt(vals.length));
}

