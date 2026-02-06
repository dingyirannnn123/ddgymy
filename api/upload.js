import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // 从请求中获取图片文件
    const formData = await request.formData();
    const file = formData.get('photo');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 生成一个唯一的文件名，避免重名
    const fileName = `${Date.now()}-${file.name}`;

    // 上传文件到 Vercel Blob
    const { url } = await put(fileName, file, {
      access: 'public', // 让图片可以公开访问
    });

    // 返回图片的访问 URL
    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
