import {
  Button,
  Modal,
  Table,
} from "flowbite-react";
import { useEffect, type FC, useState } from "react";
import { HiOutlineExclamationCircle, HiTrash } from "react-icons/hi";
import EditUserModal from "./EditUserModal";

interface AllUsersTableProps {
  search: string;
}

const AllUsersTable: FC<AllUsersTableProps> = function ({ search }) {


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
      [id]: !prevState[id]
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
      setUsers(users.filter(item => item._id !== id));
    } catch (error) {
      setError(error);
    }
  };

  const handleUpdate = () => {
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
        onUpdate(updatedUserData); 
        setOpen(false); 
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!users) return <div>No data available</div>;

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );


    return (



<>


      <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
        <Table.Head className="bg-gray-100 dark:bg-gray-700">
          <Table.HeadCell className="pl-20">Name</Table.HeadCell>
          <Table.HeadCell>Address</Table.HeadCell>
          <Table.HeadCell>Id</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
          {filteredUsers.map((user) => (
            <Table.Row key={user._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
            <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
              <img
                className="h-10 w-10 rounded-full"
                src="/images/user.png"
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
              {user.address}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
              <div className="flex items-center">
                #{user.id}
              </div>
            </Table.Cell>
            <Table.Cell>
  <div className="flex items-center gap-x-3 whitespace-nowrap">
    <Button color="failure" onClick={() => toggleModal(user._id)}>
      <div className="flex items-center gap-x-1">
        <HiTrash className="text-lg" />
        <span>Delete</span>
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
              setOpen(false);
              handleDelete(user._id);
            }}>
              Yes, I'm sure
            </Button>
            <Button color="gray" onClick={() => toggleModal(user._id)}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
    <EditUserModal user={user} onUpdate={(updatedUser) => handleUpdate(updatedUser)} />
  </div>
</Table.Cell>

          </Table.Row>
          ))}
         
        </Table.Body>
      </Table>
</>
    );
  };


  export default AllUsersTable