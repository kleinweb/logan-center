#!/usr/bin/env bash
set -euo pipefail

echo -e "👋 Hello, I am going to setup WordPress for you."
cp .env.sample .env
sleep 2

echo -e "Reading environment variables..."
source .env
sleep 1

echo -e "Running Composer..."
pushd wp-content
composer install --prefer-dist --no-dev
popd

# FIXME: this isn't nice...
echo -e "Updating hosts file. You may be prompted for a password!"
echo "127.0.0.1 ${WORDPRESS_URL}" | sudo tee -a /etc/hosts
sleep 1

echo -e "Spinning up Docker containers..."
docker compose up -d
sleep 30

echo -e "Installation is complete! 🔥"
sleep 1

echo -e "Visit https://${WORDPRESS_URL}/wp-admin to log into WordPress."
echo -e "username: ${WORDPRESS_USERNAME}"
echo -e "password: ${WORDPRESS_PASSWORD}"
exit 0


