import {
  Badge,
  Button,
  Checkbox,
  Dropdown,
  Label,
  Modal,
  Table,
} from "flowbite-react";
import { useEffect, type FC, useState } from "react";

const AllTransactionsTable: FC = function () {


  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/transaction');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setTransactions(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(transactions);

  const Badge = ({ color, children }) => (
    <span style={{ color }}>{children}</span>
 );

 const TransactionStatusBadge = ({ status }) => {
    let badgeColor = '';

    switch (status) {
      case 'Failed':
        badgeColor = 'failure';
        break;
      case 'Completed':
        badgeColor = 'success';
        break;
      case 'In Progress':
        badgeColor = 'in progress';
        break;
      default:
        badgeColor = 'default';
    }

    return <Badge color={badgeColor}>{status}</Badge>;
 };



    return (


<>





      
<div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
        <div>
              <Table
                striped
                className="min-w-full divide-y divide-gray-200 dark:divide-gray-600"
              >
                <Table.Head className="bg-gray-50 dark:bg-gray-700">
                  <Table.HeadCell>Transaction</Table.HeadCell>
                  <Table.HeadCell>Date &amp; Time</Table.HeadCell>
                  <Table.HeadCell>Amount</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                </Table.Head>
                <Table.Body className="bg-white dark:bg-gray-800">
                  {transactions.map((transaction) => (
                    
                    <Table.Row key={transaction.date} >
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                    {transaction.type} to {transaction.party}
                      <span className="font-semibold">#00910</span>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                    {transaction.date}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">
                    {transaction.amount} MAD
                    </Table.Cell>
                    <Table.Cell className="flex whitespace-nowrap p-4">
                      <TransactionStatusBadge status={transaction.status} />
                    </Table.Cell>
                  </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
    </div>
</>
    );
  };


  export default AllTransactionsTable