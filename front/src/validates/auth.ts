import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const authSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
})

const typedAuthSchema = toTypedSchema(authSchema)

export default typedAuthSchema