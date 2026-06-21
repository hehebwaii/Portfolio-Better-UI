#!/bin/bash

# V15.3 - NEO-BRUTALIST POP OMNI-AUTOMATION DEPLOYMENT
# Zero-touch pipeline: Git -> GitHub -> Vercel Link -> Env Vault Injection -> Production ISR

set -e

echo "[ SYSTEM ] -> INITIATING NEO-BRUTALIST OMNI-DEPLOYMENT SEQUENCE..."

echo "[ SYSTEM ] -> 1/6: EXECUTING DEPENDENCY & AUTH CHECKS..."
if ! command -v gh &> /dev/null; then
    echo "[ ERROR ] -> GitHub CLI (gh) could not be found. Please install it."
    exit 1
fi

if ! command -v vercel &> /dev/null; then
    echo "[ ERROR ] -> Vercel CLI (vercel) could not be found. Please install it."
    exit 1
fi
echo "[ SYSTEM ] -> DEPENDENCIES VERIFIED."

echo "[ SYSTEM ] -> 2/6: EXTRACTING HEADLESS VAULT ENVIRONMENT..."
if [ -f .env.local ]; then
    export $(grep -v '^#' .env.local | xargs)
    echo "[ SYSTEM ] -> NOTION KEYS LOADED INTO MEMORY."
else
    echo "[ ERROR ] -> .env.local not found. Cannot inject vault variables."
    exit 1
fi

echo "[ SYSTEM ] -> 3/6: IGNITING GIT & GITHUB PIPELINE..."
git init
git add .
git commit -m "v15.3 - Omni-Automation Deployment" || true

# Suppress errors if repo already exists
gh repo create portfolio-neo-brutalist --private --source=. --remote=origin --push || true

echo "[ SYSTEM ] -> 4/6: VERCEL PROJECT LINKING & INITIAL DEPLOY..."
vercel link --yes
vercel --prod --yes

echo "[ SYSTEM ] -> 5/6: HEADLESS VAULT INJECTION..."
echo "[ SYSTEM ] -> SECURELY PIPING KEYS TO VERCEL PRODUCTION ENVIRONMENT..."
echo "$NOTION_API_KEY" | vercel env add NOTION_API_KEY production || true
echo "$NOTION_DATABASE_ID" | vercel env add NOTION_DATABASE_ID production || true

echo "[ SYSTEM ] -> 6/6: FINAL ISR IGNITION..."
echo "[ SYSTEM ] -> TRIGGERING FINAL BUILD TO CONSUME NEW KEYS..."
vercel --prod --yes

echo "[ SYSTEM ] -> OMNI-DEPLOYMENT COMPLETE. THE ARCHITECTURE IS LIVE."
