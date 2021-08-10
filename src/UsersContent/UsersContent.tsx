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

  } from "@chakra-ui/react"
import {HStack, Input, Heading, Stack, Button} from "@chakra-ui/react";
import { useState } from "react";
import {useForm} from "react-hook-form";
import {QRCode} from 'react-qrcode-logo';

function Users(){
    const { isOpen, onOpen, onClose } = useDisclosure()

    function GenQRCode(val: string){
        return(
            <Box color="gray.50">
            <QRCode value={val}/>
            </Box>

        );
    }


    function AllPlayersList(username: string, email: string){
            const [qrstate, setqrstate] = useState(false);
            return(
            <div>
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
                                {username}
                            </Td>
                            <Td>{email}</Td>
                            <td><Button onClick={()=>setqrstate(!qrstate)}>Get Player Details</Button></td>
                    </Tbody>
            </Table>
            {
                qrstate===true &&
                    GenQRCode(username)
            }
            </div>
            
        );
        
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
                alert(JSON.stringify(values, null, 2));
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
                <FormControl isInvalid={errors.Email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="PlayerEmail"
                  placeholder="Email"
                  {...register("Email", {
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
    return (
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
                {AllPlayersList("dummyUsername", "dummy@gmail.com")}
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