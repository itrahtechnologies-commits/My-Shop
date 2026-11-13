# Multi-stage production Dockerfile for MyShop PWA
# Stage 1: Build the Vite application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests and install dependencies
COPY package*.json ./
RUN npm ci

# Copy application source and build static dist/
COPY . .
RUN npm run build

# Stage 2: Serve static assets with Nginx
FROM nginx:alpine AS runner

# Configure Nginx for SPA/MPA routing, PWA MIME types, and Service Worker caching
RUN cat <<'EOF' > /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Ensure proper MIME type for Web App Manifest
    types {
        application/manifest+json webmanifest;
    }

    # Never cache service worker or manifest so updates apply immediately
    location ~* ^/(sw\.js|registerSW\.js|manifest\.webmanifest|manifest\.json)$ {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Service-Worker-Allowed "/";
        try_files $uri =404;
    }

    # Cache static hashed assets aggressively
    location /assets/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
        try_files $uri =404;
    }

    # Serve HTML pages and assets cleanly
    location / {
        try_files $uri $uri.html $uri/ /index.html;
    }
}
EOF

# Copy built output from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
