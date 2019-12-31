mv src/Configuration.js src/Configuration_backup.js
mv src/Configuration_deploy.js src/Configuration.js

npm run build

mv src/Configuration.js src/Configuration_deploy.js
mv src/Configuration_backup.js src/Configuration.js

cp .htaccess build/
cd build
rsync -ravz ./ votecssa@vote.cssauw.org:/home/votecssa/vote.cssauw.org/public
