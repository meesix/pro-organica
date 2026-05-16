export COSMIC_BUCKET='proorganica';
export COSMIC_READ_KEY='OkyNXMZVgGEH99l0MO6RIdGbK31piArSUhbUVo8fIw4MYbz7Fy';
git pull
npm run clean
npm run build
sudo chown -R www-data:www-data /var/www/pro-organica/public
chmod -R 755 /var/www/pro-organica/public
