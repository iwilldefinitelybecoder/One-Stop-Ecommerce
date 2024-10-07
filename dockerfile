
#stage 2 
FROM nginx:alpine

# Copy the built React app from the local directory to the Nginx directory
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
