const fs = require('fs');
const Koa = require('koa');
const logger = require('koa-logger');
const path = require('path');

const app = new Koa();

app.use(logger());

app.use(async ctx => {
  if (ctx.path === '/redirect') {
    ctx.redirect('/otherpage');
    return;
  }

  let fileName = 'index.html';
  if (ctx.path === '/otherpage') {
    fileName = 'other.html';
  }

  ctx.type = 'text/html';
  ctx.body = fs.createReadStream(path.join(__dirname, fileName));
});

app.listen(3000);
