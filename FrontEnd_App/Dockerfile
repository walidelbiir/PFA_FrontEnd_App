FROM node:18.14.2-slim

WORKDIR /WellDone_Frontend
COPY . /WellDone_Frontend/
EXPOSE 3000
RUN npm i --force

ENTRYPOINT [ "npm" , "start" ]