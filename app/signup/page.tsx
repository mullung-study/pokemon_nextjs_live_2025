'use client'

import { useState } from "react";
import { signUpWithEmail } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = await signUpWithEmail(email, password, name);

    if (result.success) {
      alert('회원가입 성공! 로그인 페이지로 이동합니다.');
      router.push('/api/auth/signin');
    } else {
      setError(result.error || '회원가입 실패');
    }
    
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">회원가입</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">이름</label>
            <Input 
              name="name" 
              type="text" 
              required 
              placeholder="홍길동"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">이메일</label>
            <Input 
              name="email" 
              type="email" 
              required 
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">비밀번호</label>
            <Input 
              name="password" 
              type="password" 
              required 
              placeholder="최소 6자 이상"
              minLength={6}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? '처리 중...' : '가입하기'}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600">
          이미 계정이 있나요?{' '}
          <Link href="/api/auth/signin" className="text-blue-600 hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
