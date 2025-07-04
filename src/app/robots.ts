import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/auth/'], // 프라이빗 경로는 차단
    },
    sitemap: 'https://mbti-platform.vercel.app/sitemap.xml', // 실제 도메인으로 변경
  };
}