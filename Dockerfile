FROM node:14.15.5-buster as builder
WORKDIR /admin-portal
COPY package*.json ./
RUN npm install
COPY vue.config.js ./
COPY babel.config.js ./
COPY .eslintrc.js ./
COPY public ./public
COPY src ./src
RUN npm run build

# production stage
FROM nginx:stable-alpine
COPY --from=builder ./admin-portal/dist /usr/share/nginx/html
# Copy the respective nginx configuration files
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

RUN chown nginx:nginx /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
