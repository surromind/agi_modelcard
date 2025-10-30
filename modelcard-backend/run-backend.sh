#!/bin/bash

# AGI Backend Container 실행 스크립트 (프로덕션 환경)

CONTAINER_NAME="sychung_agi_backend"
IMAGE_NAME="agi_backend"
PORT=${1:-8000}

echo "🚀 AGI Backend Container를 시작합니다 (프로덕션 모드)..."
echo "🔧 포트: $PORT"
echo "🏷️  컨테이너 이름: $CONTAINER_NAME"
echo "⚠️  프로덕션 모드: 소스코드 변경 시 컨테이너 재시작 필요"

# 기존 컨테이너가 있다면 제거
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "🗑️  기존 컨테이너를 제거합니다..."
    docker rm -f $CONTAINER_NAME
fi

# 백엔드 이미지 빌드
echo "🔨 백엔드 이미지를 빌드합니다..."
cd /home/dockering/sychung/modelcard/modelcard-backend
docker build -t $IMAGE_NAME .

# 새 컨테이너 실행
echo "🔧 새 컨테이너를 실행합니다..."
docker run -d \
    --name $CONTAINER_NAME \
    -p $PORT:80 \
    -e DB_HOST=localhost \
    -e DB_PORT=5432 \
    -e DB_NAME=modelcard \
    -e DB_USER=postgres \
    -e DB_PASSWORD=password \
    --network host \
    $IMAGE_NAME

# 실행 상태 확인
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "✅ 백엔드 컨테이너가 성공적으로 실행되었습니다!"
    echo "🌐 API 엔드포인트: http://localhost:$PORT"
    echo "📚 API 문서: http://localhost:$PORT/docs"
    echo ""
    echo "📋 컨테이너 정보:"
    docker ps -f name=$CONTAINER_NAME
    echo ""
    echo "📝 로그 확인: docker logs $CONTAINER_NAME"
    echo "🔍 컨테이너 접속: docker exec -it $CONTAINER_NAME bash"
    echo "💡 개발 환경을 원한다면: ./run-backend-dev.sh"
else
    echo "❌ 백엔드 컨테이너 실행에 실패했습니다."
    echo "📝 로그를 확인해보세요: docker logs $CONTAINER_NAME"
    exit 1
fi
