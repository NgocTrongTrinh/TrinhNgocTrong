import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  InputAdornment,
  Stack,
} from "@mui/material";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { CurrencySwapFormKey, formSchema } from "./helpers";
import { FormValues, Token } from "./types";
import TokenSelect from "./TokenSelect";
import TokenIcon from "./TokenIcon";

const CurrencySwap: React.FC = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: { fromToken: "", toToken: "", amount: 0 },
  });

  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  const fromToken = watch(CurrencySwapFormKey.FROM_TOKEN);
  const toToken = watch(CurrencySwapFormKey.TO_TOKEN);
  const amount = watch(CurrencySwapFormKey.AMOUNT);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await axios.get<{ currency: string; price: number }[]>(
          "https://interview.switcheo.com/prices.json"
        );
        const latestPrices: Record<string, number> = response.data.reduce(
          (
            acc: Record<string, number>,
            curr: { currency: string; price: number }
          ) => {
            acc[curr.currency] = curr.price;
            return acc;
          },
          {}
        );

        setTokens(
          Object.entries(latestPrices).map(([id, price]) => ({
            id,
            name: id.toUpperCase(),
            price: Number(price),
          }))
        );
      } catch (error) {
        console.error("Error fetching token prices:", error);
      }
    };

    fetchTokens();
  }, []);

  useEffect(() => {
    setConvertedAmount(null);
  }, [fromToken, toToken]);

  const onSubmit = (data: FormValues) => {
    if (!data.amount || data.amount <= 0) return;
    setIsLoading(true);

    const fromPrice = tokens.find((t) => t.id === data.fromToken)?.price;
    const toPrice = tokens.find((t) => t.id === data.toToken)?.price;

    if (fromPrice && toPrice) {
      setConvertedAmount((data.amount * fromPrice) / toPrice);
    }

    setTimeout(() => {
        setIsLoading(false);
    }, 500); 
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
        bgcolor: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(10px)",
        borderRadius: 3,
        boxShadow: 4,
      }}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
          Currency Swap
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* From Token Selection */}
          <TokenSelect
            label="From"
            name={CurrencySwapFormKey.FROM_TOKEN}
            control={control}
            tokens={tokens}
            error={errors.fromToken}
          />

          {/* To Token Selection */}
          <TokenSelect
            label="To"
            name={CurrencySwapFormKey.TO_TOKEN}
            control={control}
            tokens={tokens}
            disabledTokens={fromToken}
            error={errors.toToken}
          />

          {/* Amount Input */}
          <Controller
            name={CurrencySwapFormKey.AMOUNT}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Amount"
                sx={{ my: 2 }}
                slotProps={{
                  input: {
                    endAdornment: fromToken && (
                      <InputAdornment position="end">
                        <TokenIcon id={fromToken} />
                        {fromToken.toUpperCase()}
                      </InputAdornment>
                    ),
                  },
                }}
                error={!!errors.amount}
                helperText={errors.amount?.message}
              />
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            disabled={!fromToken || !toToken || !amount || isLoading}>
            {isLoading ? <CircularProgress size={24} /> : "Swap"}
          </Button>
        </form>

        {/* Converted Amount Display */}
        {convertedAmount !== null && !isLoading && (
          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 2 }}>
            <Typography sx={{ fontSize: 16 }}>Converted Amount:</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography sx={{ fontSize: 16 }}>
                {convertedAmount.toFixed(6)}
              </Typography>
              <TokenIcon id={toToken} size={20} />
              {toToken.toUpperCase()}
            </Stack>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default CurrencySwap;
