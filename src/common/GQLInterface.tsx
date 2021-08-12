import { request, gql } from 'graphql-request'
import { MerchantWallets, MerchantTransactions } from "./Entities"

// TODO: Add all these functions into a class and make sure this endpoint is not a global varaible :)
const endpoint = 'http://localhost:8090/graphql'

export async function query_merchant_wallets(merchant_id: number): Promise<MerchantWallets[]> {
  const query = gql`
  query MyQuery ($merchant_id: Int!){
  merchant(merchantId: $merchant_id) {
    entity {
      wallets {
        nodes {
          unvalidatedBalance
          validatedBalance
          cryptocurrency {
            longname
          }
        }
      }
    }
  }
}
`
  const variables = {
    merchant_id: merchant_id,
  }
  const data = await request(endpoint, query, variables);
  if (!data.merchant)
  {return []}
  return data.merchant.entity.wallets.nodes;
}

export async function query_merchant_transactions(merchant_id: number): Promise<MerchantTransactions[]> {
  const query = gql`
query MyQuery($merchant_id: Int!) {
  merchant(merchantId: $merchant_id) {
    entity {
      transactions {
        nodes {
          amount
          blockNumber
          cryptocurrency {
            longname
          }
          fromAddress
          gasFee
          status
          toAddress
          transactionHash
        }
      }
    }
  }
}

  `
  const variables = {
    merchant_id: merchant_id,
  }
  const data = await request(endpoint, query, variables);
  if (!data.merchant)
  {return []}
  return data.merchant.entity.transactions.nodes;
}
// todo: finish this function
// export async function query_merchant_pubid(merchant_id: number) {
//   const query = gql`
//   query MyQuery {
//     merchant(merchantId: $merchant_id) {
//       entity {
//         transactions {
//           nodes {
//             transactionId
//             toAddress
//             fromAddress
//             cryptocurrency {
//               longname
//             }
//             gasFee
//             amount
//             verificationStage
//             blockChain
//           }
//         }
//       }
//     }
//   `
//   const variables = {
//     merchant_id: merchant_id,
//   }
//   const data = await request(endpoint, query, variables);
//   return data.merchant.entity.transactions.nodes;
// }
