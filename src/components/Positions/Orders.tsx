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
import { ethers } from "ethers";
import { Provider } from "react-redux";
import { P1Orders__factory } from "../../typechain";
const PERPETUAL_PROXY_ADDR = process.env.REACT_APP_PerpetualProxyAddr;

export interface Order {
  hash: string;
  jsonOrder: string,
  status: Status;
  side: Side;
  amountInETH: number;
  filledAmountInETH: number;
  price: number;
  trigger: number;
  goodTill: string;
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
    hash: order.orderHash,
    jsonOrder: order.order,
    status: Status.Limited,
    side: order.isBuy ? Side.Buy : Side.Sell,
    amountInETH: order.amount,
    price: order.price,
    trigger: order.triggerPrice,
    goodTill: order.expiration,
    filledAmountInETH: order.filledAmount,
  };
}

export default function Orders(props: OrdersProps) {
  const { account, library, active } = useWeb3React();
  const orders = useAppSelector(selectOrders);
  const dispatch = useAppDispatch();

  // 取消挂单
  async function cancelOrder(stringOrder: string) {
    console.log(stringOrder);
    var jsonOrder = JSON.parse(stringOrder);
    console.log(jsonOrder);
    
    const iface = P1Orders__factory.createInterface();
    const data = iface.encodeFunctionData("cancelOrder", [
      jsonOrder,
    ]);
    await library
      .getSigner()
      .sendTransaction({ to: PERPETUAL_PROXY_ADDR, data });

    // await axios.post(
    //   `http://${SERVER_HOST}:${SERVER_PORT}/orderbook/v1/cancelOrder`,
    //   { ordersHash: [orderHash] }
    // );
    // dispatch(removeOrder(orderHash));
  }




  // const { sendJsonMessage, getWebSocket } = useWebSocket(WSS_FEED_URL, {
  //   onOpen: () => console.log("WebSocket connection opened."),
  //   onClose: () => console.log("WebSocket connection closed."),
  //   shouldReconnect: (closeEvent: any) => true,
  //   onMessage: (event: WebSocketEventMap["message"]) => processMessages(event),
  // });

  // const processMessages = (event: { data: string }) => {
  //   const response = JSON.parse(event.data);

  //   const orders = response.payload.map(convertApiOrderToOrder);
  //   process(orders);
  // };
  const processMessages = (data: any) => {
    const orders = data.map(convertApiOrderToOrder);
    processData(orders);
  };

  const processData = (data: Order[]) => {
    if (data.length >= 0) {
      currentOrders = [...currentOrders, ...data];

      if (currentOrders.length > ORDERBOOK_LEVELS) {
        dispatch(fetchOrders(currentOrders));
        currentOrders = [];
      }
    }
  };

  useEffect(() => {
    setInterval(function () {
      const url = `http://${SERVER_HOST}:${SERVER_PORT}/orders?addr=${account}`;
      axios.get(url).then((r: any) => {
        console.log(r.data);
        processMessages(r.data);
      }).finally( () => {
      });
    }, 2000);

  }, [active]);

  // useEffect(() => {
  //   function connect(product: string) {
  //     const random = generatePseudoRandom256BitNumber();
  //     const subscribeMessage = {
  //       type: "subscribe",
  //       channel: "orders",
  //       requestId: random.toFixed(0),
  //       payload: { trader: account },
  //     };
  //     // sendJsonMessage(subscribeMessage);
  //   }
  //   if (account) {
  //     dispatch(clearOrders());
  //     connect("PBTC-USD");
  //   }
  // }, []);
  // // }, [sendJsonMessage, account, dispatch]);

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
            <Th>GoodTill</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.length
            ? orders.map((order, i) => (
                <Tr key={i}>
                  <Td>{order.status}</Td>
                  <Td>{order.side}</Td>
                  <Td>
                    {order.amountInETH}/{order.filledAmountInETH}
                  </Td>
                  <Td>${order.price}</Td>
                  <Td>${order.trigger}</Td>
                  <Td isNumeric>{order.goodTill}</Td>
                  {order.filledAmountInETH === order.amountInETH ? null : (
                    <Td>
                      <CloseButton
                        onClick={() => cancelOrder(order.jsonOrder)}
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
