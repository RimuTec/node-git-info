#!/bin/sh

# cSpell: words runuser autosetuprebase

echo Running script ./.devcontainer/init.sh

################################################################################
# When running as a github action the owner and groups of work don't line up with user
# node in this container. This is a workaround to make sure that the user 'node' has
# write access to /work and its subdirectories. [Manfred, 05mar2025]
if [ "$CI" = "true" ]; then
   echo ************************************************************************************************************
   echo loc 250219-1428: adding write access for user 'node' to /work and its subdirectories ...
   chmod -R a+rw /work
   find /work -type d -exec chmod a+rx {} \;
   # chmod -R u+w /work
   echo loc 250219-1429: verify permissions: $(ls -ld /work)
fi


if [ "$CI" = "false" ]; then
   # The git config commands will fail when this is executed as part of a github action [Manfred, 24feb2025]
   echo ************************************************************************************************************
   ################################################################################
   # Set get pull mode to rebase. Do the same for branches that may exist. However
   # this is a repo designed for trunk-based development, so there shouldn't be any
   # branches other than 'main' [Manfred, 22aug2022]
   # For more details, see https://stackoverflow.com/a/13974638/411428
   runuser -l node -c 'cd /work && git config pull.rebase true'
   runuser -l node -c 'cd /work && git config branch.autosetuprebase always'
   # option -l specifies the user on whose behalf the command is executed. Note that
   #           this script runs as root. [Manfred, 12 Feb 2023]
else
   echo ************************************************************************************************************
   echo loc 250219-1433: skipping git config for CI environment
fi


################################################################################
# Setup pnpm for user 'node'
# runuser -l node -c 'cd /work && pnpm setup'
# runuser -l node -c 'source /home/node/.bashrc'


################################################################################
# Make 'p' an alias for 'pnpm':
runuser -l node -c 'echo "alias p='pnpm'" >> /home/node/.bashrc && source /home/node/.bashrc'


################################################################################
# Change ownership of the work directory to the node user
chown -R node:node /work
# This is not necessary on WSL2, but it is on Linux. [Manfred, 10 Dec 2023]


echo Script ./.devcontainer/init.sh finished
