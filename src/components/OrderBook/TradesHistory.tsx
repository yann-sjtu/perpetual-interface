import {
  HStack,
  Tag,
  VStack,
  TableContainer,
  Box,
  Text,
  Spacer,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  addTradeRecords,
  clearTradesHistory,
} from "../../state/tradesHistorySlice";
import useWebSocket from "react-use-websocket";
import { useEffect } from "react";
import {
  formatNumber,
  generatePseudoRandom256BitNumber,
} from "../../utils/utils";
import { NULL_ADDRESS } from "../../constants/misc";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectTrades, TradeRecord } from "../../state/tradesHistorySlice";
import axios from "axios";

interface TradeRecordRowProps {
  amount: string;
  price: string;
  time: string;
  side: string;
}

const SERVER_PORT = process.env.REACT_APP_SERVER_PORT;
const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

const WSS_FEED_URL: string = `ws://${SERVER_HOST}:${SERVER_PORT}/orderbook/v1`;
export const NUM_TRADESRECORD: number = 0; // rows count

function TradeRecordRow({ amount, price, time, side }: TradeRecordRowProps) {
  return (
    <HStack color={useColorModeValue(side.toLowerCase() == "buy" ? "green" : "red", "gray.999")}>
      <Text>{amount}</Text>
      <Spacer />
      <Text>{price}</Text>
      <Spacer />
      <Text>{time}</Text>
    </HStack>
  );
}

let currentTrades: TradeRecord[] = [];

export default function TradesHistory() {
  const tradesHistory = useAppSelector(selectTrades);
  const dispatch = useAppDispatch();

  // const { sendJsonMessage, getWebSocket } = useWebSocket(WSS_FEED_URL, {
  //   onOpen: () => console.log("WebSocket connection opened."),
  //   onClose: () => console.log("WebSocket connection closed."),
  //   shouldReconnect: (closeEvent: any) => true,
  //   onMessage: (event: WebSocketEventMap["message"]) => processMessages(event),
  // });

  // const processMessages = (event: { data: string }) => {
  //   const response = JSON.parse(event.data);

  //   process(response.payload);
  // };

  useEffect(() => {
    setInterval(function () {

      const url = `http://${SERVER_HOST}:${SERVER_PORT}/trades`;
      axios.get(url).then((r: any) => {
        // console.log(r.data);
        process(r.data);
      }).finally( () => {
      });
    }, 2000);

  }, []);

  useEffect(() => {
    function connect(product: string) {
      const random = generatePseudoRandom256BitNumber();
      const subscribeMessage = {
        type: "subscribe",
        channel: "trades",
        requestId: random.toFixed(0),
        payload: { maker: NULL_ADDRESS },
      };
      // sendJsonMessage(subscribeMessage);
    }
    dispatch(clearTradesHistory());

    connect("PBTC-USD");
  }, []);
  // }, [sendJsonMessage, dispatch]);

  const process = (data: any) => {
    if (data?.length > 0) {
      currentTrades = [...currentTrades, ...data];

      if (currentTrades.length > NUM_TRADESRECORD) {
        dispatch(addTradeRecords(currentTrades));
        currentTrades = [];
        currentTrades.length = 0;
      }
    }
  };

  const formatPrice = (arg: number): string => {
    return arg.toLocaleString("en", {
      useGrouping: true,
      minimumFractionDigits: 2,
    });
  };
  const buildPriceLevels = (trades: any[]): React.ReactNode => {
    // const sortedLevelsByPrice: any[] = [...trades].sort(
    //   (current: any, next: any) => {
    //     return next.time - current.time;
    //   }
    // );
    const sortedLevelsByPrice = trades;

    return sortedLevelsByPrice.map((trade, idx) => {
      const size: string = formatNumber(trade.size);
      const price: string = formatPrice(trade.price);

      return (
        <Box key={idx}>
          <TradeRecordRow
            amount={size}
            price={price}
            time={trade.time.toString()} side={trade.side}          />
        </Box>
      );
    });
  };
  return (
    <VStack align="left">
      <HStack>
        <Text>
          Size<Tag>ETH</Tag>
        </Text>
        <Spacer />
        <Text>
          Price<Tag>USD</Tag>
        </Text>
        <Spacer />
        <Text>Time</Text>
      </HStack>
      {tradesHistory.length ? (
        <TableContainer>
          <div>{buildPriceLevels(tradesHistory)}</div>
        </TableContainer>
      ) : (
        <Spinner />
      )}
    </VStack>
  );
}
