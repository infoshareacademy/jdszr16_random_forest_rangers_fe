"use client";
import React, { useState } from "react";
import type { CheckboxProps } from "antd";
import type { InputNumberProps } from "antd";
import { InputNumber, Input, Button, Flex, Spin, Checkbox } from "antd";

const { TextArea } = Input;

export default function MoreInfo() {
  const [isDoctor, setIsDoctor] = useState(false);
  const [descriptionLength, setDescriptionLength] = useState(10);
  const [diseaseInput, setDiseaseInput] = useState("");
  const [diseaseDescription, setDiseaseDescription] = useState("");
  const [treatmentDesc, setTreatmentDesc] = useState("");
  const [spinLoading, setSpinLoading] = React.useState<boolean>(false);

  const [isTreatmentActive, setIsTreatmentActive] = useState(true);
  const [isTreatmentChecked, setIsTreatmentChecked] = useState(false);

  const onChecboxChange: CheckboxProps["onChange"] = (e) => {
    console.log("doctor", e.target.checked);
    setIsDoctor(e.target.checked);
  };
  const onTreatmentChange: CheckboxProps["onChange"] = async (e) => {
    if (!e.target.checked) {
      setIsTreatmentActive(true);
      setTreatmentDesc("");
      setIsTreatmentChecked(false);
      return;
    } else {
      setIsTreatmentChecked(true);
      setSpinLoading(true);
    }

    const href = `https://jdszr16-random-forest-rangers-be.onrender.com/illness_treatment_plan?disease=${diseaseInput}`;
    try {
      const response = await fetch(href);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      setTreatmentDesc(result);
      setSpinLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const onLengthChange: InputNumberProps["onChange"] = (value) => {
    setDescriptionLength(Number(value) || 10);
  };

  const onDiseaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiseaseInput(e.target.value);
  };

  const onSubmit = async () => {
    setSpinLoading(true);
    setDiseaseDescription("");
    setIsTreatmentActive(true);
    setIsTreatmentChecked(false);
    setTreatmentDesc("");
    const href = `https://jdszr16-random-forest-rangers-be.onrender.com/illness_more_info?is_doctor=${isDoctor}&length=${descriptionLength}&disease=${diseaseInput}`;

    try {
      const response = await fetch(href);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setDiseaseDescription(result);
      setIsTreatmentActive(false);
      setSpinLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <span style={{ fontSize: 14, marginRight: 20 }}>
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
      <Checkbox
        style={{ marginLeft: 20 }}
        onChange={onTreatmentChange}
        disabled={isTreatmentActive}
        checked={isTreatmentChecked}
      >
        Plan leczenia{" "}
      </Checkbox>
      <Input
        style={{ width: 300, marginLeft: 20, marginRight: 20 }}
        placeholder="Wpisz chorobe (tylko dla testow)"
        onChange={onDiseaseChange}
      />
      <Button type="primary" onClick={onSubmit}>
        Submit
      </Button>

      <div>
        <Flex gap="middle" vertical style={{ width: 1000 }}>
          <Spin
            spinning={spinLoading}
            // size="large"
            // indicator={<LoadingOutlined spin />}
          >
            <TextArea
              rows={10}
              style={{ marginTop: 20 }}
              value={diseaseDescription}
              placeholder="Opis choroby"
            />
          </Spin>
        </Flex>
      </div>

      <div>
        {treatmentDesc && (
          <TextArea
            rows={10}
            style={{ width: 1000, marginTop: 20 }}
            value={treatmentDesc}
          />
        )}
      </div>
    </div>
  );
}
