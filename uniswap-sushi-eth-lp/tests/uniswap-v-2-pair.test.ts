import {
  assert,
  describe,
  test,
  clearStore,
  afterAll,
  logStore,
} from "matchstick-as/assembly/index";
// src
import {
  handleApproval,
  handleSwap,
  handleTransfer,
} from "../src/uniswap-v-2-pair";
// utils
import {
  createNewApprovalEvent,
  createNewSwapEvent,
  createNewTransferEvent,
} from "./utils";

afterAll(() => {
  clearStore();
});

describe("can call mappings using custom events", () => {
  test("ApprovalEvent", () => {
    const owner = "0x89205a3a3b2a69de6dbf7f01ed13b2108b2c43e7";
    const spender = "0xd603fd63255b727b57912de0e251d69367c8eab4";
    // create mock event
    const event = createNewApprovalEvent(owner, spender, 345);

    // call mapping functions passing the events we just created
    handleApproval(event);

    // let's verify our entity got created correctly

    // owner field✅
    assert.fieldEquals(
      "Approval",
      event.transaction.hash.toHexString(),
      "owner",
      owner
    );

    // spender field✅
    assert.fieldEquals(
      "Approval",
      event.transaction.hash.toHexString(),
      "spender",
      spender
    );

    // value field✅
    assert.fieldEquals(
      "Approval",
      event.transaction.hash.toHexString(),
      "value",
      "345"
    );
  });

  test("SwapEvent", () => {
    const sender = "0x89205a3a3b2a69de6dbf7f01ed13b2108b2c43e7";
    const to = "0xd603fd63255b727b57912de0e251d69367c8eab4";

    // create mock event
    const event = createNewSwapEvent(sender, 123, 234, 113, 224, to);

    // call mapping functions passing the events we just created
    handleSwap(event);

    const id = event.transaction.hash.toHexString();

    // let's verify entity got created correctly

    // sender field✅
    assert.fieldEquals("Swap", id, "sender", sender);

    // amount0In field✅
    assert.fieldEquals("Swap", id, "amount0In", "123");

    // amount1In field✅
    assert.fieldEquals("Swap", id, "amount1In", "234");

    // amount0Out field✅
    assert.fieldEquals("Swap", id, "amount0Out", "113");

    // amount1Out field✅
    assert.fieldEquals("Swap", id, "amount1Out", "224");

    // to field✅
    assert.fieldEquals("Swap", id, "to", to);
  });

  test("TransferEvent", () => {
    const from = "0x89205a3a3b2a69de6dbf7f01ed13b2108b2c43e7";
    const to = "0xd603fd63255b727b57912de0e251d69367c8eab4";

    // create mock event
    const event = createNewTransferEvent(from, to, 4500);

    // call mapping functions passing the events we just created
    handleTransfer(event);

    // id corresponds to id used in mapping to create entity
    const id = event.transaction.hash.toHexString();

    // let's verify entity got created correctly

    // from field✅
    assert.fieldEquals("Transfer", id, "from", from);

    // to field✅
    assert.fieldEquals("Transfer", id, "to", to);

    // value field✅
    assert.fieldEquals("Transfer", id, "value", "4500");
  });
});

describe("populated User entity fields", () => {
  test("TransferEvent updated balance field correctly", () => {
    const to = "0xd603fd63255b727b57912de0e251d69367c8eab4";

    // logStore();

    assert.fieldEquals("User", to, "balance", "4500");
  });

  test("TransferEvent updated approvals total", () => {
    const owner = "0x89205a3a3b2a69de6dbf7f01ed13b2108b2c43e7";
    const spender = "0xd603fd63255b727b57912de0e251d69367c8eab4";

    assert.fieldEquals("User", owner, "approvalsAsOwnerTotal", "345");
    assert.fieldEquals("User", spender, "approvalsAsSpenderTotal", "345");
  });
});
