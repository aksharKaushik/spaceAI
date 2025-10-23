#!/bin/bash

echo "🚀 Starting Employee Directory Application"
echo "=========================================="

# Kill any existing processes
pkill -f "node simple-server.js" 2>/dev/null
pkill -f "next dev" 2>/dev/null

# Start backend
echo "📦 Starting Backend (GraphQL API)..."
cd backend
node simple-server.js &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend
echo "🎨 Starting Frontend (Next.js)..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Applications started successfully!"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:4000"
echo "📊 GraphQL Playground: http://localhost:4000"
echo ""
echo "Press Ctrl+C to stop both applications"

# Wait for user to stop
wait

# Cleanup
kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
echo ""
echo "👋 Applications stopped"
