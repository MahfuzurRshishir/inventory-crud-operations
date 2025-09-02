'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const UpdateData = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id'); // expects /update?id=3
    

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [description, setDescription] = useState('');

    // Fetch existing item data
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/inventory/item/${id}`)
                .then(res => {
                    setName(res.data.name);
                    setQuantity(res.data.quantity.toString());
                    setUnit(res.data.unit);
                    setDescription(res.data.description);
                })
                .catch(() => alert('Failed to fetch item data'));
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            name,
            quantity: Number(quantity),
            unit,
            description,
        };
        try {
            await axios.put(`http://localhost:3000/inventory/update/${id}`, data);
            alert('Item updated successfully');
            router.push('/show');
        } catch (e) {
            alert('Error updating item');
            console.log(e);
        }
    };

    return (
        <>
            <h2>Update Inventory Item</h2>
            <fieldset>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    /><br />

                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        placeholder="Enter Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    /><br />

                    <label htmlFor="unit">Unit:</label>
                    <input
                        type="text"
                        placeholder="Enter Unit"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        required
                    /><br />

                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        placeholder="Enter Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    /><br />

                    <button style={{ backgroundColor: 'darkblue', color: 'white' }}
                        type="submit">Update
                    </button>
                </form>
                <br/>
                <button style={{ backgroundColor: 'darkred', color: 'white' }}
                    onClick={() => router.push('/show')}>Back
                </button>
            </fieldset>

        </>
    );
};

export default UpdateData;