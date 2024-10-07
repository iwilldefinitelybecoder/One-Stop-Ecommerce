FROM node:20.10.0 AS build

WORKDIR /app

COPY  package*.json ./

RUN npm install

COPY  . .

RUN npm run build

#stage 2 
FROM nginx:alpine

# Copy the built React app from the local directory to the Nginx directory
COPY --from=build /app/dist /usr/share/nginx/html
# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
