FROM node:16.6

WORKDIR /srv

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install
RUN yarn add serve

# Build and serve
COPY . .
RUN yarn build
CMD yarn serve -s build
