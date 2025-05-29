import prisma from '@/tools/prismaDB';
import { NextResponse } from 'next/server';

export type SkillType = {
  id: string;
  name: string;
  colorCode: string;
  logoName?: string;
}

export async function GET() {
  try {
    const data = await prisma.skills.findMany();
    const groupedData = data.reduce((acc, item) => {
      if(!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, SkillType[]>)

    return NextResponse.json(groupedData);
  } catch (error) {
    console.error('Prisma 오류:', error);
    return NextResponse.json({ message: '에러 발생', error: error instanceof Error ? error.message : error },
      { status: 500 });
  }
}
