import crypto from 'crypto-js'

const encryptString = (input: string): string => crypto.SHA256(input).toString()

export { encryptString }
