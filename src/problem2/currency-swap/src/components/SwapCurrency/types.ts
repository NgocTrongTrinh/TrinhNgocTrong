
export interface Token {
  id: string;
  name: string;
  price: number;
}

export interface FormValues {
  fromToken: string;
  toToken: string;
  amount: number;
}
