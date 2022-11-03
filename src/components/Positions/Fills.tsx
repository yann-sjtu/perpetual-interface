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
import { useWeb3React } from "@web3-react/core";
import useWebSocket from "react-use-websocket";
import { useEffect, useState } from "react";
import { NULL_ADDRESS } from "../../constants/misc";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import axios from "axios";
import {
  addFills,
  selectFills,
  FillType,
  Side,
  TakerOrMaker,
  clearFills,
} from "../../state/accountSlice";

import {
  formatNumber,
  generatePseudoRandom256BitNumber,
} from "../../utils/utils";
import { TradeRecord } from "../../state/tradesHistorySlice";

export interface Fill {
  time: number;
  type: FillType;
  side: Side;
  amount: number;
  price: number;
  totalFee: number;
  liquidity: TakerOrMaker;
}

export interface FillsProps {
  fills: Fill[];
}

const SERVER_PORT = process.env.REACT_APP_SERVER_PORT;
const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;
const WSS_FEED_URL: string = `ws://${SERVER_HOST}:${SERVER_PORT}/orderbook/v1`;

let currentFills: Fill[] = [];
export const NUM_TRADESRECORD: number = 0; // rows count

export default function Fills(props: FillsProps) {
  const { account } = useWeb3React();
  const fills = useAppSelector(selectFills);
  const dispatch = useAppDispatch();

  // const { sendJsonMessage, getWebSocket } = useWebSocket(WSS_FEED_URL, {
  //   onOpen: () => console.log("WebSocket connection opened."),
  //   onClose: () => console.log("WebSocket connection closed."),
  //   shouldReconnect: (closeEvent: any) => true,
  //   onMessage: (event: WebSocketEventMap["message"]) => processMessages(event),
  // });

  const processMessages = (data: any) => {
    // const response = JSON.parse(event.data);

    let fills: Fill[] = data.map((tradeRecord: TradeRecord) => ({
      time: tradeRecord.time,
      type: FillType.Market,
      side: tradeRecord.isBuy ? Side.Buy : Side.Sell,
      amount: tradeRecord.size,
      price: tradeRecord.price,
      totalFee: tradeRecord.size * tradeRecord.price,
      liquidity:
        tradeRecord.taker !== NULL_ADDRESS
          ? TakerOrMaker.Taker
          : TakerOrMaker.Maker,
    }));
    // console.log("fills", fills);

    process(fills);
  };

  const process = (data: Fill[]) => {
    if (data?.length > 0) {
      currentFills = [...currentFills, ...data];

      if (currentFills.length > NUM_TRADESRECORD) {
        dispatch(addFills(currentFills));
        currentFills = [];
        currentFills.length = 0;
      }
    }
  };

  useEffect(() => {
    setInterval(function () {
      if (account) {
        const url = `http://${SERVER_HOST}:${SERVER_PORT}/fills?addr=${account}`;
        axios.get(url).then((r: any) => {
          // console.log(r.data);
          // if (!r.data) {
          //   processMessages([]);
          // } else {
          //   processMessages(r.data);
          // }
          processMessages(r.data);
        }).finally( () => {
        });
      } else {
        console.log("fills account", account);
      }
    }, 2000);

  }, []);

  // useEffect(() => {
  //   function connect(product: string) {
  //     const random = generatePseudoRandom256BitNumber();
  //     const subscribeMessage = {
  //       type: "subscribe",
  //       channel: "trades",
  //       requestId: random.toFixed(0),
  //       payload: { trader: account },
  //     };
  //     // sendJsonMessage(subscribeMessage);
  //   }

  //   dispatch(clearFills());
  //   if (account) {
  //     connect("PBTC-USD");
  //   }
  // }, []);
  // }, [sendJsonMessage, account, dispatch]);


  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Time</Th>
            <Th>Type</Th>
            <Th>Side</Th>
            <Th>Price</Th>
            <Th>Amount</Th>
            <Th>Total</Th>
            {/*<Th>Liquidity</Th>*/}
          </Tr>
        </Thead>
        <Tbody>
          {fills.length
            ? fills.map((fill, i) => (
                <Tr key={i}>
                  <Td>{fill.time}</Td>
                  <Td>{fill.type}</Td>
                  <Td isNumeric>{fill.side}</Td>
                  <Td isNumeric>{fill.price}</Td>
                  <Td isNumeric>{fill.amount}</Td>
                  <Td isNumeric>{fill.totalFee}</Td>
                  {/*<Td isNumeric>{fill.liquidity}</Td>*/}
                </Tr>
              ))
            : null}
        </Tbody>
        {fills.length ? null : <TableCaption>You have no fills.</TableCaption>}
      </Table>
    </TableContainer>
  );
}
