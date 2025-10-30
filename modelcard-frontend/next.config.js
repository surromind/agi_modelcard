/** @type {import('next').NextConfig} */
const nextConfig = {
  head: {
    link: [
      {
        rel: 'icon',
        href: '/favicon.ico', // favicon 전역 세팅
      },
    ],
  },
  compiler: {
    styledComponents: true, // 스타일드 컴포넌트를 지원
  },
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config; // next에서 발생하는 버그 중 하나로, .tsx file에서 async로 감싸면 생기는 문제 방지
  },

};

module.exports = nextConfig;
