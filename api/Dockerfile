# Usually to select particular version instead of latest
FROM node:12.9.0 as base
RUN mkdir -p /srv/app
COPY . /srv/app
WORKDIR /srv/app
# Install production dependencies
RUN npm install
# Expose port for access outside of container
ENV PORT 4000
EXPOSE $PORT
CMD ["npm", "start"]