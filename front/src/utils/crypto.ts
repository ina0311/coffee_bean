import crypto from 'crypto-js'

const encryptString = (input: string): string => {
  const cryptoKey = import.meta.env.VITE_CRYPTO_KEY

  if (!cryptoKey) throw new Error('CRYPTO_KEY is not defined')

  const encrypted = crypto.AES.encrypt(input, cryptoKey).toString()
  return encrypted
}

export { encryptString }
