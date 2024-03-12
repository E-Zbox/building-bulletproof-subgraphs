import { newMockEvent } from "matchstick-as";
// events
import {
  Approval as ApprovalEvent,
  Swap as SwapEvent,
  Transfer as TransferEvent,
} from "../../generated/UniswapV2Pair/UniswapV2Pair";
import { Address, Bytes, ethereum } from "@graphprotocol/graph-ts";

export const createNewApprovalEvent = (
  owner: string,
  spender: string,
  value: i32
): ApprovalEvent => {
  const mockEvent = newMockEvent();
  const newApprovalEvent = new ApprovalEvent(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  newApprovalEvent.parameters = new Array();

  const ownerParam = new ethereum.EventParam(
    "owner",
    ethereum.Value.fromAddress(Address.fromString(owner))
  );
  const spenderParam = new ethereum.EventParam(
    "spender",
    ethereum.Value.fromAddress(Address.fromString(spender))
  );
  const valueParam = new ethereum.EventParam(
    "value",
    ethereum.Value.fromI32(value)
  );

  newApprovalEvent.parameters.push(ownerParam);
  newApprovalEvent.parameters.push(spenderParam);
  newApprovalEvent.parameters.push(valueParam);

  return newApprovalEvent;
};

export const createNewSwapEvent = (
  sender: string,
  amount0In: i32,
  amount1In: i32,
  amount0Out: i32,
  amount1Out: i32,
  to: string
): SwapEvent => {
  const mockEvent = newMockEvent();
  const newSwapEvent = new SwapEvent(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  newSwapEvent.parameters = new Array();

  const senderParam = new ethereum.EventParam(
    "sender",
    ethereum.Value.fromAddress(Address.fromString(sender))
  );
  const amount0InParam = new ethereum.EventParam(
    "amount0In",
    ethereum.Value.fromI32(amount0In)
  );
  const amount1InParam = new ethereum.EventParam(
    "amount1In",
    ethereum.Value.fromI32(amount1In)
  );
  const amount0OutParam = new ethereum.EventParam(
    "amount0Out",
    ethereum.Value.fromI32(amount0Out)
  );
  const amount1OutParam = new ethereum.EventParam(
    "amount1Out",
    ethereum.Value.fromI32(amount1Out)
  );
  const toParam = new ethereum.EventParam(
    "to",
    ethereum.Value.fromAddress(Address.fromString(to))
  );

  newSwapEvent.parameters.push(senderParam);
  newSwapEvent.parameters.push(amount0InParam);
  newSwapEvent.parameters.push(amount1InParam);
  newSwapEvent.parameters.push(amount0OutParam);
  newSwapEvent.parameters.push(amount1OutParam);
  newSwapEvent.parameters.push(toParam);

  return newSwapEvent;
};

export const createNewTransferEvent = (
  from: string,
  to: string,
  value: i32
): TransferEvent => {
  const mockEvent = newMockEvent();
  const newTransferEvent = new TransferEvent(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  newTransferEvent.parameters = new Array();
  const fromParam = new ethereum.EventParam(
    "from",
    ethereum.Value.fromAddress(Address.fromString(from))
  );
  const toParam = new ethereum.EventParam(
    "to",
    ethereum.Value.fromAddress(Address.fromString(to))
  );
  const valueParam = new ethereum.EventParam(
    "value",
    ethereum.Value.fromI32(value)
  );

  newTransferEvent.parameters.push(fromParam);
  newTransferEvent.parameters.push(toParam);
  newTransferEvent.parameters.push(valueParam);

  return newTransferEvent;
};
