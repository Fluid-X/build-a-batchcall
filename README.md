# Build a BatchCall

Superfluid introduces many novel functionalities including token streaming and
instant distribution to massive numbers of addresses. A less-known innovation is
the 'batch call'. Batch calls allow end users to batch massive amounts of Super
Token, Super App, and Superfluid Agreement calls into a single transaction.

For newcomers, this can be difficult to pull off with the JS-SDK. This web app
seeks to make the process of building and encoding batch calls straight forward.

This is part of a greater effort to optimize the user experience in the
Superfluid ecosystem.

## Interesting Things About Batch Calls

At the time of writing, it seems the limit of the batch calls is not in gas, as
Matic and Goerli have crazy high gas limits, but instead in the input size limit
for RPC endpoints.

Online sources have mentioned varying RPC sizes, so this is only speculation on
the actual limits of batch calls. The setup used to test the following was via
Metamask with the standard Goerli config.

To date, my biggest successful batch call was `584 ERC20_APPROVE` operations.
Lol.

From what I gather, the byte limit is between `130,884` and `131,108`. The base
byte size is `68` bytes, and here are the sizes of standard calls:

| Call                 | Byte Size |
| -------------------- | --------- |
| BASE                 | 68        |
| ERC20_APPROVE        | 224       |
| ERC20_TRANSFER_FROM  | 256       |
| SUPERTOKEN_UPGRADE   | 192       |
| SUPERTOKEN_DOWNGRADE | 192       |
| CREATE_FLOW          | 548       |
| UPDATE_FLOW          | 548       |
| DELETE_FLOW          | 548       |
| CREATE_INDEX         | 516       |
| UPDATE_INDEX         | 548       |
| DISTRIBUTE           | 548       |
| UPDATE_SUBSCRIPTION  | 580       |
| APPROVE_SUBSCRIPTION | 548       |
| REVOKE_SUBSCRIPTION  | 548       |
| DELETE_SUBSCRIPTION  | 580       |
| CLAIM                | 580       |

If you batched, for example, a CLAIM and CREATE_FLOW, your estimated byte size
would be:

```
SIZE = BASE + CLAIM + CREATE_FLOW

1196 = 68 + 580 + 548
```

## Limitations / Issues

As of now, this only supports Goerli and Matic networks, but the full release
will have support for more networks.

Custom Super App Calls are not supported at this time, as gas and byte size
cannot be estimated.

The `ERC20_APPROVE` and `ERC20_TRANSFER_FROM` methods can ONLY be batched on
Super Tokens. If you want to batch `SUPERTOKEN_UPGRADE` from DAI to DAIx, for
example, you will need to Approve DAI to the DAIx contract address externally.
Unbatchable approvals on non-supertokens are unavoidable, but support for these
contract calls will likely be included in a future release.

## Scripts

As per the usual `create-react-app` scripts:

Once you clone this repo:

```bash
yarn
```

To start:

```bash
yarn start
```

To build it:

```bash
yarn build
```

---

## REPORTED ISSUES / SUGGESTIONS

- Improve token listings, add option to *only* show listed tokens
- Remove ctx from advanced options
- improve error handling for no window.ethereum presence
- only request account on batch call submission
- copy/paste button for raw JSON
