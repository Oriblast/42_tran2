#!/bin/sh
set -e
pnpm install
pnpm run dev
# sudo chown -R $USER:$USER frontend/.pnpm-store frontend/node_modules