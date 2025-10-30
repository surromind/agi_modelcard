#!/bin/bash

# AGI Backend Container 실행 스크립트 (개발 환경)

CONTAINER_NAME="sychung_agi_backend_dev"
IMAGE_NAME="agi_backend_dev"
PORT=${1:-8000}
SOURCE_DIR="/home/dockering/sychung/modelcard/modelcard-backend"

echo "🚀 AGI Backend Container를 시작합니다 (개발 모드)..."
echo "🔧 포트: $PORT"
echo "🏷️  컨테이너 이름: $CONTAINER_NAME"
echo "📁 소스 디렉토리: $SOURCE_DIR"

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
    echo "🔨 개발용 백엔드 이미지를 빌드합니다..."
    cd $SOURCE_DIR
    docker build -f Dockerfile.dev -t $IMAGE_NAME .
fi

# 새 컨테이너 실행 (볼륨 마운트 사용)
echo "🔧 새 컨테이너를 실행합니다 (볼륨 마운트)..."
docker run -d \
    --name $CONTAINER_NAME \
    -p $PORT:80 \
    -v "$SOURCE_DIR:/src" \
    -e DB_HOST=localhost \
    -e DB_PORT=5432 \
    -e DB_NAME=modelcard \
    -e DB_USER=postgres \
    -e DB_PASSWORD=password \
    $IMAGE_NAME

# 실행 상태 확인
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "✅ 개발용 백엔드 컨테이너가 성공적으로 실행되었습니다!"
    echo "🌐 API 엔드포인트: http://localhost:$PORT"
    echo "📚 API 문서: http://localhost:$PORT/docs"
    echo "🔄 자동 리로드: 활성화됨 (소스코드 변경 시 자동 반영)"
    echo ""
    echo "📋 컨테이너 정보:"
    docker ps -f name=$CONTAINER_NAME
    echo ""
    echo "📝 로그 확인: docker logs $CONTAINER_NAME"
    echo "🔍 컨테이너 접속: docker exec -it $CONTAINER_NAME bash"
    echo "💡 소스코드 변경사항이 실시간으로 반영됩니다!"
else
    echo "❌ 개발용 백엔드 컨테이너 실행에 실패했습니다."
    echo "📝 로그를 확인해보세요: docker logs $CONTAINER_NAME"
    exit 1
fi
