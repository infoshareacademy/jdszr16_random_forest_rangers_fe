"use client";
import React, { useState } from "react";
import { Checkbox } from "antd";
import type { CheckboxProps } from "antd";
import type { InputNumberProps } from "antd";
import { InputNumber, Input, Button } from "antd";

const { TextArea } = Input;

export default function MoreInfo() {
  const [isDoctor, setIsDoctor] = useState(false);
  // const [isTreatment, setIsTreatment] = useState(0);
  const [descriptionLength, setDescriptionLength] = useState(10);
  const [disease, setDisease] = useState("");
  const [diseaseDescription, setDiseaseDescription] = useState("");
  const [treatmentDesc, setTreatmentDesc] = useState('');
  const [isTreatmentActive, setIsTreatmentActive] = useState(true);


  const onChecboxChange: CheckboxProps["onChange"] = (e) => {
    console.log("doctor", e.target.checked);
      setIsDoctor(e.target.checked);
  };
  const onTreatmentChange: CheckboxProps["onChange"] = async (e) => {
    console.log("Plan leczenia", e.target.checked);
    if (!e.target.checked) {

      setIsTreatmentActive(true);
      setTreatmentDesc('')
      return
    }

    const href = `https://jdszr16-random-forest-rangers-be.onrender.com/illness_treatment_plan?disease=${disease}`;
     try {
      const response = await fetch( href );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      setTreatmentDesc(result);
    } catch (error) {
      console.error("Error:", error);
    }

  };
  const onLengthChange: InputNumberProps["onChange"] = (value) => {
    setDescriptionLength(Number(value) || 10);
  };

  const onDiseaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisease(e.target.value);
  };

  const onSubmit = async () => {
    const href = `https://jdszr16-random-forest-rangers-be.onrender.com/illness_more_info?isDoctor=${isDoctor}&length=${descriptionLength}&disease=${disease}`;

    try {
      const response = await fetch( href );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setDiseaseDescription(result);
      setIsTreatmentActive(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
      <div>
      <span style={{fontSize: 14, marginRight: 20}}>
        {" "}
        Dlugość opisu choroby (ilość zdań){" "}
        <InputNumber
            min={5}
            max={30}
            defaultValue={10}
            onChange={onLengthChange}
        />
      </span>
        <Checkbox onChange={onChecboxChange}>Jestem lekarzem</Checkbox>
        <Checkbox style={{marginLeft: 20}} onChange={onTreatmentChange} disabled = {isTreatmentActive}>Plan leczenia </Checkbox>
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
