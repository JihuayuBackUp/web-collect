import got from 'got'
import {writeFileSync, mkdirSync} from 'fs'

const twitchBase = "https://addons-ecs.forgesvc.net/";
const key = ['id', 'downloadCount', 'popularityScore', 'gamePopularityRank']
let ret = [];
process.nextTick(async () => {
    let ra = 1;
    let rd = 1;
    const time = new Date();
    const today = `${pad0(time.getUTCFullYear(), 4)}${pad0(time.getUTCMonth())}${pad0(time.getUTCDay())}`
    for (let i = 0; i < 100; i++) {
        try {
            const res = await got.get(twitchBase + `api/v2/addon/search?gameId=432&index=${100 * i}&pageSize=100&sort=1&sectionId=4471`);
            let json = JSON.parse(res.body);
            for (let o of json) {
                const item = {time: time, rank: ra++, type: 4471};
                for (let j of key) {
                    item[j] = o[j];
                }
                // mkdirSync(`./web-collect/curseforge/rank/${o['id']}`, {recursive: true});
                // writeFileSync(`./web-collect/curseforge/rank/${o['id']}/${today}.json`, JSON.stringify(item));
                ret.push(item)
            }
        } catch (e) {
            console.log(e);
        }

        try {
            const res = await got.get(twitchBase + `api/v2/addon/search?gameId=432&index=${100 * i}&pageSize=100&sort=1&sectionId=6`);
            let json = JSON.parse(res.body);
            for (let o of json) {
                const item = {time: time, rank: rd++, type: 6};
                for (let j of key) {
                    item[j] = o[j];
                }
                // mkdirSync(`./web-collect/curseforge/rank/${o['id']}`, {recursive: true});
                // writeFileSync(`./web-collect/curseforge/rank/${o['id']}/${today}.json`, JSON.stringify(item));
                ret.push(item)
            }
        } catch (e) {
            console.log(e);
        }
    }
    mkdirSync(`./web-collect/curseforge/rank/}`, {recursive: true});
    writeFileSync(`./web-collect/curseforge/rank/${today}.json`, JSON.stringify(ret));
})

function pad0(i: number, length: number = 2) {
    return `${i}`.padStart(length, '0');
}
