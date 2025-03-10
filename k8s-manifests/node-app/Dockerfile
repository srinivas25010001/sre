FROM debian:bullseye AS apache

RUN apt-get update && apt-get install -y \
    apache2 apache2-utils curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install --only=production && npm cache clean --force

COPY . .

RUN a2enmod proxy proxy_http rewrite

COPY httpd.conf /etc/apache2/sites-available/000-default.conf

EXPOSE 80

CMD ["sh", "-c", "node /usr/src/app/server.js & apachectl -D FOREGROUND"]
