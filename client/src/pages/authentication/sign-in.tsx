/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const BASE_URL = `http://localhost:5000`;

const SignInPage: FC = function () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        // Login successful
        const { token, _id, name, createdAt } = await response.json(); // Assuming the _id, name, and createdAt are returned by the server
  
        // Assuming createdAt is in a standard ISODate format
        const joinDate = new Date(createdAt).toDateString();
  
        localStorage.setItem('token', token);
        localStorage.setItem(
          'currentUser',
          JSON.stringify({ name, email, joinDate })
        );
  
        console.log("logged in, token: ", token,"id: ", _id);
        // Wait for token to be set
        await new Promise(resolve => setTimeout(resolve, 500));
        history('/');
      } else {
        // Login failed
        console.log("error");
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred");
    }
  };
  
  
  
  

  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      <div className="my-6 flex items-center gap-x-1 lg:my-0">
        <img
          alt=""
          src="images/business-report.png"
          /*src="https://flowbite.com/docs/images/logo.svg"*/
          className="mr-3 h-12"
        />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          FastDash
        </span>
      </div>
      <Card className="max-w-md mx-auto w-full"> {/* Adjusted max-width and centered */}
 <form className="flex flex-col gap-6 w-full"> {/* Increased gap for spacing */}
    <div>
      <div className="mb-4 block"> {/* Increased margin-bottom for spacing */}
        <Label htmlFor="email1" value="Your email" />
      </div>
      <TextInput
            id="email1"
            type="email"
            placeholder="name@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />{/* Ensure full width */}
    </div>
    <div>
      <div className="mb-4 block"> {/* Increased margin-bottom for spacing */}
        <Label htmlFor="password1" value="Your password" />
      </div>
          <TextInput
            id="password1"
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          /> {/* Ensure full width */}
    </div>
    <div className="flex items-center gap-2">
      <Checkbox id="remember" />
      <Label htmlFor="remember">Remember me</Label>
    </div>
    <Button onClick={handleLogin} className="w-100"> {/* Full width button */}
      Submit
    </Button>
 </form>
</Card>

<ToastContainer /> {/* Add the ToastContainer here */}
      
    </div>
  );
};

export default SignInPage;
