import React ,{useState} from 'react'
import "animate.css"
import "@ant-design/v5-patch-for-react-19"
import { Button, Card, Form, InputNumber, Select, Tooltip,message,Empty } from 'antd'
import {Copy} from "lucide-react"
import {faker} from '@faker-js/faker'
import {nanoid} from 'nanoid'
import SyntaxHighlighter from "react-syntax-highlighter"
import {a11yDark} from "react-syntax-highlighter/dist/esm/styles/prism"



const App = () => {

  const designations = [
   'manager',
   "front end developer",
   "android developer",
   "cto",
   "ceo",
   "backend developer"

  ]
  const getDesignation =()=>{
   const index = Math.floor( Math.random() *designations.length)
   return designations[index]
  }

  const [payload , setPayload] = useState("")


  const generateUser= ()=>{
    return {
      id:nanoid(),
      fullname:faker.person.fullName,
      email: faker.internet.email,
      mobile:faker.phone.number({style:'international'}),
      gender:faker.person.gender(),
      address:faker.location.streetAddress({useFullAddress:true}),
      city:faker.location.city(),
      state:faker.location.state(),
      countary:faker.location.country(),
      pincode:faker.location.zipCode(),
      createdAt:faker.date.anytime()

    }

  }

  

  const generateProducts= ()=>{
    return {
      id:nanoid(),
      title:faker.commerce.productName(),
      description:faker.commerce.productDescription(),
      price:Number(faker.commerce.price()),
      discount:Number(faker.commerce.price({min : 0 ,max:50})),
      rating:Number(faker.commerce.price({min : 0 ,max:5})),
      category:faker.commerce.productAdjective(),
      brand:faker.company.buzzNoun(),
      image:faker.image.urlLoremFlickr({category:'product'}),
      createdAt:faker.date.anytime()


    }

  }


    const generatePayments= ()=>{
    return {
      id:nanoid(),
      user:{
      id:nanoid(),
      fullname:faker.person.fullName,
      email: faker.internet.email,
      mobile:faker.phone.number({style:'international'})
      },
      product:{
         id:nanoid(),
      title:faker.commerce.productName()
      },
      amount:Number(faker.commerce.price()),
      orderId:`OID-${nanoid()}`,
      transctionId:`TSC-${nanoid()}`,
      method:'UPI',
      tax:Number(faker.commerce.price({min : 0 ,max:50})),
       createdAt:faker.date.anytime()


    }

  }



  const generateEmployee= ()=>{
    return {
      id:nanoid(),
      fullname:faker.person.fullName,
      email: faker.internet.email,
      mobile:faker.phone.number({style:'international'}),
      salary:Number(faker.commerce.price()),
      designation: getDesignation(),

      gender:faker.person.gender(),
      address:faker.location.streetAddress({useFullAddress:true}),
      city:faker.location.city(),
      state:faker.location.state(),
      countary:faker.location.country(),
      pincode:faker.location.zipCode(),
      createdAt:faker.date.anytime()

    }

  }

  const genrateData= (values)=>
    {
      const tmp =[]
      for(let i = 0; i< values.noOfData; i++){
        if(values.data==="users")
      {
        tmp.push(generateUser())
       

      }

       else if(values.data==="products")
      {
        tmp.push(generateProducts())
       

      }

       else if(values.data==="payments")
      {
        tmp.push(generatePayments())
       

      }

       else if(values.data==="employees")
      {
        tmp.push(generateEmployee())
       

      }

      }

      const str = JSON.stringify(tmp,null,4)
      setPayload(str)

  }

  const onCopy = ()=>{
    navigator.clipboard.writeText(payload)
     message:success("data coppied")
    

  }



  return (
    <div className = "min-h-screen bg-gray-200 py-10 ">
      <div className='w-9/12 mx-auto flex flex-col gap-12 '>
      <div className='text-center' >
        <h1 className='text-3xl font-bold '>Dummy Json Generator</h1>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis aspernatur molestiae, amet rerum consequuntur 
          impedit dolore. Neque error suscipit corporis repudiandae earum dignissimos ullam labore impedit repellendus, 
          distinctio cum vitae voluptatem mollitia, quas quod!

        </p>
      </div>
      <Card>
        <Form className='flex gap-8' layout='vertical' onFinish={genrateData} initialValues={{
          data:"users",
          noOfData:24
        }}>
          <Form.Item label="Choose Data"
          name="data"
          rules={[{required:true}]}
          className='w-full'>
            <Select size='large' placeholder="Choose Data">
              <Select.Option value="users">Users</Select.Option>
              <Select.Option value="products">Products</Select.Option>
              <Select.Option value="payments">Payments</Select.Option>
              <Select.Option value="employees">Employees</Select.Option>

            </Select>
          </Form.Item>
          

         <Form.Item label="Number of Data "
          name="noOfData"
          rules={[{required:true}]}
          className='w-full'>

            <InputNumber size="large"
            placeholder='Enter number of data'
            className='!w-full'
            max={100}/>
            
    
          </Form.Item>

          <Form.Item
          label=" ">
            <Button htmlType='submit' size='large' type='primary'>Generate</Button>
          </Form.Item>
        </Form>



      </Card>
      {
        payload.length == 0  ? 
        <Empty description = "Click genrate button to get first payload"/>:
         <Card title = "Users" extra ={
      <Tooltip title ="Copy data">
        <Copy onClick={onCopy} />

      </Tooltip>
     }>
      <SyntaxHighlighter language='javascript' style={a11yDark} showLineNumbers>
          {payload}
          </SyntaxHighlighter> 

     </Card>

      }

    

      
      

      </div>

     




    </div>
  )
}

export default App