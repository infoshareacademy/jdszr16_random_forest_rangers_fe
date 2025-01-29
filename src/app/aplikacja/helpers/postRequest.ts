import config from "../../../config";
import { FieldType } from "../types/formTypes";

export const sendFormValues = async (formValues: FieldType, url: string) => {
  const host: string = `${config.apiBaseUrl}`;
  const api: string = `${host}${url}`;

  console.log("vormValues", formValues);

  try {
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};
