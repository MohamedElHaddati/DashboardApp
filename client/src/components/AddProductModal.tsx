import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { FC, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {  HiUpload } from "react-icons/hi";

const AddUserModal: FC = function () {
    const [isOpen, setOpen] = useState(false);
    const [productName, setProductName] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [productCategorie, setProductCategorie] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    

  
    const handleAdd = async () => {
        console.log();
        
          try {
            const response = await fetch('http://localhost:5000/product', {
              method: 'POST',
              headers: {  
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: productName,
                brand: productBrand,
                categorie: productCategorie,
                price: productPrice,
                description: productDescription
              }),
            });
            console.log(response);
            
            if (!response.ok) {
              throw new Error('Failed to add data');
            }
            const newItem = await response.json();
            setProducts([...products, newItem]);
            setProductName('');
            setProductBrand('');
            setProductCategorie('');
            setProductPrice('');
            setProductDescription('');
          } catch (error) {
            setError(error);
            console.error(error)
          }
        };
    return (
      <>
        <Button color="primary" onClick={() => setOpen(!isOpen)}>
        <FaPlus className="mr-3 text-sm" />
        Add product
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Add product</strong>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="productName">Product name</Label>
                <TextInput
                  id="productName"
                  name="productName"
                  placeholder='Apple iMac 27"'
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <TextInput
                  id="category"
                  name="category"
                  placeholder="Electronics"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="brand">Brand</Label>
                <TextInput
                  id="brand"
                  name="brand"
                  placeholder="Apple"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <TextInput
                  id="price"
                  name="price"
                  type="number"
                  placeholder="$2300"
                  className="mt-1"
                />
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="producTable.Celletails">Product details</Label>
                <Textarea
                  id="producTable.Celletails"
                  name="producTable.Celletails"
                  placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz"
                  rows={6}
                  className="mt-1"
                />
              </div>
              <div className="lg:col-span-2">
                <div className="flex w-full items-center justify-center">
                  <label className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <HiUpload className="text-4xl text-gray-300" />
                      <p className="py-1 text-sm text-gray-600 dark:text-gray-500">
                        Upload a file or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
        <Button color="primary" onClick={() => {
                handleAdd()
                setOpen(false)
            }}>
            Add product
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  };


  export default AddUserModal