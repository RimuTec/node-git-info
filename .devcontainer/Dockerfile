FROM node:20.11.0
# Last version check on 24 Jan 2024.
# This is an LTS version.
# Check for new versions at https://nodejs.org/en/ or at https://hub.docker.com/_/node
# [Manfred]


################################################################################
# Install prerequisites and utilities
RUN apt-get update
RUN apt-get install -y \
    lsb-release \
    procps \
    iputils-ping \
    net-tools
# lsb_release: use lsb_release -a to show the linux version used by the dev container
# procps: to support command 'ps'
# iputils-ping: to support command 'ping'
#    See: https://linuxconfig.org/ping-command-not-found-on-ubuntu-20-04-focal-fossa-linux
# net-tools: to support command such as 'arp', 'ifconfig', 'netstat', etc.
#    See: https://helpmanual.io/packages/apt/net-tools/
# [Manfred]


################################################################################
# Replace npm with pnpm
RUN npm install -g pnpm@8.14.3
# Last version check on 24 Jan 2024.
# Newer versions might be available at https://www.npmjs.com/search?q=yarn
RUN npm uninstall npm -g
# In case the previous uninstall command doesn't work, other options are described at
# https://docs.npmjs.com/cli/v7/using-npm/removal
# [Manfred]
