// app/api/user/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized-test', session:session }, { status: 401 });
  }
  
  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('oauth_id', session.user.id)
    .single();
  
  return Response.json(user);
}