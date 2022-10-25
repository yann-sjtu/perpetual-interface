import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tag,
  Td,
  Tbody,
  TableCaption,
  CloseButton,
} from "@chakra-ui/react";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { generatePseudoRandom256BitNumber } from "../../utils/utils";
import useWebSocket from "react-use-websocket";

import {
  selectOrders,
  fetchOrders,
  removeOrder,
  Status,
  Side,
  clearOrders,
} from "../../state/accountSlice";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";

export interface Order {
  hash: string;
  status: Status;
  side: Side;
  amountInETH: number;
  filledAmountInETH: number;
  price: number;
  trigger: number;
  goodTill: number;
}

export interface OrdersProps {
  orders: Order[];
}

const SERVER_PORT = process.env.REACT_APP_SERVER_PORT;
const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;
const WSS_FEED_URL: string = `ws://${SERVER_HOST}:${SERVER_PORT}/orderbook/v1`;
let currentOrders: Order[] = [];
export const ORDERBOOK_LEVELS: number = 0; // rows count

function convertApiOrderToOrder(order: any): Order {
  return {
    hash: order.metaData.orderHash,
    status: Status.Limited,
    side: order.order.isBuy ? Side.Buy : Side.Sell,
    amountInETH: order.order.amount,
    price: order.order.limitPrice.value,
    trigger: order.order.triggerPrice.value,
    goodTill: order.order.expiration,
    filledAmountInETH: order.metaData.filledAmount,
  };
}

export default function Orders(props: OrdersProps) {
  const { account } = useWeb3React();
  const orders = useAppSelector(selectOrders);
  const dispatch = useAppDispatch();
  async function cancelOrder(orderHash: string) {
    await axios.post(
      `http://${SERVER_HOST}:${SERVER_PORT}/orderbook/v1/cancelOrder`,
      { ordersHash: [orderHash] }
    );
    dispatch(removeOrder(orderHash));
  }
  const { sendJsonMessage, getWebSocket } = useWebSocket(WSS_FEED_URL, {
    onOpen: () => console.log("WebSocket connection opened."),
    onClose: () => console.log("WebSocket connection closed."),
    shouldReconnect: (closeEvent: any) => true,
    onMessage: (event: WebSocketEventMap["message"]) => processMessages(event),
  });

  const processMessages = (event: { data: string }) => {
    const response = JSON.parse(event.data);

    const orders = response.payload.map(convertApiOrderToOrder);
    process(orders);
  };

  const process = (data: Order[]) => {
    if (data.length >= 0) {
      currentOrders = [...currentOrders, ...data];

      if (currentOrders.length > ORDERBOOK_LEVELS) {
        dispatch(fetchOrders(currentOrders));
        currentOrders = [];
      }
    }
  };

  useEffect(() => {
    function connect(product: string) {
      const random = generatePseudoRandom256BitNumber();
      const subscribeMessage = {
        type: "subscribe",
        channel: "orders",
        requestId: random.toFixed(0),
        payload: { trader: account },
      };
      sendJsonMessage(subscribeMessage);
    }
    if (account) {
      dispatch(clearOrders());
      connect("PBTC-USD");
    }
  }, [sendJsonMessage, account, dispatch]);

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Status</Th>
            <Th>Side</Th>
            <Th>
              Amount/Filled<Tag>ETH</Tag>
            </Th>
            <Th>Price</Th>
            <Th>Trigger</Th>
            <Th>Good Till</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.length
            ? orders.map((order, i) => (
                <Tr key={i}>
                  <Td>{order.status}</Td>
                  <Td>{order.side}</Td>
                  <Td isNumeric>
                    {order.amountInETH}/{order.filledAmountInETH}
                  </Td>
                  <Td isNumeric>${order.price}</Td>
                  <Td isNumeric>${order.trigger}</Td>
                  <Td isNumeric>{order.goodTill}</Td>
                  {order.filledAmountInETH === order.amountInETH ? null : (
                    <Td>
                      <CloseButton
                        onClick={() => cancelOrder(order.hash)}
                      ></CloseButton>
                    </Td>
                  )}
                </Tr>
              ))
            : null}
        </Tbody>
        {orders.length ? null : (
          <TableCaption>You have no orders.</TableCaption>
        )}
      </Table>
    </TableContainer>
  );
}
