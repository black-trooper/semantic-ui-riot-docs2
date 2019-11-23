const functions = require('firebase-functions');
const fs = require('fs');
const xss = require('xss');
const i18n = require('./i18n/locale-en.json')

/* Trigger: /demo-xxxx  */
/* 詳細ページへの直接アクセスは、metaタグを埋め込んでからindex.htmlを返す */
exports.returnWithOGP = functions.https.onRequest((req, res) => {
  res.set('Cache-Control', 'public, max-age=86400, s-maxage=2592000');

  const url = req.path.match(/\/.*\/([^\/\?]*)/)[1];
  const title = url.charAt(0).toUpperCase() + url.slice(1)

  fs.readFile('./embed.html', 'utf8', function (err, templateHtml) {
    if (err) {
      res.status(500).send(err);
    }

    const responseHtml = templateHtml
      .replace(/\<title>(.*)<\/title>/g, `<title>${xss(title)} | Semantic UI Riot</title>`)
      .replace(/\{{title}}/g, xss(title))
      .replace(/\{{url}}/g, xss(url))
      .replace(/\{{description}}/g, i18n[url].description)
      .replace(/\<content>([\s\S]*)<\/content>/g, `<content><h1>${xss(title)}</h1><p>${i18n[url].description}</p></content>`)
      .replace(/\<script type="text\/javascript" src="main.js"><\/script>/g, '<script type="text/javascript" src="/main.js"></script>')
      ;

    res.status(200).send(responseHtml);
  })
});

/* Trigger: /v3/demo-xxxx  */
/* 詳細ページへの直接アクセスは、metaタグを埋め込んでからindex.htmlを返す */
exports.returnWithOGPv3 = functions.https.onRequest((req, res) => {
  res.set('Cache-Control', 'public, max-age=86400, s-maxage=2592000');

  const url = req.path.match(/\/v3\/demo-([^\/\?]*)/)[1];
  const title = url.charAt(0).toUpperCase() + url.slice(1)

  fs.readFile('./v3/embed.html', 'utf8', function (err, templateHtml) {
    if (err) {
      res.status(500).send(err);
    }

    const responseHtml = templateHtml
      .replace(/\<title>(.*)<\/title>/g, `<title>${xss(title)} | Semantic UI Riot</title>`)
      .replace(/\{{title}}/g, xss(title))
      .replace(/\{{url}}/g, xss(url))
      .replace(/\{{description}}/g, i18n[url].description)
      .replace(/\<content>([\s\S]*)<\/content>/g, `<content><h1>${xss(title)}</h1><p>${i18n[url].description}</p></content>`)
      ;
    

    res.status(200).send(responseHtml);
  })
});