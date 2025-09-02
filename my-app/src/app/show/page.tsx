'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';



const ShowData = () => {
    const router = useRouter(); // useRouter() is used to programmatically navigate to a different page
    interface inventoryItem {
        id: number;
        name: string;
        quantity: number;
        unit: string;
        description: string;
    }
    const [item, setItem] = useState<inventoryItem[]>([]);

    const fetchItems = () => {
        axios.get('http://localhost:3000/inventory/items')
            .then((res) => setItem(res.data));
    };

    useEffect(() => {
        fetchItems();
    }, []);


    // Delete handler
    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
        if (!confirmDelete) return; // If "No", do nothing

        try {
            await axios.delete(`http://localhost:3000/inventory/delete/${id}`);
            setItem(prev => prev.filter(i => i.id !== id)); // Remove from UI
        } catch (e) {
            alert('Error deleting item');
            console.log(e);
        }

    };

    const updateStock = async (e: any) => {
        e.preventDefault();
        const form = e.target;
        let quantity = form.quantity.value;
        const action = e.nativeEvent.submitter.name; // Get the name of the button clicked
        const id = e.nativeEvent.submitter.value;

        if (action === 'Reduce') {
            quantity = -(Number(quantity)); // Ensure quantity is negative for reduction
        }

        try {
            await axios.patch(`http://localhost:3000/inventory/quantity/${id}`, { quantity: Number(quantity) });
            alert('Stock updated successfully');
            fetchItems(); // <-- Refetch data here
            form.reset();
        } catch (e) {
            alert('Error updating stock');
            console.log(e);
            form.reset();
        }

    }

    return (
        <>
            <div>
                <h1><u>
                    Inventory Items
                </u></h1>
            </div>
            <table border={1}>
                <thead>
                    <tr style={{ backgroundColor: 'ActiveBorder', color: 'white' }}>
                        <th>Serial</th>
                        {/*  <th>Id</th> */}  
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Description</th>
                        <th colSpan={2}>Action</th>
                        <th colSpan={3}>Update Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {item
                        .slice()
                        .sort((a, b) => a.id - b.id)
                        .map((ab, idx) => (
                            <tr key={ab.id}
                                style={{
                                    backgroundColor: idx % 2 === 0 ? '#c4c3d0' : '#ffffff' // light gray and white
                                }}
                            >
                                <td>{idx + 1}</td>
                                {/* <td>{ab.id}</td> */}
                                <td>{ab.name}</td>
                                <td>{ab.quantity}</td>
                                <td>{ab.unit}</td>
                                <td>{ab.description}</td>
                                <td>
                                    <button style={{ backgroundColor: 'darkred', color: 'white' }}
                                        onClick={() => handleDelete(ab.id)}>Delete
                                    </button>
                                </td>
                                <td>
                                    <button style={{ backgroundColor: 'darkblue', color: 'white' }}
                                        onClick={() => router.push(`/update?id=${ab.id}`)}>Update
                                    </button>
                                </td>
                                <td>
                                    <form onSubmit={updateStock}>
                                        <input
                                            type="number"
                                            name='quantity'
                                            style={{ width: '70px' }}
                                            placeholder='Enter Qty'
                                            min={0}
                                        ></input>
                                        <button style={{ backgroundColor: 'darkgreen', color: 'white' }}
                                            type='submit' name='Add' value={ab.id}>Add
                                        </button>
                                        <button style={{ backgroundColor: 'darkred', color: 'white' }}
                                            type='submit' name='Reduce' value={ab.id}>Reduce
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}

                    <tr>
                        <td colSpan={1}>
                            <button style={{ backgroundColor: 'green', color: 'white' }}
                                onClick={() => router.push('/insert')}>Add Item
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default ShowData;