import {
  Approval as ApprovalEvent,
  Burn as BurnEvent,
  Mint as MintEvent,
  Swap as SwapEvent,
  Sync as SyncEvent,
  Transfer as TransferEvent,
} from "../generated/UniswapV2Pair/UniswapV2Pair";
import {
  Approval,
  Burn,
  Mint,
  Swap,
  Sync,
  Transfer,
} from "../generated/schema";
// utils
import {
  createOrLoadApprovalEntity,
  createOrLoadSwapEntity,
  createOrLoadTransferEntity,
  createOrLoadUserEntity,
} from "./utils";

export function handleApproval(event: ApprovalEvent): void {
  // populating approval entities
  const approvalEntity = createOrLoadApprovalEntity(event.transaction.hash);
  approvalEntity.owner = event.params.owner;
  approvalEntity.spender = event.params.spender;
  approvalEntity.value = event.params.value;
  approvalEntity.blockNumber = event.block.number;
  approvalEntity.blockTimestamp = event.block.timestamp;
  approvalEntity.transactionHash = event.transaction.hash;

  approvalEntity.save();

  // populating user entities
  const ownerUserEntity = createOrLoadUserEntity(event.params.owner);
  ownerUserEntity.approvalsAsOwnerTotal.plus(event.params.value);

  ownerUserEntity.save();

  const spenderUserEntity = createOrLoadUserEntity(event.params.spender);
  spenderUserEntity.approvalsAsSpenderTotal.plus(event.params.value);

  spenderUserEntity.save();
}

export function handleBurn(event: BurnEvent): void {
  const burnEntity = new Burn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  burnEntity.sender = event.params.sender;
  burnEntity.amount0 = event.params.amount0;
  burnEntity.amount1 = event.params.amount1;
  burnEntity.to = event.params.to;

  burnEntity.blockNumber = event.block.number;
  burnEntity.blockTimestamp = event.block.timestamp;
  burnEntity.transactionHash = event.transaction.hash;

  burnEntity.save();
}

export function handleMint(event: MintEvent): void {
  const handleEntity = new Mint(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  handleEntity.sender = event.params.sender;
  handleEntity.amount0 = event.params.amount0;
  handleEntity.amount1 = event.params.amount1;

  handleEntity.blockNumber = event.block.number;
  handleEntity.blockTimestamp = event.block.timestamp;
  handleEntity.transactionHash = event.transaction.hash;

  handleEntity.save();
}

export function handleSwap(event: SwapEvent): void {
  // populating swap entities
  const swapEntity = createOrLoadSwapEntity(event.transaction.hash);
  swapEntity.sender = event.params.sender;
  swapEntity.amount0In = event.params.amount0In;
  swapEntity.amount1In = event.params.amount1In;
  swapEntity.amount0Out = event.params.amount0Out;
  swapEntity.amount1Out = event.params.amount1Out;
  swapEntity.to = event.params.to;
  swapEntity.blockNumber = event.block.number;
  swapEntity.blockTimestamp = event.block.timestamp;
  swapEntity.transactionHash = event.transaction.hash;

  swapEntity.save();
}

export function handleSync(event: SyncEvent): void {
  const syncEntity = new Sync(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  syncEntity.reserve0 = event.params.reserve0;
  syncEntity.reserve1 = event.params.reserve1;

  syncEntity.blockNumber = event.block.number;
  syncEntity.blockTimestamp = event.block.timestamp;
  syncEntity.transactionHash = event.transaction.hash;

  syncEntity.save();
}

export function handleTransfer(event: TransferEvent): void {
  // populating transfer entities
  const transferEntity = createOrLoadTransferEntity(event.transaction.hash);
  transferEntity.from = event.params.from;
  transferEntity.to = event.params.to;
  transferEntity.value = event.params.value;
  transferEntity.blockNumber = event.block.number;
  transferEntity.blockTimestamp = event.block.timestamp;
  transferEntity.transactionHash = event.transaction.hash;

  transferEntity.save();

  // populating user entities
  const senderUserEntity = createOrLoadUserEntity(event.params.from);
  senderUserEntity.balance.minus(event.params.value);

  senderUserEntity.save();

  const receiverUserEntity = createOrLoadUserEntity(event.params.to);
  receiverUserEntity.balance.plus(event.params.value);

  receiverUserEntity.save();
}
