import { HStack, Text, Spacer, useColorModeValue } from "@chakra-ui/react";

interface PriceLevelRowProps {
  price: string;
  size: string;
  side: string;
}

export default function PriceLevelRow({ size, price, side }: PriceLevelRowProps) {
  return (
    <HStack w="100%" color={useColorModeValue(side === "bid" ? "green" : "red", "gray.999")}>
      <Text>{price}</Text>
      <Spacer />
      <Text>{size}</Text>
      <Spacer />
      <Text>-</Text>
    </HStack>
  );
}
