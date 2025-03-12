FROM node:18.17.0-bullseye-slim AS node
ENV ENV=production
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install && npm ci --only=production --omit=dev && npm cache clean --force
COPY . .
EXPOSE 80
RUN chmod a+x /usr/src/app/startup.sh
ENTRYPOINT ["/usr/src/app/startup.sh"]