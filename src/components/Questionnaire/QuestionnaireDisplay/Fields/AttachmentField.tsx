// React
import React from "react";
// Component
import DefaultField from "./DefaultField";
import { FieldConfig } from ".";

const AttachmentField: React.FC<FieldConfig> = (configs) => {

  ////////////////////////////////
  //           Refs             //
  ////////////////////////////////

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  ////////////////////////////////
  //       Form Handling        //
  ////////////////////////////////

  /**
   * A function to handle file input changes
   *
   * @param event The change event from the file input
   */
  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        // Convert file to base64
        const base64String = await convertFileToBase64(selectedFile);
        // Clean the base64 string to remove the data URL prefix
        const cleanedBase64 = cleanBase64(base64String);
        // Prepare the attachment data for FHIR
        const attachmentData = {
          contentType: selectedFile.type,
          data: cleanedBase64,
          title: selectedFile.name,
        };
        // Create a new form object with the updated attachment
        const newForm = { ...configs.form };
        // If the field is set to repeat, append the new attachment
        if (configs.field.repeat) {
          const existingValues = (newForm[configs.field.id] || []).filter(
            (value) => value !== ""
          );
          newForm[configs.field.id] = [
            ...existingValues,
            JSON.stringify(attachmentData),
          ];
        } else {
          // If not repeating, replace the existing value with the new attachment
          newForm[configs.field.id] = [JSON.stringify(attachmentData)];
        }
        configs.updateForm(newForm);
        console.log("File added:", selectedFile.name);
        console.log("Form updated:", newForm[configs.field.id]);
      }
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  /**
   * Function to convert a file to a base64 string
   *
   * @param file The file to convert
   * @returns a promise that resolves to the base64 string of the file
   */
  async function convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Clean the base64
   *
   * @param base64String
   *
   */
  const cleanBase64 = (base64String: string): string => {
    const base64DataPattern =
      /^data:(application\/octet-stream|[a-zA-Z]+\/[a-zA-Z]+);base64,/;
    return base64String.replace(base64DataPattern, "");
  };

  ////////////////////////////////
  //          Content           //
  ////////////////////////////////

  return (
    <DefaultField
      id={configs.field.id}
      prefix={configs.field.prefix}
      label={configs.field.label}
      type="file"
      placeholder={configs.field.placeholder}
      advancedRendering={configs.field.advancedRendering}
      disabled={configs.field.disabled}
      hideOnDisabled={configs.field.hideOnDisabled}
      readOnly={configs.field.readOnly}
      required={configs.field.required}
      repeat={configs.field.repeat}
      values={configs.form[configs.field.id] || [""]}
      maxLength={configs.field.maxLength}
      getValidationMessage={() => "This field is required."}
      handleChange={handleFileChange}
      form={configs.form}
      updateForm={configs.updateForm}
    />
  );
};

export default AttachmentField;
