#!/usr/bin/env bash
set -euo pipefail
cd /workspace/deltademo
npm ci --cache /workspace/.npm-cache --no-audit --no-fund
npm run build
