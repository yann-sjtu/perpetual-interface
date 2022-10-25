import { FunctionComponent } from "react";
import { formatNumber } from "../../utils/utils";
import { ApiOrder } from "../../utils/types";
import { HStack, Spacer, Text } from "@chakra-ui/react";

interface SpreadProps {
  bids: ApiOrder[];
  asks: ApiOrder[];
}

const Spread: FunctionComponent<SpreadProps> = ({ bids, asks }) => {
  const getHighestBid = (bids: ApiOrder[]) => {
    const prices: number[] = bids.map((bid) => bid.price);
    return Math.max.apply(Math, prices);
  };

  const getLowestAsk = (asks: ApiOrder[]) => {
    const prices: number[] = asks.map((ask) => ask.price);
    return Math.min.apply(Math, prices);
  };

  const getSpreadAmount = (bids: ApiOrder[], asks: ApiOrder[]): number =>
    Math.abs(getHighestBid(bids) - getLowestAsk(asks));

  const getSpreadPercentage = (spread: number, highestBid: number): string =>
    `(${((spread * 100) / highestBid).toFixed(2)}%)`;

  return (
    <HStack my={2}>
      <Text>Spread: {formatNumber(getSpreadAmount(bids, asks))}</Text>
      <Spacer />
      <Text>
        {getSpreadPercentage(getSpreadAmount(bids, asks), getHighestBid(bids))}
      </Text>
      <Spacer />
      <Text>-</Text>
    </HStack>
  );
};

export default Spread;
