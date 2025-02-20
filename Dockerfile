# syntax=docker/dockerfile:1.0-experimental

# ARGs are used to pass in values at build time.
ARG NODE_VERSION=16
ARG NODE_ENV=production
ARG PORT=3000


################################################################################
# Use node image for node_base image for all node-related stages.
FROM node:${NODE_VERSION}-alpine as node_base

# Set working directory for all build stages.
WORKDIR /usr/src/app


################################################################################
# Create a stage for installing production node dependecies.
FROM node_base as npm_deps
ARG NODE_ENV

# Download npm dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage bind mounts to package.json and package-lock.json to avoid having to copy them
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev


################################################################################
# Create a stage for building the application (currently just copies the files
# needed by the dynamic server as no static compilation is implemented).
FROM npm_deps as build_app

# Copy the source files needed for express serving into the image.
COPY ./middleware ./middleware
COPY ./public ./public
COPY ./routes ./routes
COPY ./server ./server
COPY ./utils ./utils
COPY ./views ./views


################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM node_base as final
ARG PORT
ARG NODE_ENV

# Run the application as a non-root user.
USER node

# Copy package.json so that package manager commands can be used.
COPY package.json .

# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
COPY --from=build_app /usr/src/app .
COPY --from=npm_deps /usr/src/app/node_modules ./node_modules

# Allow writing to the games.json
USER root
RUN chown node:node /usr/src/app
USER node

# Expose the port that the application listens on.
EXPOSE ${PORT}

# Set runtime environment variables
ENV PORT ${PORT}
ENV NODE_ENV ${NODE_ENV}

# Run the application.
CMD npm start
