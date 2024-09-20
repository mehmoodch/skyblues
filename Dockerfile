# Use NGINX as a base image for serving the HTML files
FROM nginx:alpine

# Copy your website files to the default NGINX directory
COPY . /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start NGINX when the container starts
CMD ["nginx", "-g", "daemon off;"]
