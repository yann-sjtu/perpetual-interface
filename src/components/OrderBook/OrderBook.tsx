import {
  VStack,
  HStack,
  Box,
  List,
  Tag,
  Text,
  ListItem,
  UnorderedList,
  Table,
  Spacer,
  TableContainer,
  TableCaption,
  Th,
  Tr,
  Td,
  Thead,
  Tbody,
  Tfoot,
  Spinner,
} from "@chakra-ui/react";
import useWebSocket from "react-use-websocket";
import { useEffect } from "react";
import axios from "axios";
import {
  addAsks,
  addBids,
  selectAsks,
  selectBids,
} from "../../state/orderbook/reducer";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  formatNumber,
  generatePseudoRandom256BitNumber,
} from "../../utils/utils";
import PriceLevelRow from "./PriceLevelRow";
import Spread from "./Spread";
import { ApiOrder } from "../../utils/types";
import {stringify} from "querystring";

interface DeltaOrders {
  bids: ApiOrder[];
  asks: ApiOrder[];
}

export enum OrderType {
  BIDS,
  ASKS,
}

const SERVER_PORT = process.env.REACT_APP_SERVER_PORT;
const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

const WSS_FEED_URL: string = `ws://${SERVER_HOST}:${SERVER_PORT}/orderbook/v1`;
export const ORDERBOOK_LEVELS: number = 0; // rows count

let currentBids: ApiOrder[] = [];
let currentAsks: ApiOrder[] = [];

export default function OrderBook() {
  const bids = useAppSelector(selectBids);
  const asks = useAppSelector(selectAsks);
  const dispatch = useAppDispatch();
  // const { sendJsonMessage, getWebSocket } = useWebSocket(WSS_FEED_URL, {
  //   onOpen: () => console.log("WebSocket connection opened."),
  //   onClose: () => console.log("WebSocket connection closed."),
  //   shouldReconnect: (closeEvent: any) => true,
  //   onMessage: (event: WebSocketEventMap["message"]) => processMessages(event),
  // });

  // const processMessages = (event: { data: string }) => {
  //   const response = JSON.parse(event.data);
  //   const bids = response.payload
  //     .filter((order: any) => order.order.isBuy)
  //     .map((sraOrder: any) => ({
  //       price: sraOrder.order.limitPrice.value,
  //       size: sraOrder.order.amount - sraOrder.metaData.filledAmount,
  //       hash: sraOrder.metaData.orderHash,
  //     }));
  //   const asks = response.payload
  //     .filter((order: any) => !order.order.isBuy)
  //     .map((sraOrder: any) => ({
  //       price: sraOrder.order.limitPrice.value,
  //       size: sraOrder.order.amount - sraOrder.metaData.filledAmount,
  //       hash: sraOrder.metaData.orderHash,
  //     }));
  //
  //   process({ bids, asks });
  // };
  const processMessages = (data: any) => {
    const bids = data.buy_levels ? data.buy_levels
        .map((sraOrder: any) => ({
          price: sraOrder.price,
          size: sraOrder.amount,
          hash: '',
        })) : [];
    const asks = data.sell_levels ? data.sell_levels
        .map((sraOrder: any) => ({
          price: sraOrder.price,
          size: sraOrder.amount,
          hash: '',
        })) : [];

    process({ bids, asks });
  };

  const process = (data: DeltaOrders) => {
    dispatch(addBids(data.bids));
    dispatch(addAsks(data.asks));
    // if (data?.bids?.length > 0) {
    //   currentBids = [...currentBids, ...data.bids];

    //   if (currentBids.length > ORDERBOOK_LEVELS) {
    //     dispatch(addBids(currentBids));
    //     currentBids = [];
    //     currentBids.length = 0;
    //   }
    // }
    // if (data?.asks?.length >= 0) {
    //   currentAsks = [...currentAsks, ...data.asks];

    //   if (currentAsks.length > ORDERBOOK_LEVELS) {
    //     dispatch(addAsks(currentAsks));
    //     currentAsks = [];
    //     currentAsks.length = 0;
    //   }
    // }
  };

  useEffect(() => {
    setInterval(function () {

    const url = `http://${SERVER_HOST}:${SERVER_PORT}/book`;
    axios.get(url).then((r: any) => {
      // console.log(r.data);
      processMessages(r.data);
    }).finally( () => {
    });
    }, 2000);

  }, []);

  useEffect(() => {
    function connect(product: string) {
      const random = generatePseudoRandom256BitNumber();
      const subscribeMessage = {
        type: "subscribe",
        channel: "orders",
        requestId: random.toFixed(0),
      };
      // sendJsonMessage(subscribeMessage);
    }

    connect("PBTC-USD");
  }, []);
  // }, [sendJsonMessage]);

  const formatPrice = (arg: number): string => {
    return arg.toLocaleString("en", {
      useGrouping: true,
      minimumFractionDigits: 2,
    });
  };

  const buildPriceLevels = (orders: ApiOrder[], side: string): React.ReactNode => {
    if (!orders.length) {
      return <PriceLevelRow size={"-"} price={"-"} key={"-"} side={side} />;
    }
    const sortedLevelsByPrice: ApiOrder[] = [...orders].sort(
      (current: ApiOrder, next: ApiOrder) => {
        return next.price - current.price;
      }
    );

    return sortedLevelsByPrice.map((order, idx) => {
      const size: string = formatNumber(order.size);
      const price: string = formatPrice(order.price);

      return <PriceLevelRow size={size} price={price} key={idx} side={side} />;
    });
  };

  return (
    <VStack align="left">
      <HStack>
        <Text>
          Price<Tag>USD</Tag>
        </Text>
        <Spacer />
        <Text>
          size<Tag>ETH</Tag>
        </Text>
        <Spacer />
        <Text>Mine</Text>
      </HStack>
      {bids.length || asks.length ? (
        <Box>
          <TableContainer h="45%">
            <Box>{buildPriceLevels(asks, 'ask')}</Box>
          </TableContainer>

          <Spread bids={bids} asks={asks} />

          <TableContainer h="45%">
            <div>{buildPriceLevels(bids, 'bid')}</div>
          </TableContainer>
        </Box>
      ) : (
        <Spinner />
      )}
    </VStack>
  );
}
