# --build stage
FROM node:12.13 AS builder
LABEL stage=builder
WORKDIR /app
COPY ["package.json", "./"]
RUN npm install
COPY . .
RUN npm run build

# --run stage
FROM node:12.13-alpine

ARG port=$port
ENV PORT ${port}

WORKDIR /app
RUN	apk --no-cache add libpng librsvg libgsf giflib libjpeg-turbo musl \
	&& apk add vips-dev fftw-dev build-base --update-cache  --repository https://alpine.global.ssl.fastly.net/alpine/edge/testing/  --repository https://alpine.global.ssl.fastly.net/alpine/edge/main \
	&& apk --no-cache add --virtual .build-dependencies g++ make python curl tar gtk-doc gobject-introspection expat-dev glib-dev libpng-dev libjpeg-turbo-dev giflib-dev librsvg-dev  \
	&& su node \
	&& npm install sharp@${SHARP_VERSION} --g --production --unsafe-perm \
	&& chown node:node /usr/local/lib/node_modules -R \
	&& apk del .build-dependencies
COPY --from=builder /app/package.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist

EXPOSE ${PORT}

CMD ["npm", "run", "start:prod"]
