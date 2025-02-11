import CryptoJS from 'crypto-js'

export const encrypt = (text: string): string => {
  const key = import.meta.env.VITE_CRYPTO_KEY || 'default-key'
  return CryptoJS.AES.encrypt(text, key).toString()
}

export const decrypt = (encryptedText: string): string => {
  const key = import.meta.env.VITE_CRYPTO_KEY || 'default-key'
  const bytes = CryptoJS.AES.decrypt(encryptedText, key)
  return bytes.toString(CryptoJS.enc.Utf8)
} 