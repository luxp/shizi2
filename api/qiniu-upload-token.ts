import { auth as qiniuAuth, rs as qiniuRs } from 'qiniu'
import type { VercelRequest, VercelResponse } from '@vercel/node'

var accessKey = 'v8KS71ioKp7tLzb7rzXdYofso5CkNO9rIwfE139M'
var secretKey = 'E3Z-ljUYJtETEkd4KSpEev3IfurdDpPOCwQgdEUu'

const mac = new qiniuAuth.digest.Mac(accessKey, secretKey)

export default function handler(req: VercelRequest, res: VercelResponse) {
  const options = {
    scope: 'luxianpo',
  }
  const putPolicy = new qiniuRs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)

  res.status(200).json({ uploadToken })
}
