import { Button, Label, Modal, TextInput } from "flowbite-react";
import { FC, useState } from "react";
import { HiPlus } from "react-icons/hi";

const AddUserModal: FC = function () {
    const [isOpen, setOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    

  
    const handleAdd = async () => {
        console.log(userName,userEmail,userPassword);
        
          try {
            const response = await fetch('http://localhost:5000/user', {
              method: 'POST',
              headers: {  
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  name: userName,
                  email: userEmail,
                  password: userPassword
              }),
            });
            console.log(response);
            
            if (!response.ok) {
              throw new Error('Failed to add data');
            }
            const newItem = await response.json();
            setUsers([...users, newItem]);
            setUserName('');
            setUserEmail('');
            setUserPassword('');
          } catch (error) {
            setError(error);
            console.error(error)
          }
        };
    return (
      <>
        <Button color="primary" onClick={() => setOpen(true)}>
          <div className="flex items-center gap-x-3">
            <HiPlus className="text-xl" />
            Add user
          </div>
        </Button>
        <Modal onClose={() => setOpen(false)} show={isOpen}>
          <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
            <strong>Add new user</strong>
          </Modal.Header>
          <Modal.Body>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

              <div>
                <Label htmlFor="lastName">name</Label>
                <div className="mt-1">
                  <TextInput id="lastName" name="lastName" placeholder="Green"     
                      onChange={(e) => setUserName(e.target.value)} 
                      value={userName} 

/>
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="mt-1">
                  <TextInput
                    id="email"
                    name="email"
                    placeholder="example@company.com"
                    type="email"
                    value={userEmail} 
                    onChange={(e) => setUserEmail(e.target.value)} 
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">password</Label>
                <div className="mt-1">
                  <TextInput
                    id="phone"
                    name="phone"
                    placeholder="e.g., +(12)3456 789"
                    type="tel"
                    value={userPassword} 
                    onChange={(e) => setUserPassword(e.target.value)} 
                  />
                </div>
              </div>

            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="primary" onClick={() => {
                handleAdd()
                setOpen(false)
            }}>
              Add user
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };


  export default AddUserModal