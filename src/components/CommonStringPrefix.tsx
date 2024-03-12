"use client";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  inputValue: yup
    .string()
    .required("Please enter some strings separated by commas.")
    .test(
      "has-comma",
      "Input should contain at least two strings separated by a comma",
      (value) => !!value && value.includes(",")
    )
    .test(
      "valid-strings",
      "Strings must only contain lower-case letters and be 200 characters or less",
      (value) => {
        return (
          !!value &&
          value.split(",").every((str) => /^[a-z\s]{0,200}$/.test(str.trim()))
        );
      }
    )
    .test(
      "max-words",
      "Input should contain no more than 200 words separated by commas",
      (value) => !!value && value.split(",").length <= 200
    ),
});

// ฟังก์ชันหาคำนำร่วมที่ยาวที่สุด
function findLongestCommonPrefix(strs: string[]): string {
  if (strs.length === 0) return "";
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === "") return "";
    }
  }
  return prefix;
}

function CommonStringPrefix() {
  const formik = useFormik({
    initialValues: { inputValue: "" },
    validationSchema: validationSchema, // ใช้ Yup schema สำหรับการตรวจสอบ
    onSubmit: (values) => {
      // แยกสตริงตาม comma แล้วตัดช่องว่าง
      const strs = values.inputValue.split(",").map((str) => str.trim());
      // ค้นหาคำนำร่วมที่ยาวที่สุด
      const prefix = findLongestCommonPrefix(strs);
      // แสดงผล (ที่นี่เราใช้ alert แต่คุณสามารถเลือกวิธีอื่นได้)
      alert(
        `Longest common prefix: ${
          prefix ? prefix : "There is no common prefix among the input strings."
        }`
      );
    },
  });

  return (
    <div className="container bg-white p-5">
        <h1 className="text-center pb-5 text-3xl font-bold">Find the longest common prefix string</h1>
        <form onSubmit={formik.handleSubmit}>
      <div>
        <label
          htmlFor="inputValue"
          className="block mb-2 font-medium text-gray-900"
        >
          Enter strings separated by commas
        </label>
        <textarea
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="inputValue"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.inputValue}
          placeholder="Enter strings separated by commas"
        />

        {formik.touched.inputValue && formik.errors.inputValue ? (
          <div className="alertMessage text-red-500 text-sm">{formik.errors.inputValue}</div>
        ) : null}

        <div className=" text-right pt-3">
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          Search
        </button>
        </div>
  
      </div>
    </form>
    </div>

  );
}

export default CommonStringPrefix;
