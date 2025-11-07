export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const level = searchParams.get('level');
  
  return Response.json({ 
    message: 'GET 요청 성공!!!!',
    params: {
      name: name || '파라미터 없음',
      level: level || '파라미터 없음'
    },
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  console.log(`${body.name} & ${body.목적}`)
  return Response.json({
    message: 'POST 요청 성공!',
    receivedData: body,
    timestamp: new Date().toISOString()
  });
}