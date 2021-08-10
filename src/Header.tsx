import {Button, HStack} from "@chakra-ui/react";
import {useHistory} from "react-router-dom";

import {
  Box,
  Flex,
  Text,
  IconButton,
  // Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';

function Header() {
  const history = useHistory();
  return (
    <div className="App">
      <HStack spacing = "30px"
      bg={useColorModeValue('white', 'gray.800')}
      color={useColorModeValue('gray.600', 'white')}
      minH={'60px'}
      py={{ base: 2 }}
      px={{ base: 4 }}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.900')}
      align={'center'}>
        <Button 
        as={'a'}
        fontSize={'sm'}
        fontWeight={400}
        variant={'link'}
        href={'#'}
        
        onClick={() => history.push('/Dashboard')}>
            Dashboard
        </Button>
        <Button 
        as={'a'}
        fontSize={'sm'}
        fontWeight={400}
        variant={'link'}
        href={'#'}
        onClick={() => history.push('/Users')}>
            Users
        </Button>
        <Button 
        as={'a'}
        fontSize={'sm'}
        fontWeight={400}
        variant={'link'}
        href={'#'}
        onClick={() => history.push('/Settings')}>
            Settings
        </Button>
      </HStack>
    </div>
  );
}

export default Header;