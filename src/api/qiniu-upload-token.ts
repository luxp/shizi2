import qiniu from 'qiniu'
import type { VercelRequest, VercelResponse } from '@vercel/node'

// TODO: 后面这个直接换成 js 的好了
var accessKey = 'v8KS71ioKp7tLzb7rzXdYofso5CkNO9rIwfE139M'
var secretKey = 'E3Z-ljUYJtETEkd4KSpEev3IfurdDpPOCwQgdEUu'

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

export default function handler(req: VercelRequest, res: VercelResponse) {
  const options = {
    scope: 'luxianpo',
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)

  res.status(200).json({ uploadToken, t: 'dd12312' })
}