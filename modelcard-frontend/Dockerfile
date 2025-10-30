# add alphine
FROM node:18-alpine as builder

WORKDIR /builder

ADD . /builder/

ENV PATH /builder/node_modules/.bin:$PATH

RUN yarn

RUN yarn production:build

ENV HOST 0.0.0.0
EXPOSE 3000
CMD [ "yarn", "production:start" ]
