import {
  Stat,
  StatNumber,
  StatLabel,
  Tag,
  StatHelpText,
  StatGroup,
  StatArrow,
} from "@chakra-ui/react";

export default function StatsBar() {
  return (
    <StatGroup flex="1">
      <Stat>
        <StatNumber>$1,895.9</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Index Price</StatLabel>
        <StatHelpText>$1,883.9</StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>Oracle Price</StatLabel>
        <StatHelpText>$1,883.9</StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>24h Change</StatLabel>
        <StatHelpText>
          <StatArrow type="increase" />
          23.36%
        </StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>Open Interest</StatLabel>
        <StatHelpText>
          62,568.26 <Tag size="sm">ETH</Tag>
        </StatHelpText>
      </Stat>

      <Stat>
        <StatLabel>1h Funding</StatLabel>
        <StatHelpText>0.002200%</StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>24h Volume</StatLabel>
        <StatHelpText>$562,752,473</StatHelpText>
      </Stat>

      <Stat>
        <StatLabel>24h Trades</StatLabel>
        <StatHelpText>51,455</StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>Next Funding</StatLabel>
        <StatHelpText>19:12</StatHelpText>
      </Stat>
    </StatGroup>
  );
}
