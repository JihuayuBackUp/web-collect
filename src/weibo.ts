import {load} from 'cheerio'
import got from 'got'
import {writeFileSync,mkdirSync} from 'fs'
process.nextTick(async ()=>{
    let ret = []
    const ans = await got.get('https://s.weibo.com/top/summary?cate=realtimehot');
    const $ = load(ans.body);
    const l = $('#pl_top_realtimehot > table > tbody > tr');
    l.each((k,v)=>{
        const $ =  load(v);
        const top = $('.ranktop');
        if (top.html()) {
            const str = $('.td-02 > a').text();
            const num = $('.td-02 > span').text();
            ret.push({title:str,hot:num})
        }
    });
    let time = Date.now();
    mkdirSync('./data/weibo',{recursive:true})
    writeFileSync(`./data/weibo/${time}.json`,JSON.stringify(ret));
})
