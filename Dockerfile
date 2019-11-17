# build environment
FROM node:12 as build

ARG REACT_APP_DATA_API_HOST
ARG REACT_APP_PUBLIC_HOST
ARG REACT_APP_COOKIE_NAME
ARG REACT_APP_ADMIN_GROUP
ARG REACT_APP_EDITOR_GROUP
ARG REACT_APP_AUTHOR_GROUP

ENV REACT_APP_DATA_API_HOST $REACT_APP_DATA_API_HOST
ENV REACT_APP_PUBLIC_HOST $REACT_APP_PUBLIC_HOST
ENV REACT_APP_COOKIE_NAME $REACT_APP_COOKIE_NAME
ENV REACT_APP_ADMIN_GROUP $REACT_APP_ADMIN_GROUP
ENV REACT_APP_EDITOR_GROUP $REACT_APP_EDITOR_GROUP
ENV REACT_APP_AUTHOR_GROUP $REACT_APP_AUTHOR_GROUP

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@2.1.5 -g --silent
COPY . /app
RUN npm run build

# production environment
FROM nginx:1.17
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/default.conf /etc/nginx/conf.d/default.conf 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
