import React, { use, useRef, useState } from 'react'
import { Button, Form, Input, Modal, QRCode } from 'antd'
import { Download } from 'lucide-react'

const App = () => {


   const [form] = Form.useForm()


  const divRef = useRef(null)
  const [open,setOpen] = useState(false)
  const [icon,setIcon]= useState('')


  const [qr,setQr] = useState({
    value:'https://www.coddingott.com',
    icon:'',
    bgColor:'white',
    color:'black'
  })

  const downloadNow = () => {
    const div = divRef.current
    const canvas = div.querySelector("canvas")
    const base64String = canvas.toDataURL("omage/png")
    const a = document.createElement("a")
    a.href = base64String
    a.download = "qr-code.png"
    a.click()
    a.remove()


  }


  const genrateQr = (values)=>{

   values.bgColor = values.bgColor || "white"
    values.color = values.color || "black"
    values.icon = icon
    setOpen(false)
   
    setQr((prev)=>({
      ...prev,
      ...values
    }))

  }

  const chooseFile =(e)=>{
    const file = e.target.files[0]
    const url = URL.createObjectURL(file)
    setIcon(url)

  }

  const handleClose =()=>{
    setOpen(false)
    form.resetFields()
    setIcon("")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center" >
      <h1 className='text-4xl font-bold mb-12 '> Generate - QR Code</h1>

      <div ref={divRef} className='mb-12 rounded-xl p-4 shadow-lg w-fit hover:scale-115 transition-transform duration-300 hover:shadow-2xl '>

        <QRCode
          value={qr.value}
          size={300}
          icon={qr.icon}
          bgColor= {qr.bgColor}
          color={qr.color} />




      </div>

      <div className='flex gap-4'>
        <Button size='large'
          type='primary'
          className='!bg-gradient-to-r !from-rose-600 !via-red-500 !to-rose-600 !border-none hover:!scale-105 '

          onClick={()=>setOpen(true)}>Generate Qr  </Button>


        <Button size='large'
          type='primary'
          className='!bg-gradient-to-br !from-violet-600 !via-blue-500 !to-indigo-600 !border-none hover:!scale-105 '
          icon={<Download className='w-4 h-4 ' />}
          onClick={downloadNow}>Download </Button>

      </div>

      <Modal open ={open} footer={null} onCancel={handleClose}>
        <h1 className='text-lg font-medium mb4'>Generate your Qr</h1>

        <Form onFinish={genrateQr} form={form} >
          <Form.Item
            label="URL"
            rules={[{ required: true, type: "url" }]}
            name="url">
            <Input
              size='large'
              placeholder='https://domain.com'>
            </Input>
          </Form.Item>

          <Form.Item
           label="BG Color"
           name='bgColor'
           >
            
            <Input
            type='color'
            size='large'
            >
            </Input>
          </Form.Item>


          <Form.Item
           label="Color"
           name='color'
           >
            
            <Input
            type='color'
            size='large'
            >
            </Input>
          </Form.Item>

          <Form.Item
           label="Logo"
           name='logo'
           >
            
            <Input
            type='file'
            size='large'
            accept='image/*'
            onChange={chooseFile}
            >
            </Input>
          </Form.Item>

          <Form.Item>
            <Button size='large' type='primary' htmlType='submit' >Generate</Button>
          </Form.Item>


        </Form>

      </Modal>


    </div>
  )
}

export default App