import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    useDisclosure,
    Modal,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormLabel,
    FormControl,
    FormErrorMessage,
    Box,
    VStack,
    Text
  } from "@chakra-ui/react"
import {HStack, Input, Heading, Stack, Button} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {useForm} from "react-hook-form";
import {QRCode} from 'react-qrcode-logo';
import {gql, GraphQLClient} from "graphql-request";

const client = new GraphQLClient("http://localhost:8090/graphql");

interface userInformation{
  creationDate: Date,
  entityId: number,
  merchantId: number,
  nodeId: string,
  userId: number,
  username: string
}

interface WalletInformation{
    privateAddress: string,
    publicAddress: string,
    cryptocurrencyId: number
}

async function addUserMutation(username: string, password:string, merchant_id:number){
  const query = gql`
  mutation  {
    createUserAccount(
      input: {username: "${username}", password: "${password}", merchantId: ${merchant_id}}
    ) {
      result
    }
  }`;
  const {
    createUserAccount: { result },
  } = await client.request(query);
  return result;
}

function Users(){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [allusersdata, setallusersdata] = useState<userInformation[]>();
    const [walletData, setWalletData] = useState<WalletInformation[]>();
    const [withdrawalresponse, setwithdrawalresponse] = useState<string>();
    const client = new GraphQLClient("http://localhost:8090/graphql");
    const allUserQuer = gql`
    query allUserQuery {
      users {
        nodes {
          creationDate
          entityId
          merchantId
          nodeId
          userId
          username
          entity {
            wallets {
              nodes {
                publicAddress
              }
            }
          }
        }
      }
    }
    `;

    async function getWalletInfo(entity_id: number){
      const query=gql`
      query walletQuery {
        entity(entityId: ${entity_id}) {
          wallets {
            nodes {
              publicAddress
              cryptocurrencyId
            }
          }
        }
      }
      `;
      let walletInfo = await client.request(query);
      console.log(walletInfo);
      setWalletData(walletInfo!.entity.wallets.nodes);
    }

    useEffect(() => {

        async function graphQLUserdata() {
          try{
            let userResult = await client.request(allUserQuer);
            console.log(userResult);
            setallusersdata(userResult!.users.nodes);
          } catch(e) {
            console.error(e.message);
          }
        }
        graphQLUserdata();
    },[allUserQuer]);
    console.log(allusersdata);

    async function performWithdrawal(merchant_id: number,user_id: number,withdraw_address: string, amount: string, crypto_id: number){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({merchantId: merchant_id, userId: user_id, withdrawAddress: withdraw_address, amount: amount, cryptocurrencyId: crypto_id })
      };
      fetch('http://localhost:8000/user/withdraw', requestOptions)
      .then(async response => {
          const isJson = response.headers.get('content-type')?.includes('application/json');
          const data = isJson && await response.json();

          // check for error response
          if (!response.ok) {
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;
              setwithdrawalresponse (error.toString());
              return Promise.reject(error);
          }
          console.log("withdrawal success");
          setwithdrawalresponse("Withdrawal Succesful!");
      })
      .catch(error => {
          console.error('There was an error!', error.toString());
          setwithdrawalresponse (error.toString());
      });
    }

    function DisplayUserSubInfo(userparticulars: userInformation){
        if(walletData!==undefined){
          console.log(walletData);
          return(
              <Box color="gray.50">
              <HStack>
              <VStack>
              <Text fontSize="xl">User name: {userparticulars.username}</Text>
              <Text fontSize="xl">Node Id: {userparticulars.nodeId}</Text>
              <Text fontSize="xl">User Id: {userparticulars.userId}</Text>
              </VStack>
              {walletData.map(wallet=>(
                <VStack>
                <Text fontSize="xl">Public Address: {wallet!.publicAddress}</Text>
                <QRCode value={wallet!.publicAddress}/>
                <Button onClick={()=>performWithdrawal(userparticulars.merchantId, userparticulars.userId, wallet.publicAddress,"0.001",wallet.cryptocurrencyId)}>Withdraw</Button>
                <Text fontSize="md">{withdrawalresponse}</Text>
                </VStack>

              ))}

              </HStack>
              </Box>

          );
        } else {
          return(
            <Text fontSize="xl">Sorry User and Wallet Info unavailable</Text>
          )
        }
    }


    function AllPlayersList(userdata:userInformation[]){
            const [qrstate, setqrstate] = useState(false);
            // const [qrstring, setqrstring] = useState<string>();
            const [userparticulars, setuserparticulars] = useState<userInformation>()
            if(userdata!==undefined) {
            return(
            <div>
            <Table variant="simple">
                <TableCaption>List of all player contact credentials</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Username</Th>
                            <Th>Creation Date</Th>
                        </Tr>
                    </Thead>
                    {userdata.map(user => (
                        <Tbody>
                           <Td>
                                {user.username}
                            </Td>
                            <Td>{user.creationDate}</Td>
                            <td><Button
                            onClick={()=>
                              {setqrstate(!qrstate);
                                setuserparticulars(user);
                                getWalletInfo(user.entityId);
                            }}>Get Player Details</Button></td>
                    </Tbody>
                    ))}
            </Table>
            {
                qrstate===true &&
                    DisplayUserSubInfo(userparticulars!)
            }
            </div>
        );
        } else {
          return(
            <Table variant="simple">
                <TableCaption>List of all player contact credentials</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Username</Th>
                            <Th>email</Th>
                        </Tr>
                    </Thead>      
                    <Tbody>
                           <Td>
                             n/a
                            </Td>
                            <Td>n/a</Td>
                            <td><Button onClick={()=>setqrstate(!qrstate)}>Get Player Details</Button></td>
                    </Tbody>
                  </Table>    
          );
        }
        
    }
    function ModalFormContent(){

        const {
            handleSubmit,
            register,
            formState: { errors, isSubmitting }
          } = useForm();
        
          function onSubmit(values: any) {
            return new Promise<void>((resolve) => {
              setTimeout(() => {
                addUserMutation(values.Username, values.Password, values.MerchantId);
                resolve();
              }, 3000);
            });
          }
        
          return (
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.Firstname}>
                <FormLabel htmlFor="fname">First name</FormLabel>
                <Input
                  id="Playerfname"
                  placeholder="First name"
                  {...register("Firstname", {
                    required: "This is required"})}
                />
                </FormControl>
                <FormControl isInvalid={errors.Lastname}>
                <FormLabel htmlFor="lname">Last name</FormLabel>
                <Input
                  id="Playerlname"
                  placeholder="Last name"
                  {...register("Lastname", {
                    required: "This is required",})}
                />
                </FormControl>
                <FormControl isInvalid={errors.MerchantId}>
                <FormLabel htmlFor="merchantid">Merchant Id</FormLabel>
                <Input
                  isNumeric
                  id="UserMerchantId"
                  placeholder="Merchant Id"
                  {...register("MerchantId", {
                    required: "This is required"})}
                />
                </FormControl>
                <FormControl isInvalid={errors.Username}>
                <FormLabel htmlFor="Username">Username</FormLabel>
                <Input
                  id="PlayerUsername"
                  placeholder="Username"
                  {...register("Username", {
                    required: "This is required"})}
                />
                <FormErrorMessage>
                  {errors.Username && errors.Username.message}
                </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.Password}>
                <FormLabel htmlFor="password">password</FormLabel>
                <Input
                  type="password"
                  id="PlayerPassword"
                  placeholder="Password"
                  {...register("Password", {
                    required: "This is required",
                    minLength:{value:8, message: "Minimum length of password is 8"}})}
                />
                <FormErrorMessage>
                  {errors.Password && errors.Password.message}
                </FormErrorMessage>
                </FormControl>
              <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
                Submit
              </Button>
            </form>
          );
    }
    function AddPlayerModal(){
        return (
            <div>
                <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New Player</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    {ModalFormContent()}
                    </ModalBody>

                    <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    </ModalFooter>
                </ModalContent>
                </Modal>
            </div>
        );
    }
    return(
        <div>
            <br/> 
            <Heading as="h3" size="lg"> Users </Heading>
            <br/>
            <Stack direction="column">
                <Heading as="h4" size="md">All players</Heading>
                {/* <HStack>
                    <Input placeholder="username" size="md" />
                    <Input placeholder="email" size="md" />
                </HStack> */}
                {AllPlayersList(allusersdata!)}
                {AddPlayerModal()}
                <HStack>
                    <Button 
                    colorScheme="blue" 
                    size="md"
                    onClick={onOpen}
                    >
                        Add Player
                    </Button>
                </HStack>
            </Stack>
            <br/>
        </div>
    );
    
}
export default Users;