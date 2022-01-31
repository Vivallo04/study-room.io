FROM node:16.13.0-stretch

# create /app directory
WORKDIR /app

# install yarn package manager
RUN npm install yarn

# install app dependencies
COPY package*.json ./

RUN yarn install

# Bundle app source code
COPY . .

EXPOSE 3000

# Run go-gps in development mode
CMD ["yarn", "development"]