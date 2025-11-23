#!/bin/sh

echo "Waiting for PostgreSQL..."

until nc -z postgres 5432; do
  echo "Postgres not ready yet..."
  sleep 2
done

echo "PostgreSQL is ready!"

echo "Running migrations..."
pnpm drizzle-kit push

echo "Running seed..."
pnpm seed

echo "Starting server..."
pnpm start
