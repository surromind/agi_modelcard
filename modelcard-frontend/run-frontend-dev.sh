#!/bin/bash

# AGI Frontend Container 실행 스크립트 (개발 환경)

CONTAINER_NAME="sychung_agi_frontend_dev"
IMAGE_NAME="agi_frontend_dev"
FRONTEND_PORT=${1:-3000}
BACKEND_PORT=${2:-8000}
SOURCE_DIR="/home/dockering/sychung/modelcard/modelcard-frontend"

echo "🚀 AGI Frontend Container를 시작합니다 (개발 모드)..."
echo "📱 프론트엔드 포트: $FRONTEND_PORT"
echo "🔧 백엔드 포트: $BACKEND_PORT"
echo "🏷️  컨테이너 이름: $CONTAINER_NAME"
echo "📁 소스 디렉토리: $SOURCE_DIR"

# 백엔드 컨테이너가 실행 중인지 확인
if ! docker ps -q -f name=sychung_agi_backend_dev | grep -q .; then
    echo "⚠️  개발용 백엔드 컨테이너가 실행되지 않았습니다!"
    echo "💡 먼저 개발용 백엔드를 실행하세요: ./run-backend-dev.sh"
    exit 1
fi

# 기존 컨테이너가 있다면 제거
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "🗑️  기존 컨테이너를 제거합니다..."
    docker rm -f $CONTAINER_NAME
fi

# 개발용 이미지 빌드 (이미지가 없을 때만)
echo "🔍 이미지 존재 여부를 확인합니다..."
if [ "$(docker images -q $IMAGE_NAME)" ]; then
    echo "✅ 이미지가 이미 존재합니다. 빌드를 건너뜁니다."
else
    echo "🔨 개발용 프론트엔드 이미지를 빌드합니다..."
    cd $SOURCE_DIR
    docker build -f Dockerfile.dev -t $IMAGE_NAME .
fi

# 새 컨테이너 실행 (볼륨 마운트 사용)
echo "🔧 새 컨테이너를 실행합니다 (볼륨 마운트)..."
docker run -d \
    --name $CONTAINER_NAME \
    -p $FRONTEND_PORT:3000 \
    -v "$SOURCE_DIR:/app" \
    -v "/app/node_modules" \
    -e NODE_ENV=development \
    -e NEXT_PUBLIC_API_URL=http://localhost:$BACKEND_PORT \
    $IMAGE_NAME

# 실행 상태 확인
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "✅ 개발용 프론트엔드 컨테이너가 성공적으로 실행되었습니다!"
    echo "🌐 프론트엔드: http://localhost:$FRONTEND_PORT"
    echo "🔧 백엔드 API: http://localhost:$BACKEND_PORT"
    echo "🔄 자동 리로드: 활성화됨 (소스코드 변경 시 자동 반영)"
    echo "📁 볼륨 마운트: 로컬 소스코드와 실시간 동기화"
    echo ""
    echo "📋 컨테이너 정보:"
    docker ps -f name=$CONTAINER_NAME
    echo ""
    echo "📝 로그 확인: docker logs $CONTAINER_NAME"
    echo "🔍 컨테이너 접속: docker exec -it $CONTAINER_NAME sh"
    echo "💡 소스코드 변경사항이 실시간으로 반영됩니다!"
else
    echo "❌ 개발용 프론트엔드 컨테이너 실행에 실패했습니다."
    echo "📝 로그를 확인해보세요: docker logs $CONTAINER_NAME"
    exit 1
fi
