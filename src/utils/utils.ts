import { ethers } from "ethers";
import { NULL_ADDRESS, FOUR_WEEKS_IN_SECONDS } from "../constants/misc";
import { Orders } from "./ordersv2";
import { BigNumber } from "bignumber.js";
import {
  SignedOrder,
  BigNumberable,
  address,
  SIGNATURE_TYPES,
  SRAOrder,
  SRAOrderMetaData,
  Fee,
  Price,
  SigningMethod,
  Order as OrderV2,
  ApiOrder,
} from "./types";

export const PREPEND_DEC = "\x19Ethereum Signed Message:\n32";

export const PREPEND_HEX = "\x19Ethereum Signed Message:\n\x20";

/**
 * Returns the number rounded to the nearest interval.
 * Example:
 *
 *   roundToNearest(1000.5, 1); // 1000
 *   roundToNearest(1000.5, 0.5);  // 1000.5
 *
 * @param {number} value    The number to round
 * @param {number} interval The numeric interval to round to
 * @return {number}
 */
export const roundToNearest = (value: number, interval: number) => {
  return Math.floor(value / interval) * interval;
};

/**
 * Groups price levels by their price
 * Example:
 *
 *  groupByPrice([ [1000, 100], [1000, 200], [993, 20] ]) // [ [ 1000, 300 ], [ 993, 20 ] ]
 *
 * @param levels
 */
export const groupByPrice = (orders: ApiOrder[]) => {
  return orders;
};

/**
 * Group price levels by given ticket size. Uses groupByPrice() and roundToNearest()
 * Example:
 *
 * groupByTicketSize([ [1000.5, 100], [1000, 200], [993, 20] ], 1) // [[1000, 300], [993, 20]]
 *
 * @param levels
 * @param ticketSize
 */
export const groupByTicketSize = (orders: ApiOrder[], ticketSize: number) => {
  return groupByPrice(
    orders.map((order) => ({
      ...order,
      price: roundToNearest(order.price, ticketSize),
    }))
  );
};

export const formatNumber = (arg: number): string => {
  return new Intl.NumberFormat("en-US").format(arg);
};

export function getEIP712Hash(domainHash: string, structHash: string): string {
  return ethers.utils.solidityKeccak256(
    ["bytes2", "bytes32", "bytes32"],
    ["0x1901", domainHash, structHash]
  );
}

export function hashString(input: string) {
  return ethers.utils.solidityKeccak256(["string"], [input]);
}

export function stripHexPrefix(input: string) {
  if (input.startsWith("0x")) {
    return input.slice(2);
  }
  return input;
}

export function addressToBytes32(input: address): string {
  return `0x000000000000000000000000${stripHexPrefix(input)}`;
}

export function bnToBytes32(value: BigNumberable): string {
  const bn = new BigNumber(value);
  if (!bn.isInteger()) {
    throw new Error("bnToBytes32: value must be an integer");
  }
  return `0x${new BigNumber(bn).toString(16).padStart(64, "0")}`;
}

export function isValidSigType(sigType: number): boolean {
  switch (sigType) {
    case SIGNATURE_TYPES.NO_PREPEND:
    case SIGNATURE_TYPES.DECIMAL:
    case SIGNATURE_TYPES.HEXADECIMAL:
      return true;
    default:
      return false;
  }
}

export function createTypedSignature(
  signature: string,
  sigType: number
): string {
  if (!isValidSigType(sigType)) {
    throw new Error(`Invalid signature type: ${sigType}`);
  }
  return `${fixRawSignature(signature)}0${sigType}`;
}

export function combineHexStrings(...args: string[]): string {
  return `0x${args.map(stripHexPrefix).join("")}`;
}

export function signatureToVRS(signature: string): {
  v: string;
  r: string;
  s: string;
} {
  const stripped = stripHexPrefix(signature);

  if (stripped.length !== 130) {
    throw new Error(`Invalid raw signature: ${signature}`);
  }

  const r = stripped.substr(0, 64);
  const s = stripped.substr(64, 64);
  const v = stripped.substr(128, 2);

  return { v, r, s };
}

export function fixRawSignature(signature: string): string {
  const { v, r, s } = signatureToVRS(signature);
  // const { v, r, s } = ethers.utils.splitSignature(signature)

  let trueV: string;
  switch (v) {
    case "00":
      trueV = "1b";
      break;
    case "01":
      trueV = "1c";
      break;
    case "1b":
    case "1c":
      trueV = v;
      break;
    default:
      throw new Error(`Invalid v value: ${v}`);
  }
  return combineHexStrings(r, s, trueV);
}

export function ecRecoverTypedSignature(
  hash: string,
  typedSignature: string
): address {
  if (stripHexPrefix(typedSignature).length !== 66 * 2) {
    return "0x"; // return invalid address instead of throwing error
  }

  const sigType = parseInt(typedSignature.slice(-2), 16);

  let prependedHash: string;
  try {
    prependedHash = getPrependedHash(hash, sigType);
  } catch (e) {
    return "0x"; // return invalid address instead of throwing error
  }

  const signature = typedSignature.slice(0, -2);

  return ethers.utils.recoverAddress(prependedHash, signature);
}

/**
 *    * Returns true if the hash has a non-null valid signature from a particular signer.
 *       */
