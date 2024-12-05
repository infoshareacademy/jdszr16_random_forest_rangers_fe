'use client'


import React, {useState, useEffect} from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, Divider } from 'antd';
import MoreInfo from './moreInfo';
import styles from "../page.module.css";



type FieldType = {
  holesterol?: string;
  cukier?: string;
};


const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};


export default function Home() {

  const initialValues = { holesterol: "holesterol" , cukier: "cukier" };


const [isClient, setIsClient] = useState(false);
 const [resData, setResData] = useState('')

  // Ustawienie renderowania tylko na kliencie
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Renderuj tylko po stronie klienta

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {

        console.log('values', values)

  try {
    const response = await fetch('https://jdszr16-random-forest-rangers-be.onrender.com/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
       body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    console.log('!!data', data.message)

    setResData(data.message)

  } catch (error) {
    console.error('Error:', error);
  }

};


  return (

      <div>
         <Form
    name="basic"
    labelCol={{ span: 6 }}
     wrapperCol={{ span: 16 }}
    style={{ maxWidth: 400 }}
    initialValues={initialValues}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Holesterol"
      name="holesterol"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

 <Form.Item<FieldType>
      label="Cukier"
      name="cukier"
      rules={[{ required: true, message: 'Wprowadz cukier' }]}
    >
      <Input />
    </Form.Item>


    <Form.Item label={null}>
      <Button type="primary" htmlType="submit" disabled>
        Submit
      </Button>
    </Form.Item>
  </Form>
          <Divider orientation="left" plain>
      Dodatkowe informacje o chorobie
    </Divider>

          <MoreInfo />

</div>

  );
}
