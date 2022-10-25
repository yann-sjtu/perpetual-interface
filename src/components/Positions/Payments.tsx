import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  TableCaption,
} from "@chakra-ui/react";

export interface Payment {
  time: number;
  market: string;
  payment: number;
  fundingRate: number;
  position: number;
  oraclePrice: number;
}

export interface PaymentsProps {
  payments: Payment[];
}

export default function Payments(props: PaymentsProps) {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Time</Th>
            <Th>Market</Th>
            <Th>Payment</Th>
            <Th>Funding Rate</Th>
            <Th>Position</Th>
            <Th>Oracle Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.payments.length
            ? props.payments.map((payment) => (
                <Tr>
                  <Td>{payment.time}</Td>
                  <Td>{payment.market}</Td>
                  <Td isNumeric>{payment.payment}</Td>
                  <Td isNumeric>{payment.fundingRate}</Td>
                  <Td isNumeric>{payment.fundingRate}</Td>
                  <Td isNumeric>{payment.oraclePrice}</Td>
                </Tr>
              ))
            : null}
        </Tbody>
        {props.payments.length ? null : (
          <TableCaption>You have no past funding payments.</TableCaption>
        )}
      </Table>
    </TableContainer>
  );
}
