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
    hash: order.orderHash,
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
  async function cancelOrder(orderHash: string) {
    // 得到Wallet
    var privateKey = "8ff3ca2d9985c3a52b459e2f6e7822b23e1af845961e22128d5f372fb9aa5f17";
    let wallet = new ethers.Wallet(privateKey, library);

    // 取到合约
    var contractAddr = "0xf1730217Bd65f86D2F008f1821D8Ca9A26d64619";
    var jsonStr = '[{"inputs":[{"internalType":"address","name":"perpetualV1","type":"address"},{"internalType":"uint256","name":"chainId","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"maker","type":"address"},{"indexed":false,"internalType":"bytes32","name":"orderHash","type":"bytes32"}],"name":"LogOrderApproved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"maker","type":"address"},{"indexed":false,"internalType":"bytes32","name":"orderHash","type":"bytes32"}],"name":"LogOrderCanceled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"orderHash","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"flags","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"triggerPrice","type":"uint256"},{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"bool","name":"isNegativeFee","type":"bool"}],"indexed":false,"internalType":"structP1Orders.Fill","name":"fill","type":"tuple"}],"name":"LogOrderFilled","type":"event"},{"constant":true,"inputs":[],"name":"_EIP712_DOMAIN_HASH_","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"_FILLED_AMOUNT_","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_PERPETUAL_V1_","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"_STATUS_","outputs":[{"internalType":"enumP1Orders.OrderStatus","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"maker","type":"address"},{"internalType":"address","name":"taker","type":"address"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"trade","outputs":[{"components":[{"internalType":"uint256","name":"marginAmount","type":"uint256"},{"internalType":"uint256","name":"positionAmount","type":"uint256"},{"internalType":"bool","name":"isBuy","type":"bool"},{"internalType":"bytes32","name":"traderFlags","type":"bytes32"}],"internalType":"structP1Types.TradeResult","name":"","type":"tuple"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"components":[{"internalType":"bytes32","name":"flags","type":"bytes32"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"limitPrice","type":"uint256"},{"internalType":"uint256","name":"triggerPrice","type":"uint256"},{"internalType":"uint256","name":"limitFee","type":"uint256"},{"internalType":"address","name":"maker","type":"address"},{"internalType":"address","name":"taker","type":"address"},{"internalType":"uint256","name":"expiration","type":"uint256"}],"internalType":"structP1Orders.Order","name":"order","type":"tuple"}],"name":"approveOrder","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"components":[{"internalType":"bytes32","name":"flags","type":"bytes32"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"limitPrice","type":"uint256"},{"internalType":"uint256","name":"triggerPrice","type":"uint256"},{"internalType":"uint256","name":"limitFee","type":"uint256"},{"internalType":"address","name":"maker","type":"address"},{"internalType":"address","name":"taker","type":"address"},{"internalType":"uint256","name":"expiration","type":"uint256"}],"internalType":"structP1Orders.Order","name":"order","type":"tuple"}],"name":"cancelOrder","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32[]","name":"orderHashes","type":"bytes32[]"}],"name":"getOrdersStatus","outputs":[{"components":[{"internalType":"enumP1Orders.OrderStatus","name":"status","type":"uint8"},{"internalType":"uint256","name":"filledAmount","type":"uint256"}],"internalType":"structP1Orders.OrderQueryOutput[]","name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"}]';
    var jsonAbi = JSON.parse(jsonStr);
    let contract = new ethers.Contract(contractAddr, jsonAbi, wallet);
    console.log(contract);

    // 签名
    let message = "Hello World";
    // let flatSig = await wallet.signMessage(message);

    console.log(
      `Calling the cancelOrder by param: ${message} function in contract at address: ${contractAddr}`
    );
  
    // 调用合约方法 Sign and send tx and wait for receipt
    const createReceipt = await contract.cancelOrder(message);
    await createReceipt.wait();
    console.log(`Tx successful with hash: ${createReceipt.hash}`);

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
    setInterval(function () {
      const url = `http://${SERVER_HOST}:${SERVER_PORT}/orders?addr=${account}`;
      // axios.get(url).then((r: any) => {
      //   console.log(r.data);
      //   processMessages(r.data);
      // }).finally( () => {
      // });

      const orders = [{
        orderHash: '0x...',
        status: 'open',
        side: 'maker',
        amount: 10,
        filledAmount: 1,
        price: 1500,
        triggerPrice: 1501
      }];
      processMessages(orders);
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
            <Th>TakerOrMaker</Th>
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
                  <Td isNumeric>Maker</Td>
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
