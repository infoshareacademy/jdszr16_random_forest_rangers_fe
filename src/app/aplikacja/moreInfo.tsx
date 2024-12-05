"use client";
import React, { useState } from "react";
import { Checkbox } from "antd";
import type { CheckboxProps } from "antd";
import type { InputNumberProps } from "antd";
import { InputNumber, Input, Button } from "antd";

const { TextArea } = Input;

export default function MoreInfo() {
  const [isDoctor, setIsDoctor] = useState(0);
  const [isTreatment, setIsTreatment] = useState(0);
  const [descriptionLength, setDescriptionLength] = useState(10);
  const [disease, setDisease] = useState("");
  const [diseaseDescription, setDiseaseDescription] = useState("");
  const [treatmentDesc, setTreatmentDesc] = useState('');


  const onChecboxChange: CheckboxProps["onChange"] = (e) => {
    console.log("e", e.target.checked);
    if (e.target.checked) {
      setIsDoctor(1);
    } else {
      setIsDoctor(0);
    }
  };
  const onTreatmentChange: CheckboxProps["onChange"] = (e) => {
    console.log("e", e.target.checked);
    if (e.target.checked) {
      setIsTreatment(1);
    } else {
      setIsTreatment(0);
    }
  };
  const onLengthChange: InputNumberProps["onChange"] = (value) => {
    setDescriptionLength(Number(value) || 10);
  };

  const onDiseaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisease(e.target.value);
  };

  const onSubmit = async () => {
    const href = `https://jdszr16-random-forest-rangers-be.onrender.com/illness_more_info?difficulty=${isDoctor}&length=${descriptionLength}&subject=${disease}&istreatment=${isTreatment}`;

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
      <span style={{fontSize: 14, marginRight: 20}}>
        {" "}
        Dlugość opisu choroby (ilosc zdań){" "}
        <InputNumber
            min={5}
            max={30}
            defaultValue={10}
            onChange={onLengthChange}
        />
      </span>
        <Checkbox onChange={onChecboxChange}>Jestem lekarzem</Checkbox>
        <Checkbox style={{marginLeft: 20}} onChange={onTreatmentChange}>Dodaj plany leczenia</Checkbox>
        <Input
            style={{width: 300, marginLeft: 20, marginRight: 20}}
            placeholder="Wpisz chorobe (tylko dla testow)"
            onChange={onDiseaseChange}
        />
        <Button type="primary" onClick={onSubmit}>
          Submit
        </Button>

        <div>
          <TextArea
              rows={10}
              style={{width: 1000, marginTop: 20}}
              value={diseaseDescription}
              placeholder="Opis choroby"
          />
        </div>
        <div>
          { treatmentDesc && <TextArea
              rows={10}
              style={{width: 1000, marginTop: 20}}
              value={treatmentDesc}
          />}
        </div>
      </div>
  );
}
