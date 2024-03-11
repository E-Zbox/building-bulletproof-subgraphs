import { BigInt, Bytes } from "@graphprotocol/graph-ts";
// entities
import { Approval, Swap, Transfer, User } from "../../generated/schema";

export const createOrLoadApprovalEntity = (id: Bytes): Approval => {
  let approvalEntity = Approval.load(id);

  if (!approvalEntity) {
    approvalEntity = new Approval(id);
    approvalEntity.owner = new Bytes(0);
    approvalEntity.spender = new Bytes(0);
    approvalEntity.value = new BigInt(0);
    approvalEntity.blockNumber = new BigInt(0);
    approvalEntity.blockTimestamp = new BigInt(0);
    approvalEntity.transactionHash = new Bytes(0);
  }

  return approvalEntity;
};

export const createOrLoadSwapEntity = (id: Bytes): Swap => {
  let swapEntity = Swap.load(id);

  if (!swapEntity) {
    swapEntity = new Swap(id);
    swapEntity.sender = new Bytes(0);
    swapEntity.amount0In = new BigInt(0);
    swapEntity.amount1In = new BigInt(0);
    swapEntity.amount0Out = new BigInt(0);
    swapEntity.amount1Out = new BigInt(0);
    swapEntity.to = new Bytes(0);
    swapEntity.blockNumber = new BigInt(0);
    swapEntity.blockTimestamp = new BigInt(0);
    swapEntity.transactionHash = new Bytes(0);
  }

  return swapEntity;
};

export const createOrLoadTransferEntity = (id: Bytes): Transfer => {
  let transferEntity = Transfer.load(id);

  if (!transferEntity) {
    transferEntity = new Transfer(id);
    transferEntity.from = new Bytes(0);
    transferEntity.to = new Bytes(0);
    transferEntity.value = new BigInt(0);
    transferEntity.blockNumber = new BigInt(0);
    transferEntity.blockTimestamp = new BigInt(0);
    transferEntity.transactionHash = new Bytes(0);
  }

  return transferEntity;
};

export const createOrLoadUserEntity = (id: Bytes): User => {
  let userEntity = User.load(id);

  if (!userEntity) {
    userEntity = new User(id);
    userEntity.approvalsAsOwnerTotal = new BigInt(0);
    userEntity.approvalsAsSpenderTotal = new BigInt(0);
    userEntity.balance = new BigInt(0);
  }

  return userEntity;
};
