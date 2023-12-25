# #!/bin/sh

echo Running script ./.devcontainer/init.sh


################################################################################
# Set get pull mode to rebase. Do the same for branches that may exist. However
# this is a repo designed for trunk-based development, so there shouldn't be any
# branches other than 'main' [Manfred, 22aug2022]
# For more details, see https://stackoverflow.com/a/13974638/411428
runuser -l node -c 'cd /work && git config pull.rebase true'
runuser -l node -c 'cd /work && git config branch.autosetuprebase always'
# option -l specifies the user on whose behalf the commmand is executed. Note that
#           this script runs as root. [Manfred, 12 Feb 2023]


################################################################################
# Make 'p' an alias for 'pnpm':
runuser -l node -c 'echo "alias p='pnpm'" >> /home/node/.bashrc && source /home/node/.bashrc'


################################################################################
# Change ownership of the work directory to the node user
chown -R node:node /work
# This is not necessary on WSL2, but it is on Linux. [Manfred, 10 Dec 2023]


echo Script ./.devcontainer/init.sh finished
