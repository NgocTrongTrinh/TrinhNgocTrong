import { Control, Controller, FieldError } from "react-hook-form";
import { CurrencySwapFormKey } from "../helpers";
import { FormValues, Token } from "../types";
import {
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import TokenIcon from "../TokenIcon";

const TokenSelect: React.FC<Props> = ({
  label,
  name,
  control,
  tokens,
  disabledTokens,
  error,
}) => {
  return (
    <FormControl fullWidth sx={{ mb: 2 }} error={!!error}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <FormLabel>{label}</FormLabel>
            <Select {...field} displayEmpty>
              <MenuItem value="" disabled>
                Select Token
              </MenuItem>
              {tokens
                .filter((token) => token.id !== disabledTokens)
                .map((token) => (
                  <MenuItem key={token.id} value={token.id}>
                    <Stack direction="row" alignItems="center">
                      <TokenIcon id={token.id} />
                      {token.name}
                    </Stack>
                  </MenuItem>
                ))}
            </Select>
          </>
        )}
      />
      {error && <Typography color="error">{error.message}</Typography>}
    </FormControl>
  );
};

type Props = {
  label: string;
  name: CurrencySwapFormKey;
  control: Control<FormValues>;
  tokens: Token[];
  disabledTokens?: string;
  error?: FieldError;
};

export default TokenSelect;
