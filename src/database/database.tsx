import { request, gql } from 'graphql-request'

const endpoint = 'http://localhost:8090/graphql'

export async function query_merchant_wallets(merchant_id: number) {
  const query = gql`
  query MyQuery {
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
  }`
  const variables = {
    merchant_id: merchant_id,
  }
  const data = await request(endpoint, query, variables);
  return data.merchant.entity.wallets.nodes;
}

export async function query_merchant_transactions(merchant_id: number) {
  const query = gql`
  query MyQuery {
    merchant(merchantId: $merchant_id) {
      entity {
        transactions {
          nodes {
            transactionId
            toAddress
            fromAddress
            cryptocurrency {
              longname
            }
            gasFee
            amount
            verificationStage
            blockChain
          }
        }
      }
    }
  `
  const variables = {
    merchant_id: merchant_id,
  }
  const data = await request(endpoint, query, variables);
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

// async function database() {
//     console.log('function called')
//     const endpoint = 'http://localhost:8090/graphql'

//     const query = gql`
//       query MyQuery {
//         merchant(merchantId: 10) {
//           entity {
//             wallets {
//               nodes {
//                 unvalidatedBalance
//                 validatedBalance
//                 cryptocurrency {
//                   longname
//                 }
//               }
//             }
//           }
//         }
//       }
//       query MyQuery {
//         merchant(merchantId: 10) {
//           entity {
//             transactions {
//               nodes {
//                 transactionId
//                 toAddress
//                 fromAddress
//                 cryptocurrency {
//                   longname
//                 }
//                 gasFee
//                 amount
//                 verificationStage
//                 blockChain
//               }
//             }
//           }
//         }
//       }

//       }`

    

//     const variables = {
//       username: "test-user-1",
//     }
//     const data = await request(endpoint, query, variables)
//     console.log(JSON.stringify(data, undefined, 2))
//     // const users = []
//     // for (const user of data.users.nodes) {
//     //     users.push(<p>user.userId    user.username </p>)
//     // }
//     // console.log(users)

//     const wallet = data.merchant.entity.wallets.edges.node
//     const unvalidated_balance = wallet.unvalidatedBalance
//     const validated_balance = wallet.validatedBalance
    
//     return (
//         <p>test</p>
//     );
//   };

// export default database;