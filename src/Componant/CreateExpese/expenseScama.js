import * as yup from "yup";

export const expanseSchema = yup.object().shape({
  name: yup.string().max(140).required("Please Enter the Expense name"),
  Amount: yup
    .number()
    .positive()
    .integer()
    .required("Please! enter the amount"),
  DateOfExpance: yup.date().required("Please select the date"),
  category: yup
    .string()
    .oneOf(
      ["Health", "Electronics", "Travel", "Education", "Books", "other"],
      "Invalid expense type"
    )
    .required("Please! select the catagory"),
  description: yup.string().required("Please! enter expense details"),
});
