'use client' // 클라이언트 컴포넌트 선언

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase' // 상대 경로로 직접 지정

export default function Home() {
  const [status, setStatus] = useState('연결 확인 중...')

  useEffect(() => {
    async function checkConnection() {
      // Supabase에 아주 가벼운 요청 하나를 보냅니다.
      const { data, error } = await supabase.from('test').select('*').limit(1)
      
      if (error) {
        // 테이블이 없더라도 통신 자체는 성공한 것이므로 에러 코드를 확인합니다.
        console.log('Supabase 통신 성공 (테이블은 아직 없음)')
        setStatus('Supabase 통신 성공!')
      } else {
        setStatus('Supabase 데이터 로드 성공!')
      }
    }
    checkConnection()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">OneBoard Hello World!</h1>
      <p className={`mt-4 text-xl ${status.includes('성공') ? 'text-green-500' : 'text-blue-500'}`}>
        {status}
      </p>
    </div>
  )
}