
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const OrdersSection = () => {
//   const [orders, setOrders] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [filter, setFilter] = useState('all');
//   const [statusFilter, setStatusFilter] = useState('all');


//  const [showAddForm, setShowAddForm] = useState(false);
//   const [newOrder, setNewOrder] = useState({
//     userId: '',
//     tableNumber: '',
//     status: 'Pending',
//     totalAmount: '',
//     items: '',
//   });
//   useEffect(() => {
//   fetchOrders();
// }, [statusFilter, filter]);


// const fetchOrders = async () => {
//   try {
//     const params = {};
//     if (statusFilter !== 'all') {
//       params.status = statusFilter;
//     }

//     const response = await axios.get('http://localhost:5000/api/orders', { params });
//     setOrders(response.data);
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//   }
// };


//   const updateStatus = async (id, status) => {
//     await axios.patch(`http://localhost:5000/api/orders/${id}`, { status });
//     fetchOrders();
//   };

//   const deleteOrder = async (id) => {
//     await axios.delete(`http://localhost:5000/api/orders/${id}`);
//     fetchOrders();
//   };

//   const printInvoice = (order) => {
//     const invoice = window.open('', '_blank');
//     invoice.document.write(`<pre>${JSON.stringify(order, null, 2)}</pre>`);
//     invoice.print();
//   };

// const filterOrders = (order) => {
//   const today = new Date().toLocaleDateString();
//   const orderDate = new Date(order.createdAt).toLocaleDateString();

//   const matchesDate = filter === 'today' ? orderDate === today : true;

//   const matchesStatus =
//     statusFilter === 'all'
//       ? true
//       : order.status?.toLowerCase() === statusFilter.toLowerCase();

//   return matchesDate && matchesStatus;
// };

//   const handleAddOrder = async () => {
//     try {
//       const parsedItems = JSON.parse(newOrder.items); // Should be an array of { name, price, quantity }
//       const total = parsedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//       await axios.post('http://localhost:5000/api/orders', {
//         ...newOrder,
//         totalAmount: total,
//         items: parsedItems,
//       });

//       setShowAddForm(false);
//       setNewOrder({ userId: '', tableNumber: '', status: 'Pending', totalAmount: '', items: '' });
//       fetchOrders();
//     } catch (err) {
//       alert('Error adding order. Make sure items is valid JSON.');
//     }
//   };

//   return (
//     <div className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen">
//       <h2 className="text-4xl font-extrabold text-purple-700 mb-6">Orders Panel</h2>

//       <div className="flex gap-6 mb-6 flex-wrap items-center">
//         <div className="bg-white p-4 rounded shadow w-48 border-l-4 border-purple-500 text-purple-700 font-medium">Total Orders: {orders.length}</div>
//         <div className="bg-white p-4 rounded shadow w-48 border-l-4 border-blue-500 text-blue-700 font-medium">Today's Orders: {orders.filter(o =>
//   new Date(o.createdAt).toLocaleDateString() === new Date().toLocaleDateString()
// ).length
// }</div>
//         <button
//           onClick={() => setFilter(filter === 'today' ? 'all' : 'today')}
//           className="bg-indigo-500 text-black px-4 py-2 rounded border border-indigo-700 hover:bg-indigo-600">
//           {filter === 'today' ? 'Show All' : "Show Today's"}
//         </button>
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="border border-purple-300 p-2 rounded shadow bg-white text-purple-700">
//           <option value="all">All Statuses</option>
//           <option value="Pending">Pending</option>
//           <option value="Preparing">Preparing</option>
//           <option value="Ready">Ready</option>
//           <option value="Completed">Completed</option>
//           <option value="Cancelled">Cancelled</option>
//         </select>
     

//  <button
//           onClick={() => setShowAddForm(true)}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//           + Add Order
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded shadow-lg">
//           <thead>
//             <tr className="bg-oklch-200 text-left">
//               <th className="px-4 py-2">ID</th>
//               <th className="px-4 py-2">Customer</th>
//               <th className="px-4 py-2">Table</th>
//               <th className="px-4 py-2">Status</th>
//               <th className="px-4 py-2">Total</th>
//               <th className="px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.filter(filterOrders).map((order) => (
//               <tr key={order._id} className="border-t hover:bg-purple-50">
//                 <td className="px-4 py-2">{order._id.slice(0, 6)}...</td>
//                 <td className="px-4 py-2">{order.userId}</td>
//                 <td className="px-4 py-2">{order.tableNumber}</td>
//                 <td className="px-4 py-2">
//                   <select
//                     value={order.status}
//                     onChange={(e) => updateStatus(order._id, e.target.value)}
//                     className="border border-purple-300 p-1 rounded">
//                     <option value="Pending">Pending</option>
//                     <option value="Preparing">Preparing</option>
//                     <option value="Ready">Ready</option>
//                     <option value="Completed">Completed</option>
//                     <option value="Cancelled">Cancelled</option>
//                   </select>
//                 </td>
//                 <td className="px-4 py-2 font-semibold text-green-600">₹{order.totalAmount}</td>
//                 <td className="px-4 py-2 flex gap-2 flex-wrap">
//                   <button
//                     onClick={() => setSelectedOrder(order)}
//                     className="bg-green-500 text-black px-3 py-1 rounded hover:bg-green-600">
//                     Details
//                   </button>
//                   <button
//                     onClick={() => deleteOrder(order._id)}
//                     className="bg-red-500 text-black px-3 py-1 rounded hover:bg-red-600">
//                     Cancel
//                   </button>
//                   <button
//                     onClick={() => printInvoice(order)}
//                     className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600">
//                     Print
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//           {/* ✅ NEW: Order Details Modal */}
//       {selectedOrder && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
//             <button
//               className="absolute top-2 right-2 text-gray-600 hover:text-black"
//               onClick={() => setSelectedOrder(null)}>
//               ✕
//             </button>
//             <h3 className="text-xl font-semibold mb-4 text-purple-700">Order Details</h3>
//             <p><strong>Order ID:</strong> {selectedOrder._id}</p>
//             <p><strong>User ID:</strong> {selectedOrder.userId}</p>
//             <p><strong>Table Number:</strong> {selectedOrder.tableNumber}</p>
//             <p><strong>Status:</strong> {selectedOrder.status}</p>
//             <p><strong>Total:</strong> ₹{selectedOrder.totalAmount}</p>
//             <ul className="mt-4 space-y-1">
//               {selectedOrder.items.map((item, i) => (
//                 <li key={i}>
//                   {item.name} x {item.quantity} = ₹{item.price * item.quantity}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}

//       {/* ✅ NEW: Add Order Modal */}
//       {showAddForm && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
//             <button
//               className="absolute top-2 right-2 text-gray-600 hover:text-black"
//               onClick={() => setShowAddForm(false)}>
//               ✕
//             </button>
//             <h3 className="text-xl font-bold mb-4 text-green-600">Add New Order</h3>

//             <input
//               type="text"
//               placeholder="Customer Name"
//               value={newOrder.userId}
//               onChange={(e) => setNewOrder({ ...newOrder, userId: e.target.value })}
//               className="border p-2 mb-2 w-full rounded"
//             />
//             <input
//               type="text"
//               placeholder="Table Number"
//               value={newOrder.tableNumber}
//               onChange={(e) => setNewOrder({ ...newOrder, tableNumber: e.target.value })}
//               className="border p-2 mb-2 w-full rounded"
//             />
//             <textarea
//               placeholder='Items (JSON array: [{"name":"Pizza","price":200,"quantity":2}])'
//               value={newOrder.items}
//               onChange={(e) => setNewOrder({ ...newOrder, items: e.target.value })}
//               className="border p-2 mb-2 w-full rounded"
//               rows="5"
//             />
//             <button
//               onClick={handleAddOrder}
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full mt-2">
//               Submit Order
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrdersSection;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersSection = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const [showAddForm, setShowAddForm] = useState(false);
  const [newOrder, setNewOrder] = useState({
    userId: '',
    phone: '',
    tableNumber: '',
    status: 'Pending',
    items: [],
  });
  const [newItem, setNewItem] = useState({ name: '', quantity: '', price: '' });

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, filter]);

  const fetchOrders = async () => {
    try {
      const params = {};
      if (statusFilter !== 'all') params.status = statusFilter;

      const response = await axios.get('http://localhost:5000/api/orders', { params });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const updateStatus = async (id, status) => {
    await axios.patch(`http://localhost:5000/api/orders/${id}`, { status });
    fetchOrders();
  };

  const deleteOrder = async (id) => {
    await axios.delete(`http://localhost:5000/api/orders/${id}`);
    fetchOrders();
  };

  const printInvoice = (order) => {
    const invoice = window.open('', '_blank');
    invoice.document.write(`<pre>${JSON.stringify(order, null, 2)}</pre>`);
    invoice.print();
  };

  const filterOrders = (order) => {
    const today = new Date().toLocaleDateString();
    const orderDate = new Date(order.createdAt).toLocaleDateString();
    const matchesDate = filter === 'today' ? orderDate === today : true;
    const matchesStatus = statusFilter === 'all' ? true : order.status?.toLowerCase() === statusFilter.toLowerCase();
    return matchesDate && matchesStatus;
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.price || !newItem.quantity) return;
    setNewOrder({
      ...newOrder,
      items: [...newOrder.items, { ...newItem, price: +newItem.price, quantity: +newItem.quantity }],
    });
    setNewItem({ name: '', quantity: '', price: '' });
  };

  const handleAddOrder = async () => {
    try {
      const total = newOrder.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      await axios.post('http://localhost:5000/api/orders', {
        ...newOrder,
        totalAmount: total,
      });

      setShowAddForm(false);
      setNewOrder({ userId: '', phone: '', tableNumber: '', status: 'Pending', items: [] });
      setNewItem({ name: '', quantity: '', price: '' });
      fetchOrders();
    } catch (err) {
      alert('Error adding order.');
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen">
      <h2 className="text-4xl font-extrabold text-purple-700 mb-6">Orders Panel</h2>

      <div className="flex gap-6 mb-6 flex-wrap items-center">
        <div className="bg-white p-4 rounded shadow w-48 border-l-4 border-purple-500 text-purple-700 font-medium">
          Total Orders: {orders.length}
        </div>
        <div className="bg-white p-4 rounded shadow w-48 border-l-4 border-blue-500 text-blue-700 font-medium">
          Today's Orders: {
            orders.filter(o => new Date(o.createdAt).toLocaleDateString() === new Date().toLocaleDateString()).length
          }
        </div>
        <button
          onClick={() => setFilter(filter === 'today' ? 'all' : 'today')}
          className="bg-indigo-500 text-black px-4 py-2 rounded border border-indigo-700 hover:bg-indigo-600">
          {filter === 'today' ? 'Show All' : "Show Today's"}
        </button>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-purple-300 p-2 rounded shadow bg-white text-purple-700">
          <option value="all">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Preparing">Preparing</option>
          <option value="Ready">Ready</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + Add Order
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Table</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.filter(filterOrders).map((order) => (
              <tr key={order._id} className="border-t hover:bg-purple-50">
                <td className="px-4 py-2">{order._id.slice(0, 6)}...</td>
                <td className="px-4 py-2">{order.userId}</td>
                <td className="px-4 py-2">{order.phone || 'N/A'}</td>
                <td className="px-4 py-2">{order.tableNumber}</td>
                <td className="px-4 py-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="border border-purple-300 p-1 rounded">
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Ready">Ready</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-4 py-2 font-semibold text-green-600">₹{order.totalAmount}</td>
                <td className="px-4 py-2 flex gap-2 flex-wrap">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="bg-green-500 text-black px-3 py-1 rounded hover:bg-green-600">
                    Details
                  </button>
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="bg-red-500 text-black px-3 py-1 rounded hover:bg-red-600">
                    Cancel
                  </button>
                  <button
                    onClick={() => printInvoice(order)}
                    className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600">
                    Print
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {selectedOrder && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-600 hover:text-black" onClick={() => setSelectedOrder(null)}>✕</button>
            <h3 className="text-xl font-semibold mb-4 text-purple-700">Order Details</h3>
            <p><strong>Order ID:</strong> {selectedOrder._id}</p>
            <p><strong>User ID:</strong> {selectedOrder.userId}</p>
            <p><strong>Phone:</strong> {selectedOrder.phone || 'N/A'}</p>
            <p><strong>Table Number:</strong> {selectedOrder.tableNumber}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Total:</strong> ₹{selectedOrder.totalAmount}</p>
            <ul className="mt-4 space-y-1">
              {selectedOrder.items.map((item, i) => (
                <li key={i}>{item.name} x {item.quantity} = ₹{item.price * item.quantity}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Add Order Modal */}
      {showAddForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-600 hover:text-black" onClick={() => setShowAddForm(false)}>✕</button>
            <h3 className="text-xl font-bold mb-4 text-green-600">Add New Order</h3>

            <input
              type="text"
              placeholder="Customer Name"
              value={newOrder.userId}
              onChange={(e) => setNewOrder({ ...newOrder, userId: e.target.value })}
              className="border p-2 mb-2 w-full rounded"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={newOrder.phone}
              onChange={(e) => setNewOrder({ ...newOrder, phone: e.target.value })}
              className="border p-2 mb-2 w-full rounded"
            />
            <input
              type="text"
              placeholder="Table Number"
              value={newOrder.tableNumber}
              onChange={(e) => setNewOrder({ ...newOrder, tableNumber: e.target.value })}
              className="border p-2 mb-2 w-full rounded"
            />

            <div className="mb-2">
              <h4 className="font-semibold mb-1">Add Item</h4>
              <input
                type="text"
                placeholder="Item Name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="border p-2 mb-1 w-full rounded"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                className="border p-2 mb-1 w-full rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                className="border p-2 mb-2 w-full rounded"
              />
              <button onClick={handleAddItem} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-full">
                + Add Item
              </button>
            </div>

            <div className="mb-2">
              <h4 className="font-semibold mb-1">Items Added:</h4>
              {newOrder.items.map((item, index) => (
                <p key={index}>• {item.name} x {item.quantity} @ ₹{item.price}</p>
              ))}
            </div>

            <button
              onClick={handleAddOrder}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full mt-2">
              Submit Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersSection;
