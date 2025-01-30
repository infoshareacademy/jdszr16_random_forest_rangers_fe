"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";

import {
  Button,
  Form,
  Input,
  InputNumber,
  Col,
  Row,
  Select,
  type CheckboxProps,
} from "antd";
import { FieldType } from "./types/formTypes";
import { sendFormValues } from "./helpers/postRequest";

import { defaultValues } from "./defaults";

import MoreInfo from "@/app/aplikacja/moreInfo";

function calculateBMI(weight: number, height: number) {
  if (weight <= 0 || height <= 0) {
    throw new Error("Waga i wzrost muszą być większe od zera.");
  }
  const heightInMeters = height / 100; // Konwersja wzrostu na metry
  return (weight / (heightInMeters * heightInMeters)).toFixed(2); // Wynik zaokrąglony do 2 miejsc po przecinku
}

export default function FormItems() {
  const [isDoctor, setIsDoctor] = useState(false);
  const [spinLoading, setSpinLoading] = useState(false);

  const [diseaseDescription, setDiseaseDescription] = useState("");

  const onDoctorChange: CheckboxProps["onChange"] = (e): any => {
    console.log("e", e.target.checked);
    setIsDoctor(e.target.checked);
  };

  const onLabelClick = async (ilness: string, value: string) => {
    console.log(ilness, value);
    setSpinLoading(true);
    setDiseaseDescription("");
    // setIsTreatmentActive(true);
    // setIsTreatmentChecked(false);
    // setTreatmentDesc("");

    // const href = `https://jdszr16-random-forest-rangers-be.onrender.com/illness_more_info?is_doctor=${isDoctor}&length=${3}&disease=${ilness}&value=${value}`;
    // const href = `http://localhost:8000/illness_more_info?is_doctor=${isDoctor}&length=${3}&disease=${ilness}&value=${value}`;
    const href = `https://jdszr16-random-forest-rangers-be.onrender.com/illness_more_info?is_doctor=${isDoctor}&length=${3}&disease=${ilness}&value=${value}`;

    try {
      const response = await fetch(href);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setDiseaseDescription(result);
      // setIsTreatmentActive(false);
      setSpinLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [formValues, setFormValues] = useState<FieldType>(
    defaultValues as FieldType
  );

  // const [modelPrediction, setModelPrediction] = useState<number>(0);

  const onAgeChange = (value: number | null) => {
    setFormValues((prev) => ({ ...prev, age: value || 0 }));
  };

  const onEducationChange = (value: number) => {
    if (value === 0) {
      value = 1;
    }

    if (value === 5) {
      value = 4;
    }

    setFormValues((prev) => ({
      ...prev,
      education: value,
    }));
  };

  const onSexChange = (value: number) => {
    setFormValues((prev) => ({ ...prev, sex: value }));
  };

  const onCigsPerDayChange = (value: number | null) => {
    setFormValues((prev) => ({ ...prev, cigsPerDay: value || 0 }));
  };

  const onBPMedsChange = (value: number | null) => {
    setFormValues((prev) => ({ ...prev, BPMeds: value || 0 }));
  };

  const onStrokeChange = (value: number | null) => {
    setFormValues((prev) => ({ ...prev, prevalentStroke: value || 0 }));
  };

  const onHypChange = (value: number | null) => {
    setFormValues((prev) => ({ ...prev, prevalentHyp: value || 0 }));
  };

  const onDiabetesChange = (value: number | null) => {
    setFormValues((prev) => ({ ...prev, diabetes: value || 0 }));
  };

  const onTotCholChange = (value: number | null) => {
    setFormValues((prev) => ({ ...prev, totChol: value || 0 }));
  };

  const onSysBPChange = (value: number | null) => {
    setFormValues((prev) => ({ ...prev, sysBP: value || 0 }));
  };

  const onDiaBPChange = (value: number | null) => {
    setFormValues((prev) => ({ ...prev, diaBP: value || 0 }));
  };

  const onGlucoseChange = (value: number | null) => {
    setFormValues((prev) => ({ ...prev, glucose: value || 0 }));
  };

  const onWzrostChange = (value: number | null) => {
    const weight = formValues?.waga || 0;
    const bmiValue = calculateBMI(weight, value || 0);
    setFormValues((prev) => ({
      ...prev,
      wzrost: value || 0,
      BMI: Number(bmiValue),
    }));
  };

  const onWagaChange = (value: number | null) => {
    console.log("value", formValues);
    const height = formValues?.wzrost || 0;
    const bmiValue = calculateBMI(value || 0, height);
    setFormValues((prev) => ({
      ...prev,
      waga: value || 0,
      BMI: Number(bmiValue),
    }));
  };
  const onSubmit = async () => {
    setSpinLoading(true);
    const updatedFormValues = { ...formValues };
    delete updatedFormValues.waga;
    delete updatedFormValues.wzrost;

    const resData: any = await sendFormValues(
      /* eslint-disable @typescript-eslint/no-explicit-any */
      { formValues: updatedFormValues, isDoctor: isDoctor } as any,
      "/predict"
    );

    // setModelPrediction(resData?.probability);
    setDiseaseDescription(resData?.illnessInfo);
    setSpinLoading(false);
  };

  return (
    <>
      <Row>
        <Col span={6}>
          <Form.Item<FieldType>
            label="Wiek"
            name="age"
            rules={[{ required: true, message: "Wprowadz wiek" }]}
          >
            <InputNumber
              min={0}
              max={100}
              defaultValue={formValues.age}
              onChange={onAgeChange}
              value={formValues.age}
            />
          </Form.Item>
        </Col>

        <Col span={7}>
          <Form.Item<FieldType>
            label="Wykształcenie"
            name="education"
            rules={[{ required: true, message: "Wybierz płeć" }]}
          >
            <Select
              defaultValue={formValues.education}
              onChange={onEducationChange}
            >
              <Select.Option value={0}>Podstawowe</Select.Option>
              <Select.Option value={1}>Zawodowe</Select.Option>
              <Select.Option value={2}>Średnie</Select.Option>
              <Select.Option value={3}>Wyższe</Select.Option>
              <Select.Option value={4}>Podyplomowe</Select.Option>
              <Select.Option value={5}>Doktorat</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item<FieldType>
            label="Płeć"
            name="sex"
            rules={[{ required: true, message: "Wybierz płeć" }]}
          >
            <Select defaultValue={formValues.sex} onChange={onSexChange}>
              <Select.Option value={1}>Mężczyzna</Select.Option>
              <Select.Option value={0}>Kobieta</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Form.Item<FieldType>
            label="Wzrost"
            name="wzrost"
            rules={[{ required: true, message: "Podaj wzrost" }]}
          >
            <InputNumber
              min={0}
              max={500}
              defaultValue={formValues.wzrost}
              onChange={onWzrostChange}
              value={formValues.wzrost}
            />
            <span> cm</span>
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item<FieldType>
            label="Waga"
            name="waga"
            rules={[{ required: true, message: "Podaj wagę" }]}
          >
            <InputNumber
              min={0}
              max={500}
              defaultValue={formValues.waga}
              onChange={onWagaChange}
              value={formValues.waga}
            />{" "}
            <span> kg</span>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item<FieldType>
            label={
              <span
                onClick={() => onLabelClick("BMI", formValues.BMI.toString())}
                style={{ cursor: "pointer" }}
              >
                BMI
              </span>
            }
            rules={[{ required: true, message: "Podaj wartość BMI" }]}
          >
            <Input value={formValues.BMI} readOnly disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Form.Item<FieldType>
            label="Liczba papierosów dziennie"
            name="cigsPerDay"
            rules={[{ required: true, message: "Podaj liczbę papierosów" }]}
          >
            <InputNumber
              min={0}
              max={100}
              defaultValue={formValues.cigsPerDay}
              onChange={onCigsPerDayChange}
              value={formValues.cigsPerDay}
            />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item<FieldType>
            label="Leki na ciśnienie"
            name="BPMeds"
            rules={[
              {
                required: true,
                message: "Podaj, czy przyjmujesz leki na ciśnienie",
              },
            ]}
          >
            <Select defaultValue={formValues.BPMeds} onChange={onBPMedsChange}>
              <Select.Option value={1}>Tak</Select.Option>
              <Select.Option value={0}>Nie</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item<FieldType>
            label="Glukoza"
            name="glucose"
            rules={[{ required: true, message: "Podaj poziom glukozy" }]}
          >
            <InputNumber
              min={0}
              max={500}
              defaultValue={formValues.glucose}
              onChange={onGlucoseChange}
              value={formValues.glucose}
            />{" "}
            mg/dL
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Form.Item<FieldType>
            label="Przebyty udar"
            name="prevalentStroke"
            rules={[{ required: true, message: "Podaj, czy miałeś udar" }]}
          >
            <Select
              defaultValue={formValues.prevalentStroke}
              onChange={onStrokeChange}
            >
              <Select.Option value={1}>Tak</Select.Option>
              <Select.Option value={0}>Nie</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={7}>
          <Form.Item<FieldType>
            label={
              <span
                onClick={() =>
                  onLabelClick(
                    "Nadciśnienie",
                    formValues.prevalentHyp ? "Tak" : "Nie"
                  )
                }
                style={{ cursor: "pointer" }}
              >
                Nadciśnienie
              </span>
            }
            name="prevalentHyp"
            rules={[
              { required: true, message: "Podaj, czy masz nadciśnienie" },
            ]}
          >
            <Select
              defaultValue={formValues.prevalentHyp}
              onChange={onHypChange}
            >
              <Select.Option value={1}>Tak</Select.Option>
              <Select.Option value={0}>Nie</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item<FieldType>
            label={
              <span
                onClick={() =>
                  onLabelClick("Cukrzyca", formValues.diabetes ? "Tak" : "Nie")
                }
                style={{ cursor: "pointer" }}
              >
                Cukrzyca
              </span>
            }
            name="diabetes"
            rules={[{ required: true, message: "Podaj, czy masz cukrzycę" }]}
          >
            <Select
              defaultValue={formValues.diabetes}
              onChange={onDiabetesChange}
            >
              <Select.Option value={1}>Tak</Select.Option>
              <Select.Option value={0}>Nie</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Form.Item<FieldType>
            label={
              <span
                onClick={() =>
                  onLabelClick("Cholesterol", formValues.totChol.toString())
                }
                style={{ cursor: "pointer" }}
              >
                Cholesterol
              </span>
            }
            name="totChol"
            rules={[{ required: true, message: "Podaj poziom cholesterolu" }]}
          >
            <InputNumber
              min={0}
              max={500}
              defaultValue={formValues.totChol}
              onChange={onTotCholChange}
              value={formValues.totChol}
            />{" "}
            <span>mg/dL</span>
          </Form.Item>
        </Col>

        <Col span={7}>
          <Form.Item<FieldType>
            label={
              <span
                onClick={() =>
                  onLabelClick(
                    "Ciśnienie skurczowe",
                    formValues.sysBP.toString()
                  )
                }
                style={{ cursor: "pointer" }}
              >
                Ciśnienie skurczowe
              </span>
            }
            name="sysBP"
            rules={[{ required: true, message: "Podaj ciśnienie skurczowe" }]}
          >
            <InputNumber
              min={0}
              max={300}
              defaultValue={formValues.sysBP}
              onChange={onSysBPChange}
              value={formValues.sysBP}
            />
            <span> mmHg</span>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item<FieldType>
            label="Ciśnienie rozkurczowe"
            name="diaBP"
            rules={[{ required: true, message: "Podaj ciśnienie rozkurczowe" }]}
          >
            <InputNumber
              min={0}
              max={200}
              defaultValue={formValues.diaBP}
              onChange={onDiaBPChange}
              value={formValues.diaBP}
            />
            <span> mmHg</span>
          </Form.Item>
        </Col>
      </Row>
      <Row></Row>

      <Row>
        <Col span={6}>
          <Form.Item label={null}>
            <Button type="primary" onClick={onSubmit}>
              Wyślij
            </Button>
          </Form.Item>
        </Col>
      </Row>

      <MoreInfo
        onDoctorChange={() => onDoctorChange}
        isDoctor={isDoctor}
        setIsDoctor={setIsDoctor}
        spinLoading={spinLoading}
        diseaseDescription={diseaseDescription}
        // onInfoSubmit={onInfoSubmit}
      />
    </>
  );
}
