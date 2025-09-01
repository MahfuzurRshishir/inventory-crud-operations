'use client'
import axios from 'axios';
import { error } from 'console';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


const InsertData = () => {
   const router = useRouter(); // useRouter() is used to programmatically navigate to a different page

   const [name, set_name] = useState('')
   const [quantity, set_quantity] = useState('')
   const [unit, set_unit] = useState('')
   const [description, set_description] = useState('')

   const handleSubmit = async (e: any) => {
      e.preventDefault()
      const data = {
         name,
         quantity: Number(quantity),
         unit,
         description
      }
      try {
         await axios.post('http://localhost:3000/inventory/addItem', data)
         alert('Inserted new inventory item')
         set_name('')
         set_quantity('')
         set_unit('')
         set_description('')
      }
      catch (e) {
         alert('error to insert new inventory item')
         console.log(e)
      }
   }

   return (
      <>

         <div>
            <h1><u>
               Insert Inventory Item
            </u></h1>
         </div>
         <fieldset>
            <form onSubmit={handleSubmit}>
               <label htmlFor="name">Name of the new item:</label>
               <input type="text"
                  placeholder='Enter Name'
                  value={name}
                  onChange={(e) => set_name(e.target.value)}
                  required
               /> <br />

               <label htmlFor="quantity">Enter Quantity:</label>
               <input type="number"
                  placeholder='Enter Quantity'
                  value={quantity}
                  onChange={(e) => set_quantity(e.target.value)}
                  required
               /><br />

               <label htmlFor="unit">Enter Unit:</label>
               <input type="text"
                  placeholder='Enter Unit'
                  value={unit}
                  onChange={(e) => set_unit(e.target.value)}
                  required
               /><br />


               <label htmlFor="description">Give item's Description:</label>
               <input type="text"
                  placeholder='Enter Description'
                  value={description}
                  onChange={(e) => set_description(e.target.value)}
                  required
               /><br />

               <button style={{ backgroundColor: 'darkgreen', color: 'white' }} type='submit'>Add</button>
            </form>
            <br />
            <button style={{ backgroundColor: 'darkblue', color: 'white' }}
               onClick={() => router.push('/show')}>Show All
            </button>

         </fieldset>

      </>
   );
};

export default InsertData;