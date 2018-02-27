const axios = require('axios');
const igdb = require('igdb-api-node').default;
const fs = require('fs');
const client = igdb('1aaa0a59f6eddfbbfda7abb8e2eb9fca');

const sourceData = require('./../data/games.json');
const fileNameToWrite = '../data/games.json';


var count = 0;

async function addIgdbData() {
    var promiseArray = [];
    // for (var humbleGame of sourceData) {
    //     promiseArray.push(getGameDetails(humbleGame));
    // }
    // Promise.all(promiseArray).then((responses) => {
    //     writeToFile(responses);
    // });
    for (var game of sourceData) {
        if (!game) continue;
        // skip if crosspomo
        if (game.humbleBundle.machine_name.indexOf('crosspromo') >= 0) continue;
        
        // Need to do this since it looks like runing it all at the same time, I get throttled
        const val = await getGameDetails(game);
        promiseArray.push(val);
    }
    Promise.all(promiseArray).then((responses) => {
        writeToFile(responses);
    }).catch((errors) => {
        console.log(errors);
    });
}

async function getGameDetails(game) {
    return new Promise((resolve) => { 
        humbleData = game.humbleBundle;
        if (!humbleData) resolve(null);

        // skip if audio or ebook
        if (humbleData.downloads && humbleData.downloads.some((d) => d.platform === 'audio' || d.platform === 'ebook')) {
            // console.log('skipping because its audio or ebook: ' + humbleData.human_name);
            resolve(game);
        }
        // skip if we've already gotten its data
        if (game.igdb && false) {
            // console.log('already retrieved igdb data, skipping... ' + humbleData.human_name);
            resolve(game);
        }
        else {
            // console.log('getting igdb data for: ' + humbleData.human_name);
            // TODO: can we add company name to searching
            // TODO: use axios to make call normally to get expanded data
            // https://igdb.github.io/api/references/expander/
            client.games({
                fields: '*',
                limit: 1,
                search: encodeURIComponent(humbleData.human_name)
            }).then((response) => {
                const data = response.body;
                if (data.length) {
                    // assume the first one is the right one
                    let response = data[0];
                    // Check if external for steam is found
                    if (!response.external || !response.external.steam) {
                        // go through websites seeing if we can find a link to the steam website, and taking the appId from there
                        if (response.websites) {
                            // Steam is ID 13 for category
                            const matches = response.websites.find((site) => site.category === 13);
                            if (matches) {
                                const steamId = matches.url.match(/\/{1}[0-9]+/g)[0].replace('/','');
                                console.log('found steam id through websites array. steamId: ' + steamId + ' for game : ' + humbleData.human_name);
                                response = Object.assign({external: {steam: steamId}}, response);
                            }
                            else console.log('no external steam ID given for: ' + humbleData.human_name);
                        }
                    }

                    resolve(Object.assign({igdb: response}, game));
                    // console.log(response);
                }
                else console.error('could not find item for : ' + humbleData.human_name);
                resolve(null);
            }).catch((error) => {
                console.log(error);
                resolve(null);
            });
        }
    });
}


function writeToFile(r) {
    fs.writeFile(fileNameToWrite, JSON.stringify(r), function(err) {
      if (err) console.error(err);
    });
  }
  

addIgdbData();