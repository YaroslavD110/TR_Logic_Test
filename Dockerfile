FROM node:8

WORKDIR /src/app

COPY /BackEnd/package.json .
RUN npm install --only=production

COPY /BackEnd/dist .
COPY /BackEnd/static ./static

EXPOSE 8080
CMD [ "npm", "start" ]