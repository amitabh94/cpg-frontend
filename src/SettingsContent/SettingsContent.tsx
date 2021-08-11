import {HStack, Input, Heading, Text, Stack, Radio, RadioGroup, Button,  InputLeftElement, chakra} from "@chakra-ui/react";
import { useState } from "react";

import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);


function SettingsContent(){

    function RadioOption() {
        const [value, setValue] = useState("1")
        return (
          <RadioGroup onChange={setValue} value={value}>
            <HStack>
              <Text fontSize="lg">Auto Transfer</Text>
              <Radio value="1">Yes</Radio>
              <Radio value="2">No</Radio>
            </HStack>
          </RadioGroup>
        )
    }

    return (
        <div>
            <br/> 
            <Heading as="h3" size="lg"> Settings </Heading>
            <br/>
            <Stack>
            <HStack spacing={3}>
                <Text fontSize="lg">Merchant Withdrawal Address</Text>
                {/* <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  /> */}

                <Input placeholder="Insert Address." size="md" />
            </HStack>
            <HStack spacing={3}>
                <Text fontSize="lg">Webhook</Text>
                <Input placeholder="Insert WebHook." size="md" />
            </HStack>
            {RadioOption()}
            <HStack> <Button colorScheme="blue" size="sm"> Submit Settings</Button></HStack>
            </Stack>
        </div>
    );
}

export default SettingsContent;