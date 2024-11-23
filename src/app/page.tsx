'use client'


import React, {useState, useEffect} from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import styles from "./page.module.css";


type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};



const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};


export default function Home() {

  const initialValues = { username: "Jan Kowalski" };


const [isClient, setIsClient] = useState(false);
 const [resData, setResData] = useState('')

  // Ustawienie renderowania tylko na kliencie
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Renderuj tylko po stronie klienta

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {


  try {
    const response = await fetch('https://jdszr16-random-forest-rangers-be.onrender.com/test', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    setResData(data)

  } catch (error) {
    console.error('Error:', error);
  }

};


  return (
    <div className={styles.page}>
      <main className={styles.main}>
         <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={initialValues}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>




    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>

        {resData.value}

      </main>



    </div>
  );
}
