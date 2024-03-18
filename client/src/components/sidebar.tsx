import { Sidebar, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { Avatar } from 'flowbite-react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiOutlineCash,
  HiLogout,
  HiSearch,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";

const BASE_URL = `http://localhost:5000`;

const ExampleSidebar: FC = function () {
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
  }, [setCurrentPage]);

  
  const history = useNavigate();
  
  const [userInfo, setUserInfo] = useState<any>(null);

useEffect(() => {
  const fetchUserInfo = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      const response = await axios.get(`${BASE_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        setUserInfo(response.data);
      } else {
        console.error('Failed to fetch user info:', response);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  fetchUserInfo();
}, []);

  

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`);
      localStorage.removeItem('token'); // Clear token from localStorage
      localStorage.removeItem('userId');
      history('/sign-in'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle error (e.g., display a toast message)
    }
  };

  console.log(userInfo);
  

  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <div className="flex h-full flex-col justify-between py-2">
        <div>
          <form className="pb-3 md:hidden">
            <TextInput
              icon={HiSearch}
              type="search"
              placeholder="Search"
              required
              size={32}
            />
          </form>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
  {userInfo && ( // Check if userInfo is not null before rendering
    <Sidebar.Item>
      <div className="flex flex-wrap items-center gap-2">
        <div>
          <Avatar img="/images/users/roberta-casas-2x.png" size="lg" rounded />
        </div>
        <div className="space-y-1 font-medium dark:text-white">
          <div>{userInfo.name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Joined in August 2014 {userInfo.email}
          </div>
        </div>
      </div>
    </Sidebar.Item>
  )}
</Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="/"
                icon={HiChartPie}
                className={
                  "/" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                }
              >
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item
                href="/products"
                icon={HiShoppingBag}
                className={
                  "/products" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                Products
              </Sidebar.Item>
              <Sidebar.Item
                href="/users"
                icon={HiUsers}
                className={
                  "/users" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                Customers
              </Sidebar.Item>
              <Sidebar.Item
                href="/users"
                icon={HiOutlineCash}
                className={
                  "/users" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                Transactions
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="https://github.com/themesberg/flowbite-react/"
                icon={HiClipboard}
              >
                Docs
              </Sidebar.Item>
              <Sidebar.Item
                href="https://flowbite-react.com/"
                icon={HiCollection}
              >
                Components
              </Sidebar.Item>
              <Sidebar.Item
                href="https://github.com/themesberg/flowbite-react/issues"
                icon={HiInformationCircle}
              >
                Help
              </Sidebar.Item>
      <div onClick={handleLogout} style={{ cursor: 'pointer' }}>
        <Sidebar.Item icon={HiLogout}>
          Sign out
        </Sidebar.Item>
      </div>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  );
};

export default ExampleSidebar;
