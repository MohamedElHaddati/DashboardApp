import React, { useState } from 'react';
import { Button, Label, Modal, TextInput } from 'flowbite-react'; // Assuming you're using Flowbite components
import { HiOutlinePencilAlt } from 'react-icons/hi';

interface Product {
  _id: string;
  name: string;
  brand: string;
  price: number;
}

interface EditModalProps {
  product: Product;
  onUpdate: (updatedProduct: Product) => void;
}

const EditProductModal: React.FC<EditModalProps> = ({ product, onUpdate }) => {
  const [isOpen, setOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product>({
    _id: product._id,
    name: product.name,
    brand: product.brand,
    price: product.price
  });

  const handleEdit = () => {
    // Make PUT request to update product data
    // You can use fetch or Axios for making the request
    // Example using fetch:
    fetch(`http://localhost:5000/product/${editedProduct._id}`, {
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

  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-0">
          <HiOutlinePencilAlt className="text-lg" />
          Edit product
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Edit product</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <div className="mt-1">
                <TextInput
                  id="name"
                  name="name"
                  placeholder="Bonnie"
                  value={editedProduct.name}
                  onChange={e => setEditedProduct({ ...editedProduct, name: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="brand">Brand</Label>
              <div className="mt-1">
                <TextInput
                  id="email"
                  name="email"
                  placeholder="example@company.com"
                  value={editedProduct.brand}
                  onChange={e => setEditedProduct({ ...editedProduct, brand: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="name">Price</Label>
              <div className="mt-1">
                <TextInput
                  id="name"
                  name="name"
                  placeholder="Bonnie"
                  type='number'
                  value={editedProduct.price}
                  onChange={e => setEditedProduct({ ...editedProduct, price: parseFloat(e.target.value) })}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={() => {
                handleEdit()
                setOpen(false)
            }}>
            Save all
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditProductModal;
