#!/bin/bash

# AGI Frontend Container 실행 스크립트

CONTAINER_NAME="jhryu_agi_frontend"
IMAGE_NAME="agi_frontend"
FRONTEND_PORT=${1:-3000}
BACKEND_PORT=${2:-8000}

echo "🚀 AGI Frontend Container를 시작합니다..."
echo "📱 프론트엔드 포트: $FRONTEND_PORT"
echo "🔧 백엔드 포트: $BACKEND_PORT"
echo "🏷️  컨테이너 이름: $CONTAINER_NAME"

# 백엔드 컨테이너가 실행 중인지 확인
if ! docker ps -q -f name=jhryu_agi_backend | grep -q .; then
    echo "⚠️  백엔드 컨테이너가 실행되지 않았습니다!"
    echo "💡 먼저 백엔드를 실행하세요: ./run-backend.sh"
    exit 1
fi

# 기존 컨테이너가 있다면 제거
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "🗑️  기존 컨테이너를 제거합니다..."
    docker rm -f $CONTAINER_NAME
fi

# 새 컨테이너 실행
echo "🔧 새 컨테이너를 실행합니다..."
docker run -d \
    --name $CONTAINER_NAME \
    -p $FRONTEND_PORT:3000 \
    -e NODE_ENV=production \
    -e NEXT_PUBLIC_API_BASE_URL=http://localhost:$BACKEND_PORT \
    --network host \
    $IMAGE_NAME

# 실행 상태 확인
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "✅ 프론트엔드 컨테이너가 성공적으로 실행되었습니다!"
    echo "🌐 프론트엔드: http://localhost:$FRONTEND_PORT"
    echo "🔧 백엔드 API: http://localhost:$BACKEND_PORT"
    echo "📚 백엔드 문서: http://localhost:$BACKEND_PORT/docs"
    echo ""
    echo "📋 컨테이너 정보:"
    docker ps -f name=$CONTAINER_NAME
    echo ""
    echo "📝 로그 확인: docker logs $CONTAINER_NAME"
    echo "🔍 컨테이너 접속: docker exec -it $CONTAINER_NAME sh"
else
    echo "❌ 프론트엔드 컨테이너 실행에 실패했습니다."
    echo "📝 로그를 확인해보세요: docker logs $CONTAINER_NAME"
    exit 1
fi
