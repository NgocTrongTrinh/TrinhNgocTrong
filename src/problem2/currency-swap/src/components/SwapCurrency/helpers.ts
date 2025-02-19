import * as yup from "yup";

export const TOKEN_ICON_URL = "https://raw.githubusercontent.com/Switcheo/token-icons/refs/heads/main/tokens/";
export const DEFAULT_TOKEN_ICON = "assets/99tech-logo1.png";

export enum CurrencySwapFormKey {
  FROM_TOKEN = "fromToken",
  TO_TOKEN = "toToken",
  AMOUNT = "amount",
}

export const formSchema = yup.object({
  fromToken: yup.string().required("Select a token to swap from"),
  toToken: yup.string().required("Select a token to swap to"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than zero")
    .required("Enter an amount"),
});
