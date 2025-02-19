// @ts-nocheck
// Note: I only use @ts-nocheck to avoid the typescript error in the code below.

interface WalletBalance {
    currency: string;
    amount: number;
}
interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
}

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => getPriority(balance.currency) > -99 && balance.amount > 0)
    .sort((lhs: WalletBalance, rhs: WalletBalance) => getPriority(lhs.currency) - getPriority(rhs.currency));
  }, [balances]);

  const formattedBalances = useMemo(() => {
    return sortedBalances.map((balance: WalletBalance) => ({
        ...balance,
        formatted: balance.amount.toFixed(),
      }));
  }, [sortedBalances]);

  const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const price = prices[balance.currency] ?? 0;
    const usdValue = price * balance.amount;
    return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
    );
  });

  return <div {...rest}>{rows}</div>;
}