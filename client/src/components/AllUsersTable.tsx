import {
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
} from "flowbite-react";
import { useEffect, type FC, useState } from "react";
import { HiOutlineExclamationCircle, HiTrash } from "react-icons/hi";
import EditUserModal from "./EditUserModal";

const AllUsersTable: FC = function () {


  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [deleteModals, setDeleteModals] = useState({});
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/user');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setUsers(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleModal = (id) => {
    setDeleteModals(prevState => ({
      ...prevState,
      [id]: !prevState[id] // Toggle the modal state for the specified user ID
    }));
  };


  const handleDelete = async (id) => {
    
    try {
      const response = await fetch(`http://localhost:5000/user/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete data');
      }
      // Remove deleted item from data
      setUsers(users.filter(item => item._id !== id));
    } catch (error) {
      setError(error);
    }
  };

  const handleUpdate = () => {
    // Make PUT request to update user data
    // You can use fetch or Axios for making the request
    // Example using fetch:
    fetch(`http://localhost:5000/user/${editedUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedUser),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update user');
        }
        return response.json();
      })
      .then(updatedUserData => {
        onUpdate(updatedUserData); // Update parent component's state with the updated user data
        setOpen(false); // Close the modal after successful update
      })
      .catch(error => {
        console.error('Error updating user:', error);
        // Handle error here (e.g., show error message)
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!users) return <div>No data available</div>;



    return (


<>



      <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
        <Table.Head className="bg-gray-100 dark:bg-gray-700">
          <Table.HeadCell>
            <Label htmlFor="select-all" className="sr-only">
              Select all
            </Label>
            <Checkbox id="select-all" name="select-all" />
          </Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Position</Table.HeadCell>
          <Table.HeadCell>Address</Table.HeadCell>
          <Table.HeadCell>Id</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
          {users.map((user) => (
            <Table.Row key={user._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
            <Table.Cell className="w-4 p-4">
              <div className="flex items-center">
                <Checkbox aria-describedby="checkbox-1" id="checkbox-1" />
                <label htmlFor="checkbox-1" className="sr-only">
                  checkbox
                </label>
              </div>
            </Table.Cell>
            <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
              <img
                className="h-10 w-10 rounded-full"
                src="/images/users/neil-sims.png"
                alt="Neil Sims avatar"
              />
              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  {user.name}
                </div>
                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {user.email}
                </div>
              </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              user
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              Address
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
              <div className="flex items-center">
                #{user.id}
              </div>
            </Table.Cell>
            <Table.Cell>
               <div className="flex items-center gap-x-3 whitespace-nowrap">
              
      
      <Button color="failure" onClick={() => toggleModal(user._id)}>
        <div className="flex items-center gap-x-0">
          <HiTrash className="text-lg" />
          Delete
        </div>
      </Button>
      <Modal onClose={() => toggleModal(user._id)} show={deleteModals[user._id]} size="md">
        <Modal.Header className="px-6 pt-6 pb-0">
          <span className="sr-only">Delete user</span>
        </Modal.Header>
        <Modal.Body className="px-6 pt-0 pb-6">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="text-7xl text-red-500" />
            <p className="text-xl text-gray-500">
              Are you sure you want to delete this user?
            </p>
            <div className="flex items-center gap-x-3">
              <Button color="failure" onClick={() => {
                setOpen(false)
                 handleDelete(user._id)
              }
                
                }>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => toggleModal(user._id)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
              </div>
              <EditUserModal user={user} onUpdate={(updatedUser) => handleUpdate(updatedUser)} />
            </Table.Cell>
          </Table.Row>
          ))}
         
        </Table.Body>
      </Table>
</>
    );
  };


  export default AllUsersTable