export function hashHasValidSignature(
  hash: string,
  typedSignature: string,
  expectedSigner: address
): boolean {
  const signer = ecRecoverTypedSignature(hash, typedSignature);
  return addressesAreEqual(signer, expectedSigner);
}

export function addressesAreEqual(
  addressOne: string,
  addressTwo: string
): boolean {
  return (
    addressOne.length > 0 &&
    addressTwo.length > 0 &&
    stripHexPrefix(addressOne).toLowerCase() ===
      stripHexPrefix(addressTwo).toLowerCase()
  );
}

export function getPrependedHash(
  hash: string,
  sigType: SIGNATURE_TYPES
): string {
  switch (sigType) {
    case SIGNATURE_TYPES.NO_PREPEND:
      return hash;
    case SIGNATURE_TYPES.DECIMAL:
      return ethers.utils.solidityKeccak256(
        ["string", "bytes32"],
        [PREPEND_DEC, hash]
      );
    case SIGNATURE_TYPES.HEXADECIMAL:
      return ethers.utils.solidityKeccak256(
        ["string", "bytes32"],
        [PREPEND_HEX, hash]
      );
    default:
      throw Error(`invalid sigType ${sigType}`);
  }
}

export function generatePseudoRandom256BitNumber(): BigNumber {
  const MAX_DIGITS_IN_UNSIGNED_256_INT = 78;

  // BigNumber.random returns a pseudo-random number between 0 & 1 with a passed in number of
  // decimal places.
  // Source: https://mikemcl.github.io/bignumber.js/#random
  const randomNumber = BigNumber.random(MAX_DIGITS_IN_UNSIGNED_256_INT);
  const factor = new BigNumber(10).pow(MAX_DIGITS_IN_UNSIGNED_256_INT - 1);
  const randomNumberScaledTo256Bits = randomNumber.times(factor).integerValue();
  return randomNumberScaledTo256Bits;
}

function jsonifyPerpetualOrder(order: SignedOrder) {
  return {
    isBuy: order.isBuy,
    isDecreaseOnly: order.isDecreaseOnly,
    amount: order.amount.toFixed(0),
    limitPrice: order.limitPrice.value.toString(),
    triggerPrice: order.triggerPrice.value.toString(),
    limitFee: order.limitFee.value.toString(),
    maker: order.maker,
    taker: order.taker,
    expiration: order.expiration.toFixed(0),
    typedSignature: order.typedSignature,
    salt: order.salt.toFixed(0),
  };
}


export async function signPlaceOrder(
    encodeHash: string,
    orderArgs: { price: string; size: string; account: string; isBuy: boolean },
    library: any
) {
  const realExpiration = new BigNumber(FOUR_WEEKS_IN_SECONDS).plus(
      Math.round(new Date().getTime() / 1000)
  );
  const order: OrderV2 = {
    maker: orderArgs.account,
    taker: NULL_ADDRESS,
    limitFee: new Fee(0),
    isBuy: orderArgs.isBuy,
    isDecreaseOnly: false,
    amount: new BigNumber(orderArgs.size),
    limitPrice: new Price(orderArgs.price),
    triggerPrice: new Price(0),
    expiration: realExpiration,
    salt: generatePseudoRandom256BitNumber(),
  };
  const networkId = process.env.REACT_APP_NETWORK_ID;
  if (typeof networkId === "undefined") {
    throw new Error(`env of "REACT_APP_NETWORK_ID" is undefined`);
  }

  const address = process.env.REACT_APP_P1OrderAddr;
  if (typeof address === "undefined") {
    throw new Error(`env of "REACT_APP_P1OrderAddr" is undefined`);
  }

  const orders = new Orders(library, parseInt(networkId), address);
  console.log('orders', order, orders);
  const typedSignature = await orders.signOrder(encodeHash, order, SigningMethod.Hash);

  return typedSignature;
}

// export async function createOrder(
//   orderArgs: { price: string; size: string; account: string; isBuy: boolean },
//   library: any
// ) {
//   const realExpiration = new BigNumber(FOUR_WEEKS_IN_SECONDS).plus(
//     Math.round(new Date().getTime() / 1000)
//   );
//   const order: OrderV2 = {
//     maker: orderArgs.account,
//     taker: NULL_ADDRESS,
//     limitFee: new Fee(0),
//     isBuy: orderArgs.isBuy,
//     isDecreaseOnly: false,
//     amount: new BigNumber(orderArgs.size),
//     limitPrice: new Price(orderArgs.price),
//     triggerPrice: new Price(0),
//     expiration: realExpiration,
//     salt: generatePseudoRandom256BitNumber(),
//   };
//   const networkId = process.env.REACT_APP_NETWORK_ID;
//   if (typeof networkId === "undefined") {
//     throw new Error(`env of "REACT_APP_NETWORK_ID" is undefined`);
//   }
//
//   const address = process.env.REACT_APP_P1OrderAddr;
//   if (typeof address === "undefined") {
//     throw new Error(`env of "REACT_APP_P1OrderAddr" is undefined`);
//   }
//
//   const orders = new Orders(library, parseInt(networkId), address);
//   console.log('orders', order, orders);
//   const typedSignature = await orders.signOrder(order, SigningMethod.Hash);
//   const signedOrder: SignedOrder = {
//     ...order,
//     typedSignature,
//   };
//   return jsonifyPerpetualOrder(signedOrder);
// }
