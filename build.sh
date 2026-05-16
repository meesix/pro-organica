export COSMIC_BUCKET='proorganica';
export COSMIC_READ_KEY='OkyNXMZVgGEH99l0MO6RIdGbK31piArSUhbUVo8fIw4MYbz7Fy';
git pull
sudo chown -R $USER:$USER /var/www/pro-organica/public 2>/dev/null || true
npm run clean
npm run build
sudo chown -R www-data:www-data /var/www/pro-organica/public
chmod -R 755 /var/www/pro-organica/public
