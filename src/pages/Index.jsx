import React, { useState } from "react";
import { ChakraProvider, Box, VStack, HStack, Button, Input, Text, Heading, FormControl, FormLabel, Select, List, ListItem, Divider, useToast } from "@chakra-ui/react";
import { FaTrash, FaArrowRight, FaPiggyBank, FaMoneyBillWave, FaRegListAlt } from "react-icons/fa";

// Mock data for accounts
const initialAccounts = [
  { id: 1, name: "Savings", balance: 1000.0 },
  { id: 2, name: "Checking", balance: 2500.0 },
];

const Index = () => {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [amount, setAmount] = useState("");
  const toast = useToast();

  // Functions to simulate account operations
  const createAccount = () => {
    const newAccount = {
      id: accounts.length + 1,
      name: `Account ${accounts.length + 1}`,
      balance: 0,
    };
    setAccounts([...accounts, newAccount]);
    toast({ title: "Account created.", status: "success", duration: 2000, isClosable: true });
  };

  const deleteAccount = (id) => {
    setAccounts(accounts.filter((account) => account.id !== id));
    toast({ title: "Account deleted.", status: "error", duration: 2000, isClosable: true });
  };

  const handleSelectChange = (e) => {
    setSelectedAccount(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const deposit = () => {
    const newAccounts = accounts.map((account) => {
      if (account.id.toString() === selectedAccount) {
        return { ...account, balance: account.balance + parseFloat(amount) };
      }
      return account;
    });
    setAccounts(newAccounts);
    toast({ title: "Deposit successful.", status: "success", duration: 2000, isClosable: true });
  };

  const withdraw = () => {
    const newAccounts = accounts.map((account) => {
      if (account.id.toString() === selectedAccount) {
        return { ...account, balance: account.balance - parseFloat(amount) };
      }
      return account;
    });
    setAccounts(newAccounts);
    toast({ title: "Withdrawal successful.", status: "success", duration: 2000, isClosable: true });
  };

  // Stub functions for features that would require a backend
  const transferFunds = () => toast({ title: "Transfer simulated.", status: "info", duration: 2000, isClosable: true });
  const setupDirectDebit = () => toast({ title: "Direct Debit simulated.", status: "info", duration: 2000, isClosable: true });
  const applyForLoan = () => toast({ title: "Loan application simulated.", status: "info", duration: 2000, isClosable: true });
  const calculateInterest = () => toast({ title: "Interest calculation simulated.", status: "info", duration: 2000, isClosable: true });
  const viewAccountHistory = () => toast({ title: "Account history simulated.", status: "info", duration: 2000, isClosable: true });

  return (
    <ChakraProvider>
      <VStack spacing={4} align="stretch" m={10}>
        <Heading as="h1" size="xl" textAlign="center">
          Online Banking Simulator
        </Heading>
        <Box p={5} shadow="md" borderWidth="1px">
          <VStack spacing={4}>
            <Button leftIcon={<FaPiggyBank />} colorScheme="teal" variant="solid" onClick={createAccount}>
              Create New Account
            </Button>
            <FormControl>
              <FormLabel htmlFor="account">Select Account:</FormLabel>
              <Select id="account" placeholder="Select account" onChange={handleSelectChange}>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name} - ${account.balance.toFixed(2)}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="amount">Amount:</FormLabel>
              <Input id="amount" placeholder="Enter amount" type="number" onChange={handleAmountChange} />
            </FormControl>
            <HStack>
              <Button leftIcon={<FaMoneyBillWave />} colorScheme="green" onClick={deposit}>
                Deposit
              </Button>
              <Button leftIcon={<FaMoneyBillWave />} colorScheme="red" onClick={withdraw}>
                Withdraw
              </Button>
              <Button leftIcon={<FaArrowRight />} colorScheme="blue" onClick={transferFunds}>
                Transfer
              </Button>
              <Button leftIcon={<FaTrash />} colorScheme="orange" onClick={() => deleteAccount(parseInt(selectedAccount))}>
                Delete Account
              </Button>
            </HStack>
            <Button leftIcon={<FaRegListAlt />} colorScheme="purple" onClick={viewAccountHistory}>
              View Account History
            </Button>
            <Button leftIcon={<FaRegListAlt />} colorScheme="cyan" onClick={setupDirectDebit}>
              Setup Direct Debit
            </Button>
            <Button leftIcon={<FaRegListAlt />} colorScheme="yellow" onClick={applyForLoan}>
              Apply for a Loan
            </Button>
            <Button leftIcon={<FaRegListAlt />} colorScheme="pink" onClick={calculateInterest}>
              Calculate Interest
            </Button>
          </VStack>
        </Box>
        <Box p={5}>
          <Heading as="h2" size="md">
            Accounts
          </Heading>
          <List spacing={3}>
            {accounts.map((account) => (
              <ListItem key={account.id}>
                <HStack justifyContent="space-between">
                  <Text>{account.name}</Text>
                  <Text>${account.balance.toFixed(2)}</Text>
                </HStack>
                <Divider />
              </ListItem>
            ))}
          </List>
        </Box>
      </VStack>
    </ChakraProvider>
  );
};

export default Index;
