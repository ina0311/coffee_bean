export const validateEmail = (email: string): string | null => {
  if (!email) return 'メールアドレスを入力してください'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return '有効なメールアドレスを入力してください'
  }
  return null
}

export const validatePassword = (password: string): string | null => {
  if (!password) return 'パスワードを入力してください'
  if (password.length < 8) return 'パスワードは8文字以上で入力してください'
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
    return 'パスワードは英字と数字を含む8文字以上で入力してください'
  }
  return null
}

export const validateName = (name: string): string | null => {
  if (!name) return '名前を入力してください'
  if (name.length < 2) return '名前は2文字以上で入力してください'
  if (name.length > 50) return '名前は50文字以内で入力してください'
  return null
} 