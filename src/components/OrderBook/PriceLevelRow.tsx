import { HStack, Text, Spacer } from "@chakra-ui/react";

interface PriceLevelRowProps {
  price: string;
  size: string;
}

export default function PriceLevelRow({ size, price }: PriceLevelRowProps) {
  return (
    <HStack w="100%">
      <Text>{price}</Text>
      <Spacer />
      <Text>{size}</Text>
      <Spacer />
      <Text>-</Text>
    </HStack>
  );
}
