# Remove files that may have been created accidentially by running
# 'npm install' in the wrong directory. [Manfred, 26dec2023]
rm -rf /work/node_modules
rm -rf /work/package.json
rm -rf /work/package-lock.json
rm -rf /work/pnpm-lock.yaml
