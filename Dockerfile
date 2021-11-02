# ** stage 1 - build environment **
FROM node:13.12.0-alpine as build-stage

# create /app and set working directory to it
WORKDIR /app

# add to path
ENV PATH /app/node_modules/.bin:$PATH

# copy package.json into /app
COPY package.json /app
COPY package-lock.json /app

# install dependencies
RUN npm ci --silent
RUN npm install react-scripts@4.0.3 -g --silent

# copy src code into app
COPY . /app

# build app
RUN npm run build

# ** stage 2 - serve environment **
FROM nginx:stable-alpine

# copy build files to nginx
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80

# set nginx to run in the foreground
CMD ["nginx", "-g", "daemon off;"]