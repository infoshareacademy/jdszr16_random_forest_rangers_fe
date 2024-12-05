"use client";
import React, { useState } from "react";
import { Checkbox } from "antd";
import type { CheckboxProps } from "antd";
import type { InputNumberProps } from "antd";
import { InputNumber, Input, Button } from "antd";

const { TextArea } = Input;

export default function MoreInfo() {
  const [isDoctor, setIsDoctor] = useState(0);
  const [descriptionLength, setDescriptionLength] = useState(5);
  const [disease, setDisease] = useState("");
  const [diseaseDescription, setDiseaseDescription] = useState("");

  const onChecboxChange: CheckboxProps["onChange"] = (e) => {
    console.log("e", e.target.checked);
    if (e.target.checked) {
      setIsDoctor(1);
    } else {
      setIsDoctor(0);
    }
  };

  const onLengthChange: InputNumberProps["onChange"] = (value) => {
    setDescriptionLength(Number(value) || 5);
  };

  const onDiseaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisease(e.target.value);
  };

  const onSubmit = async () => {
    const href = `https://jdszr16-random-forest-rangers-be.onrender.com/illness_more_info?difficulty=${isDoctor}&length=${descriptionLength}&subject=${disease}`;

    try {
      const response = await fetch(
        href
        //   , {
        // method: 'GET',
        // headers: {
        //   'Content-Type': 'application/json',
        // },

        // }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setDiseaseDescription(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <span style={{ fontSize: 14, marginRight: 20 }}>
        {" "}
        Dlugość opisu choroby (ilosc zdań){" "}
        <InputNumber
          min={5}
          max={30}
          defaultValue={5}
          onChange={onLengthChange}
        />
      </span>
      <Checkbox onChange={onChecboxChange}>Jestem lekarzem</Checkbox>
      <Input
        style={{ width: 300, marginLeft: 20, marginRight: 20 }}
        placeholder="Wpisz chorobe (tylko dla testow)"
        onChange={onDiseaseChange}
      />
      <Button type="primary" onClick={onSubmit}>
        Submit
      </Button>

      <div>
        <TextArea
          rows={10}
          style={{ width: 1000, marginTop: 20 }}
          value={diseaseDescription}
          placeholder="Opis choroby"
        />
      </div>
    </div>
  );
}
