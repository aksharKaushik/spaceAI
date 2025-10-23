#!/bin/bash

echo "🚀 Starting Employee Directory Application"
echo "=========================================="

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first:"
    echo "   brew services start mongodb-community"
    echo "   or"
    echo "   mongod"
    echo ""
    read -p "Press Enter to continue anyway..."
fi

# Start backend
echo "📦 Starting Backend (GraphQL API)..."
cd backend
npm install
npm run seed
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🎨 Starting Frontend (Next.js)..."
cd ../frontend
npm install
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
