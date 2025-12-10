'use server'

import { supabase } from "../supabase"

export async function createUserProfie(userId: string, name:string, email:string) {
  return await supabase
  .from('users')
  .insert({
    oauth_id:userId,
    name,
    email,
    data: {points:10000}
  })
}

export async function signUpWithEmail(email:string, password:string, name:string) {
  try {
    const {data:authData, error: authError} = await supabase.auth.signUp({
      email, password, options: {data:{name}}
    })

    if (authError) {
      return {success:false, error:authError.message}
    }

    if(authData.user) {
      await createUserProfie(authData.user.id, name, email)
    }

    return {success:true, user:authData.user}
  } catch(error) {
    return {success:false, error:"회원가입 실패"}
  }
}