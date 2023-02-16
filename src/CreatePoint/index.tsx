import { Button, Input, Form, Toast } from 'antd-mobile'
import ImageUploader, {
  ImageUploadItem,
} from 'antd-mobile/es/components/image-uploader'
import * as qiniu from 'qiniu-js'
import axios from 'axios'

async function onUpload(file: File): Promise<ImageUploadItem> {
  const {
    data: { uploadToken },
  } = await axios.get('/api/qiniu-upload-token')
  const imagePath = `point-imgs/point-img-${Date.now()}`
  const imageUrl = `https://static.luxianpo.com/${imagePath}`

  const observable = qiniu.upload(file, imagePath, uploadToken)
  return new Promise((resolve) => {
    observable.subscribe({
      complete: (res) => {
        console.log(res)
        resolve({
          url: imageUrl,
        })
      },
    }) // 上传开始
  })
}

export default function CreatePoint() {
  const [form] = Form.useForm()

  return (
    <Form
      form={form}
      onFinish={async (value) => {
        await axios.post('/api/create-point', value)
        Toast.show({
          content: '创建成功',
        })
        form.resetFields()
      }}
      footer={
        <Button color="primary" block type="submit">
          提交
        </Button>
      }
    >
      <Form.Item name="imgList" label="上传图片">
        <ImageUploader upload={onUpload} columns={2}></ImageUploader>
      </Form.Item>

      <Form.Item name="text" label="词语">
        <Input placeholder="输入词语"></Input>
      </Form.Item>
    </Form>
  )
}
