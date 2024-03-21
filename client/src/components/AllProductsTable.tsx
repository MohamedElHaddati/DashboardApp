import {
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
} from "flowbite-react";
import { useEffect, type FC, useState } from "react";

const AllProductsTable: FC = function () {


  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [deleteModals, setDeleteModals] = useState({});
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/product');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setProducts(jsonData);
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
      [id]: !prevState[id] // Toggle the modal state for the specified product ID
    }));
  };


  const handleDelete = async (id) => {
    
    try {
      const response = await fetch(`http://localhost:5000/product/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete data');
      }
      // Remove deleted item from data
      setProducts(products.filter(item => item._id !== id));
    } catch (error) {
      setError(error);
    }
  };

  const handleUpdate = () => {
    // Make PUT request to update product data
    // You can use fetch or Axios for making the request
    // Example using fetch:
    fetch(`http://localhost:5000/product/${editedProduct.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedProduct),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update product');
        }
        return response.json();
      })
      .then(updatedProductData => {
        onUpdate(updatedProductData); // Update parent component's state with the updated product data
        setOpen(false); // Close the modal after successful update
      })
      .catch(error => {
        console.error('Error updating product:', error);
        // Handle error here (e.g., show error message)
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!products) return <div>No data available</div>;



    return (


<>



      
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>
          <span className="sr-only">Toggle selected</span>
          <Checkbox />
        </Table.HeadCell>
        <Table.HeadCell>Product Name/Brand</Table.HeadCell>
        <Table.HeadCell>Description</Table.HeadCell>
        <Table.HeadCell>ID</Table.HeadCell>
        <Table.HeadCell>Price</Table.HeadCell>
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {products.map((product) => (
        <Table.Row className="hover:bg-gray-100 dark:hover:bg-gray-700">
          <Table.Cell className="w-4 p-4">
            <Checkbox />
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
            <div className="text-base font-semibold text-gray-900 dark:text-white">
              {product.name}
            </div>
            <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {product.brand}
            </div>
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
            {product.description}
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
            #{product.id}
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
            {product.price} MAD
          </Table.Cell>
          <Table.Cell className="space-x-2 whitespace-nowrap p-4">
            <div className="flex items-center gap-x-3">
              {/*<EditProductModal />
              <DeleteProductModal />*/}
            </div>
          </Table.Cell>
        </Table.Row>
        ))}
        
      </Table.Body>
    </Table>
</>
    );
  };


  export default AllProductsTable