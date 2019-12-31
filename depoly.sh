npm run build
cp .htaccess build/
cd build
rsync -ravz ./ votecssa@vote.cssauw.org:/home/votecssa/vote.cssauw.org/public
