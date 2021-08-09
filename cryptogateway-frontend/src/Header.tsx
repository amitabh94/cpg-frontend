import {Button, HStack} from "@chakra-ui/react";
import {useHistory} from "react-router-dom";

function Header() {
  const history = useHistory();
  return (
    <div className="App">
      <HStack spacing = "30px">
        <Button 
        colorScheme="blue" 
        size="md"
        onClick={() => history.push('/Dashboard')}>
            Dashboard
        </Button>
        <Button 
        colorScheme="red" 
        size="md"
        onClick={() => history.push('/Users')}>
            Users
        </Button>
        <Button 
        colorScheme="green" 
        size="md"
        onClick={() => history.push('/Settings')}>
            Settings
        </Button>
      </HStack>
    </div>
  );
}

export default Header;