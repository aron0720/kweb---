const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const fs = require('fs');
const path = require('path');

const sitemapFilePath = './sitemap.xml';

const pagesDir = path.join(__dirname, '../public'); //파일을 밖으로 옮기면 이 경로를 수정해주세요.

const hostname = 'http://localhost:8080';

const sitemap = new SitemapStream({ hostname });
const writeStream = createWriteStream(sitemapFilePath);

sitemap.pipe(writeStream);

function addPagesToSitemap(dir, baseUrl = '/') {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      addPagesToSitemap(filePath, path.join(baseUrl, file, '/'));
    } else {
      const fileUrl = path.join(baseUrl, file).replace(/\\/g, '/'); 
      sitemap.write({ url: fileUrl, changefreq: 'daily', priority: 0.7 });
    }
  });
}

addPagesToSitemap(pagesDir);

sitemap.end();

streamToPromise(sitemap).then(() => console.log('Sitemap created successfully'));
