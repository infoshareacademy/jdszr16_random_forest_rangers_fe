"use client";

import React, { useState } from "react";

import { Button, Form, Input, InputNumber, Col, Row, Select } from "antd";
import { FieldType } from "./types/formTypes";
import { sendFormValues } from "./helpers/postRequest";

import { defaultValues } from "./defaults";

function calculateBMI(weight: number, height: number) {
  if (weight <= 0 || height <= 0) {
    throw new Error("Waga i wzrost muszą być większe od zera.");
  }
  const heightInMeters = height / 100; // Konwersja wzrostu na metry
  return (weight / (heightInMeters * heightInMeters)).toFixed(2); // Wynik zaokrąglony do 2 miejsc po przecinku
}

export default function FormItems() {
  const [formValues, setFormValues] = useState<FieldType>(
    defaultValues as FieldType
  );

  const [modelPrediction, setModelPrediction] = useState<number>(0);

  // const [isCigsPerDayDisabled, setIsCigsPerDayDisabled] = useState(true);

  const onAgeChange = (value: number | null) => {
    setFormValues((prev) => ({ ...prev, age: value || 0 }));
  };

  const onEducationChange = (value: number) => {
    console.log("value", value);
    setFormValues((prev) => ({ ...prev, education: value }));
  };

  const onSexChange = (value: number) => {
    setFormValues((prev) => ({ ...prev, sex: value }));
  };

  // const onSmokingChange = (value: number) => {
  //   setFormValues((prev) => ({ ...prev, is_smoking: value }));
  //   if (value === 0) {
  //     setIsCigsPerDayDisabled(true);
  //     setFormValues((prev) => ({ ...prev, cigsPerDay: 0 }));
  //   } else {
  //     setIsCigsPerDayDisabled(false);
  //   }
  // };

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

  // const onHeartRateChange = (value: number | null) => {
  //   setFormValues((prev) => ({ ...prev, heartRate: value || 0 }));
  // };

  const onGlucoseChange = (value: number | null) => {
    setFormValues((prev) => ({ ...prev, glucose: value || 0 }));
  };

  const onWzrostChange = (value: number | null) => {
    const weight = formValues?.waga || 0;
    const bmiValue = calculateBMI(weight, value || 0);
    setFormValues((prev) => ({
      ...prev,
      wzrost: value || 0,
      bmi: Number(bmiValue),
    }));
  };

  const onWagaChange = (value: number | null) => {
    const height = formValues?.wzrost || 0;
    const bmiValue = calculateBMI(value || 0, height);
    setFormValues((prev) => ({
      ...prev,
      waga: value || 0,
      bmi: Number(bmiValue),
    }));
  };
  const onSubmit = async () => {
    const updatedFormValues = { ...formValues };
    delete updatedFormValues.waga;
    delete updatedFormValues.wzrost;
    const resData = await sendFormValues(updatedFormValues, "/predict");
    setModelPrediction(resData?.prediction[0][1]);
  };

  return (
    <>
      <div style = {{color: 'red'}}> Zachorujesz na {((modelPrediction || 0) * 100).toFixed(2) } % </div>
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
              // style={{ width: 150 }}
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
        {/*<Col span={6}>*/}
        {/*  <Form.Item<FieldType>*/}
        {/*    label="Czy pali"*/}
        {/*    name="is_smoking"*/}
        {/*    rules={[{ required: true, message: "Wybierz czy palisz" }]}*/}
        {/*  >*/}
        {/*    <Select*/}
        {/*      defaultValue={formValues.is_smoking}*/}
        {/*      onChange={onSmokingChange}*/}
        {/*    >*/}
        {/*      <Select.Option value={1}>Tak</Select.Option>*/}
        {/*      <Select.Option value={0}>Nie</Select.Option>*/}
        {/*    </Select>*/}
        {/*  </Form.Item>*/}
        {/*</Col>*/}

        <Col span={7}>
          <Form.Item<FieldType>
            label="Liczba papierosów dziennie"
            name="cigsPerDay"
            rules={[{ required: true, message: "Podaj liczbę papierosów" }]}
          >
            <div></div>
            <InputNumber
              min={0}
              max={100}
              defaultValue={formValues.cigsPerDay}
              onChange={onCigsPerDayChange}
              value={formValues.cigsPerDay}
              // disabled={isCigsPerDayDisabled}
            />
          </Form.Item>
        </Col>

        <Col span={6}>
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
            label="Nadcisnienie"
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
            label="Cukrzyca"
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
            label="Choresterol"
            name="totChol"
            rules={[{ required: true, message: "Podaj poziom cholesterolu" }]}
          >
            <InputNumber
              min={0}
              max={500}
              defaultValue={formValues.totChol}
              onChange={onTotCholChange}
              value={formValues.totChol}
            />
          </Form.Item>
        </Col>

        <Col span={7}>
          <Form.Item<FieldType>
            label="Ciśnienie skurczowe"
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
          </Form.Item>
        </Col>
      </Row>
      <Row>
        {/*<Col span={6}>*/}
        {/*  <Form.Item<FieldType>*/}
        {/*    label="Tętno  "*/}
        {/*    name="heartRate"*/}
        {/*    rules={[{ required: true, message: "Podaj tętno" }]}*/}
        {/*  >*/}
        {/*    <InputNumber*/}
        {/*      min={0}*/}
        {/*      max={200}*/}
        {/*      defaultValue={formValues.heartRate}*/}
        {/*      onChange={onHeartRateChange}*/}
        {/*      value={formValues.heartRate}*/}
        {/*    />*/}
        {/*  </Form.Item>*/}
        {/*</Col>*/}

        <Col span={7}>
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
            />
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
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item<FieldType>
            label="BMI"
            // name="bmi"
            rules={[{ required: true, message: "Podaj wartość BMI" }]}
          >
            <Input
              // defaultValue={formValues.bmi}
              // onChange={onBMIChange}
              value={formValues.BMI}
              readOnly
              disabled
            />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={6}>
          <Form.Item label={null}>
            <Button type="primary" onClick={onSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
