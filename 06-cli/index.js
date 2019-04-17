const Commander = require('commander');

async function main(params) {
    Commander.version('v1').parse(process.argv);
}

main();