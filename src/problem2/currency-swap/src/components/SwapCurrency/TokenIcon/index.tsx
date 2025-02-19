import { DEFAULT_TOKEN_ICON, TOKEN_ICON_URL } from "../helpers";

const TokenIcon: React.FC<{ id: string; size?: number }> = ({
  id,
  size = 24,
}) => (
  <img
    src={`${TOKEN_ICON_URL}${id}.svg`}
    alt={id}
    width={size}
    height={size}
    style={{ marginRight: 8 }}
    onError={(e) => (e.currentTarget.src = DEFAULT_TOKEN_ICON)}
  />
);

export default TokenIcon;
