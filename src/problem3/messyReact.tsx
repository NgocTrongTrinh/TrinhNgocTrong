//@ts-nocheck

// Note: Kindly check the inline comments for the issues that I could find in the code;
// for the refactored code, please check the file problem3/refactoredReact.tsx, thanks!

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

  // should use a proper type for blockchain instead of any
  const getPriority = (blockchain: any): number => {
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
    return (
      balances
        .filter((balance: WalletBalance) => {
          /*issue 1: the blockchain parameter is not exist in the WalletBalance interface
        => causing a type error.
        - solution: use balance.currency instead of balance.blockchain
        */
          const balancePriority = getPriority(balance.blockchain);

          /* issue 2: lhsPriority is not declared anywhere. it should probably be balancePriority.
        - solution: replace lhsPriority with balancePriority 
        */
          if (lhsPriority > -99) {

            /* issue 3: the logic amount <= 0 is incorrect, we should show positive balances.
        - solution: change the logic to amount > 0
        */
            if (balance.amount <= 0) {
              return true;
            }
          }
          return false;
        })

        /* issue 4: the methods filter() and sort() are separate calls, meaning the array is iterated twice
       => causing performance inefficiencies.
        - solution: combine the filter and sort logic into a single call.
      */
        .sort((lhs: WalletBalance, rhs: WalletBalance) => {
          const leftPriority = getPriority(lhs.blockchain);
          const rightPriority = getPriority(rhs.blockchain);
          if (leftPriority > rightPriority) {
            return -1;
          } else if (rightPriority > leftPriority) {
            return 1;
          }
        })
    );
    /* issue 5: the prices has no impact on the sortedBalances => incorrect useMemo dependency.
      - solution: remove prices from the dependency array of useMemo.
      */
  }, [balances, prices]);

  /* issue 6: formattedBalances is executed on every render even if sortedBalances hasn't changed.
  - solution: move the formattedBalances logic inside the useMemo hook to only execute when sortedBalances changes.
  */
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  /* issue 7: the formattedBalances variable is defined but not used.
    The rows variable uses sortedBalances instead of formattedBalances, that's very likely a mistake.
    - solution: use formattedBalances instead of sortedBalances in the rows variable.
  */
  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      /* issue 8: prices[balance.currency] could be undefined 
      => multiplying undefined with balance.amount will return NaN.
    - solution: provide a default value in case the price is not found.
    */
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
