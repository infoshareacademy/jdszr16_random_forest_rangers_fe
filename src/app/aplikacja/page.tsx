"use client";

import React, { useState, useEffect } from "react";

import { Form } from "antd";
import FormItems from "./formItems";
// import MoreInfo from "./moreInfo";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Renderuj tylko po stronie klienta

  return (
    <div>
      <Form
        layout="horizontal"
        name="basic"
        labelCol={{ span: 16 }}
        // wrapperCol={{ span: 8 }}
        autoComplete="off"
      >
        <FormItems />
      </Form>
      {/*<Divider style={{ marginTop: 60 }} orientation="left" plain>*/}
      {/*  Dodatkowe informacje o chorobie*/}
      {/*</Divider>*/}
    </div>
  );
}
