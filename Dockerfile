FROM node:16.6

WORKDIR /srv

# Install dependencies
RUN yarn add serve
COPY package.json yarn.lock ./
RUN yarn install

# Build and serve
COPY . .
RUN yarn build
CMD yarn serve -s build
