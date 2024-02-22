import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [items, setItems] = useState([{ 
    sNo: 1, 
    itemName: '', 
    qty: '', 
    price: '', 
    amount: '' ,
  }]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [sNoCounter, setSNoCounter] = useState(2);

  const handleNewButtonClick = () => {
    setItems([...items, { sNo: sNoCounter, itemName: '', qty: '', price: '', amount: '' }]);
    setSNoCounter((prevCounter) => prevCounter + 1);
  };

  const handleDeleteButtonClick = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    
    if (field === 'qty' || field === 'price') {
      const qty = parseFloat(updatedItems[index]['qty']) || 0;
      const price = parseFloat(updatedItems[index]['price']) || 0;
      updatedItems[index]['amount'] = (qty * price).toFixed(2);
    }

    setItems(updatedItems);
  };

  const handlePrintButtonClick = () => {
    console.log("Invoice Data:", { items, totalAmount });
  };

  useEffect(() => {
    const newTotalAmount = items.reduce((total, item) => total + parseFloat(item.amount || 0), 0);
    setTotalAmount(newTotalAmount.toFixed(2));
  }, [items]);

  return (
    <div id='main'>
      <div id='main-nav'>
        <nav>
          <h1>INVOICE</h1>
        </nav>
        <div id='body'>
          <div id='customer-details'>
          <tr>
            <td><label>Customer-Name : </label></td>
            <td><input type='text'placeholder='Customer-name' required/></td>

       
            
              <td><label>invoice-no : </label></td>
              <td><input type='tel'placeholder='# invoice-no'/></td>
            </tr>
            
            <tr>
              <td><label>Phone Number : </label></td>
              <td><input type='number'placeholder='Phone-number' required/></td>
            </tr>

            <tr>
              <td><label>E-mail : </label></td>
              <td><input type='email'placeholder='email' required/></td>
            </tr>
            <tr>
              <td><label>Address : </label></td>
              <td><input type='text'placeholder='Address'/></td>
            </tr>
          </div>
          <br></br>
          <div id='product-listtable'>
            <table>
              <thead id='headings'>
                <tr>
                  <th className='header1'>S.NO</th>
                  <th className='header2' >Customer-Name</th>
                  <th className='header3' >Quantity</th>
                  <th className='header3'>Price</th>
                  <th className='header3'>Amount</th>
                  {/* <th className='header3'>Actions</th> */}
                </tr>
              </thead>
              <tbody id='items-list'>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className='header1'>
                      <input type='number' placeholder='s.no' value={item.sNo} readOnly />
                    </td>
                    <td className='header2'>
                      <input type='text' placeholder='Item-name' value={item.itemName} onChange={(e) => handleInputChange(index, 'itemName', e.target.value)} />
                    </td>
                    <td className='header3'>
                      <input type='number' placeholder='Qty.' value={item.qty} onChange={(e) => handleInputChange(index, 'qty', e.target.value)} />
                    </td>
                    <td className='header3'>
                      <input type='number' placeholder='Price' value={item.price} onChange={(e) => handleInputChange(index, 'price', e.target.value)} />
                    </td>
                    <td className='header3'>
                      <input type='number' placeholder='Amount' value={item.amount} readOnly />
                    </td>
                    <td className='header3'>
                      <button id='btn-del' onClick={() => handleDeleteButtonClick(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <br></br>
              <button id='btn-new' onClick={handleNewButtonClick}>
                NEW
              </button>

              <tfoot>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Total Amount</th>
                  <th className='header3'><input type='number' id='total' value={totalAmount} readOnly /></th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
            <br></br>
            <div id='print'>
              <button id='btn-print' onClick={handlePrintButtonClick}>
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
