import program from 'commander';
import exec from 'executive';
import fs = require('fs');
import path = require('path');

let json: {[key: string]: any};

const setJson = () => {
    return new Promise(function(resolve, reject) {
        fs.readFile(path.resolve(__dirname, './package.json'), 'utf8', (err, data) => {
            if (err) reject(err);
            resolve(JSON.parse(data));
        });
    });
}

program
    .version('0.1.0', '-v, --version')
    .arguments('<command> [packages...]')
    .action(async function (command, packages) {
        try {
            if (command === 'i' || command === 'install') {
                json = await setJson();
                if (packages.length) {
                    // let packagesString = '';
                    // for (let pack in packages) {
                    //     packagesString += `${pack} `; //---
                    // }
                    // console.log(`npm i ${packagesString}`);
                    // exec(`npm i ${packagesString}`);
                } else {
                    console.log('installing local dependencies...');
                    await exec('npm i');
                    if (json.globalDependencies && Object.keys(json.globalDependencies).length) {
                        let packagesString = '';
                        for (let pack in json.globalDependencies) {
                            packagesString += `${pack}@${json.globalDependencies[pack]} `;
                        }
                        console.info(`installing global dependencies...`);
                        exec(`npm i ${packagesString} -g`);
                    } else {
                        console.info('where is no global dependencies');
                    }
                }
            }
        } catch(error) {
            console.error(error);
        }
        
    });

program.parse(process.argv);
