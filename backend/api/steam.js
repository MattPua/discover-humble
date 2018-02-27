const axios = require('axios');
const fs = require('fs');

const sourceData = require('./../data/games.json');
const fileNameToWrite = '../data/games.json';

async function getSteamAppData(game) {
    return new Promise((resolve) => { 
        if (!humbleData) resolve(null);
        humbleData = game.humbleBundle;

        // skip if audio or ebook
        if (humbleData.downloads && humbleData.downloads.some((d) => d.platform === 'audio' || d.platform === 'ebook')) {
            // console.log('skipping because its audio or ebook: ' + humbleData.human_name);
            resolve(game);
        }
        // skip if we've already gotten its data
        // if (humbleData.steam) {
        //     console.log('already retrieved steam data, skipping... : ' + humbleData.human_name);
        //     resolve(humbleData);
        // }
        else if (!game.igdb || !game.igdb.external || !game.igdb.external.steam) {
            console.log('does not have igdb data or steamId, cannot get steam data: ' + humbleData.human_name);
            resolve(game);
        }
        else {
            //console.log('getting steam data for: ' + humbleData.human_name);
            const steamId = game.igdb.external.steam;
            axios.get('http://store.steampowered.com/api/appdetails/?appids=' + steamId)
            .then((data) => {
                if (data) {
                    const val = data.data[steamId].data;
                    game.steam.appDetails = val;
                    resolve(game);
                }
                else {
                    console.log('could not get steam app details for game: ' + humbleData.human_name + ' with steam id: ' + steamId);
                }
                resolve(null);
            }).catch((error) => {
                console.log(error.message);
                resolve(null);
            });
        }
    });
}

async function getSteamReviewData(game) {
    return new Promise((resolve) => { 
        if (!game) resolve(null);
        humbleData =  game.humbleBundle;

        // skip if audio or ebook
        if (humbleData.downloads && humbleData.downloads.some((d) => d.platform === 'audio' || d.platform === 'ebook')) {
            // console.log('skipping because its audio or ebook: ' + humbleData.human_name);
            resolve(game);
        }
        // skip if we've already gotten its data
        // if (humbleData.steam) {
        //     console.log('already retrieved steam data, skipping... : ' + humbleData.human_name);
        //     resolve(humbleData);
        // }
        else if (!game.igdb || !game.igdb.external || !game.igdb.external.steam) {
            console.log('does not have igdb data or steamId, cannot get steam data: ' + humbleData.human_name);
            resolve(game);
        }
        else {
            //console.log('getting steam data for: ' + humbleData.human_name);
            const steamId = game.igdb.external.steam;
            axios.get('https://store.steampowered.com/appreviews/' + steamId + '?json=1')
            .then((data) => {
                if (data) {
                    const val = data.data;
                    game.steam.reviews = val;
                    resolve(getSteamAppData(game));
                }
                else {
                    console.log('could not get steam reviews for game: ' + humbleData.human_name + ' with steam id: ' + steamId);
                }
                resolve(null);
            }).catch((error) => {
                console.log(error.message);
                resolve(null);
            });
        }
    });
}

async function getSteamReviews() {
    var promiseArray = [];

    // let count = 0;
    for (var game of sourceData) {
        if (!game) continue;
        // skip if crosspomo
        if (game.humbleBundle.machine_name.indexOf('crosspromo') >= 0) continue;
        
        game.steam = { reviews: null, appDetails: null};
        // Need to do this since it looks like runing it all at the same time, I get throttled
        const val = await getSteamReviewData(game);
        promiseArray.push(val);
    }
    Promise.all(promiseArray).then((responses) => {
        writeToFile(responses);
    }).catch((errors) => {
        console.log(errors);
    });
}

function writeToFile(r) {
    fs.writeFile(fileNameToWrite, JSON.stringify(r), function(err) {
        if (err) console.error(err);
    });
}
  

getSteamReviews();