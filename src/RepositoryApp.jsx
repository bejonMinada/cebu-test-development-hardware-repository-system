import React, { useState, useMemo, useEffect } from 'react';

// --- SVG Icons ---
// Using inline SVGs for compatibility

const LayoutDashboardIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);

const HardDriveIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="22" x2="2" y1="12" y2="12" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    <line x1="6" x2="6.01" y1="16" y2="16" />
    <line x1="10" x2="10.01" y1="16" y2="16" />
  </svg>
);

const PlusCircleIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="16" />
    <line x1="8" x2="16" y1="12" y2="12" />
  </svg>
);

const ClipboardPlusIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <line x1="12" x2="12" y1="11" y2="17" />
    <line x1="9" x2="15" y1="14" y2="14" />
  </svg>
);

const UsersIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const LogOutIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);

const BarcodeIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 5v14" />
    <path d="M8 5v14" />
    <path d="M12 5v14" />
    <path d="M17 5v14" />
    <path d="M21 5v14" />
  </svg>
);

// --- Initial Mock Data ---

const initialInventory = [
  {
    id: 'TIB-001',
    name: 'Pizza Board v1.2',
    type: 'Test Interface Board',
    quantity: 10,
    available: 8,
    lastUpdate: '2025-10-21T10:00:00Z',
  },
  {
    id: 'LDB-001',
    name: 'Main Load Board - Project X',
    type: 'Load Board',
    quantity: 5,
    available: 5,
    lastUpdate: '2025-10-20T14:30:00Z',
  },
  {
    id: 'EC-001',
    name: 'Digital Source Meter - Model XYZ',
    type: 'Device or Module',
    quantity: 50,
    available: 49,
    lastUpdate: '2025-10-21T11:00:00Z',
  },
  {
    id: 'CBL-001',
    name: 'High-Speed Coax Cable - 1m',
    type: 'Hardware Item',
    quantity: 20,
    available: 20,
    lastUpdate: '2025-10-19T09:00:00Z',
  },
];

const initialBorrowRecords = [
  {
    recordId: 'B-001',
    itemId: 'TIB-001',
    itemName: 'Pizza Board v1.2',
    borrowerName: 'Ma. Rovina Buot',
    dateBorrowed: '2025-10-10T09:00:00Z', // MODIFIED: This is now DUE
    dateReturned: null,
    borrowerEmail: 'ma.rovina.buot@onsemi.com',
    daysToBorrow: 5, // Due October 15th (Overdue)
    quantityBorrowed: 1,
  },
  {
    recordId: 'B-002',
    itemId: 'EC-001',
    itemName: 'Digital Source Meter - Model XYZ',
    borrowerName: 'Alexis Doreen Israel',
    quantityBorrowed: 1,
    dateBorrowed: '2025-10-21T11:05:00Z',
    dateReturned: null,
    borrowerEmail: 'alexisdoreen.israel.j@onsemi.com',
    daysToBorrow: 5,
  },
  {
    recordId: 'B-003',
    itemId: 'TIB-001',
    itemName: 'Pizza Board v1.2',
    borrowerName: 'Ma. Rovina Buot',
    dateBorrowed: '2025-10-18T15:00:00Z',
    dateReturned: '2025-10-20T10:00:00Z',
    borrowerEmail: 'ma.rovina.buot@onsemi.com',
    daysToBorrow: 1,
    quantityBorrowed: 1,
  },
];

const initialActivityLog = [
  {
    id: 'L-003',
    timestamp: '2025-10-21T11:05:00Z',
    message: 'Alexis Doreen Israel borrowed 1x Digital Source Meter - Model XYZ (EC-001).',
  },
  {
    id: 'L-002',
    timestamp: '2025-10-21T10:00:00Z',
    message: 'Admin registered new item: Pizza Board v1.2 (TIB-001).',
  },
  {
    id: 'L-001',
    timestamp: '2025-10-20T14:30:00Z',
    message: 'Admin registered new item: Main Load Board - Project X (LDB-001).',
  },
];

// --- Helper Functions ---
const formatTimestamp = (isoString) => {
  if (!isoString) return 'N/A';
  return new Date(isoString).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

// --- App Components ---

/**
 * A simple component to render a simulated barcode.
 * In a real app, you'd use a library like react-barcode.
 */
const SimulatedBarcode = ({ value }) => {
  if (!value) return null;

  // Simple hashing function to create a unique-ish pattern
  const hash = (str) => {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    }
    return Math.abs(h);
  };

  const pattern = (hash(value) + '').split('').slice(0, 16); // 16 bars
  const widths = ['w-1', 'w-1.5', 'w-2', 'w-0.5']; // Tailwind widths

  return (
    <div className="bg-white p-4 rounded-lg shadow-inner flex flex-col items-center">
      <div className="flex h-16 items-stretch" aria-hidden="true">
        {pattern.map((char, index) => (
          <div
            key={index}
            className={`bg-black ${widths[parseInt(char, 10) % 4]}`}
          ></div>
        ))}
      </div>
      <p className="font-mono tracking-widest text-lg mt-2">{value}</p>
    </div>
  );
};

/**
 * Dashboard Page Component
 */
const DashboardPage = ({ inventory, borrowRecords, activityLog }) => {
  const stats = useMemo(() => {
    const totalItems = inventory.reduce((acc, item) => acc + item.quantity, 0);
    const totalAvailable = inventory.reduce(
      (acc, item) => acc + item.available,
      0
    );
    const itemsBorrowed = totalItems - totalAvailable;
    const uniqueItemTypes = new Set(inventory.map((item) => item.type)).size;
    return { totalItems, itemsBorrowed, uniqueItemTypes };
  }, [inventory]);

  const itemQuantities = useMemo(() => {
    const quantities = {};
    inventory.forEach((item) => {
      if (!quantities[item.type]) {
        quantities[item.type] = { total: 0, available: 0 };
      }
      quantities[item.type].total += item.quantity;
      quantities[item.type].available += item.available;
    });
    return Object.entries(quantities).sort((a, b) => b[1].total - a[1].total);
  }, [inventory]);

  const highlyUsed = useMemo(() => {
    const usage = {};
    borrowRecords.forEach((record) => {
      usage[record.itemName] = (usage[record.itemName] || 0) + 1;
    });
    return Object.entries(usage).sort((a, b) => b[1] - a[1]);
  }, [borrowRecords]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Total Items in Stock (Count)</h3>
          <p className="text-3xl font-semibold text-gray-900">
            {stats.totalItems}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Items Currently Borrowed</h3>
          <p className="text-3xl font-semibold text-gray-900">
            {stats.itemsBorrowed}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">
            Unique Hardware Types
            </h3>
          <p className="text-3xl font-semibold text-gray-900">
            {stats.uniqueItemTypes}
          </p>
        </div>
        </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Updates */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Latest Updates / Activity Log
          </h2>
          <ul className="divide-y divide-gray-200">
            {activityLog.slice(0, 5).map((log) => (
              <li key={log.id} className="py-3">
                <p className="text-gray-700">{log.message}</p>
                <p className="text-sm text-gray-500">
                  {formatTimestamp(log.timestamp)}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Rankings */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Quantity Per Item Type
            </h2>
            <ul className="space-y-3">
              {itemQuantities.map(([type, counts]) => (
                <li key={type}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{type}</span>
                    <span className="text-gray-500">
                      {counts.available} / {counts.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{
                        width: `${(counts.available / counts.total) * 100}%`,
                      }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Highly Requested Items
            </h2>
            <ul className="divide-y divide-gray-200">
              {highlyUsed.slice(0, 5).map(([name, count]) => (
                <li key={name} className="py-2 flex justify-between">
                  <span className="text-gray-700">{name}</span>
                  <span className="font-medium text-gray-800">
                    {count} requests
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Inventory Page Component
 */
const InventoryPage = ({ inventory, onRequest }) => {
  const [borrowModal, setBorrowModal] = useState(null); // { item }
  const [borrowerName, setBorrowerName] = useState('');
  const [borrowerEmail, setBorrowerEmail] = useState('');
  const [daysToBorrow, setDaysToBorrow] = useState(1);
  const [borrowQuantity, setBorrowQuantity] = useState(1);

  const handleBorrowClick = (item) => {
    setBorrowModal({ item });
    setBorrowerName('');
    setBorrowerEmail('');
    setDaysToBorrow(1);
    setBorrowQuantity(1);
  };

  const handleBorrowSubmit = (e) => {
    e.preventDefault();
    if (!borrowerName || borrowQuantity <= 0 || !borrowerEmail || daysToBorrow <= 0) {
      // Using window.alert for simplicity in this modal.
      window.alert('Please fill in all required fields.');
      return;
    }
    
    // Hardcode type to 'Borrow' for this quick modal
    const result = onRequest({
      itemId: borrowModal.item.id,
      borrowerName,
      borrowerEmail,
      quantity: parseInt(borrowQuantity, 10),
      daysToBorrow: parseInt(daysToBorrow, 10),
      requestType: 'Borrow', 
    });
    
    // --- CHECK FOR OVERDUE ERROR ---
    if (typeof result === 'string') {
      window.alert(`Borrowing Failed: ${result}`); 
      return; // Do not close modal on failure
    }
    // -------------------------------

    setBorrowModal(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Inventory</h1>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Available / Total
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Last Update
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventory.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700">
                  {item.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`font-semibold ${
                      item.available > 0
                        ? 'text-green-700'
                        : 'text-red-700'
                    }`}
                  >
                    {item.available}
                  </span>
                  <span className="text-gray-500"> / {item.quantity}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatTimestamp(item.lastUpdate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleBorrowClick(item)}
                    disabled={item.available <= 0}
                    className="text-indigo-600 hover:text-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    Quick Borrow
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Borrow Modal */}
      {borrowModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Quick Borrow Item
            </h2>
            <p className="text-gray-700 mb-1">
              <strong>Item:</strong> {borrowModal.item.name}
            </p>
            <p className="text-gray-500 text-sm mb-4">
              (Available: {borrowModal.item.available})
            </p>
            <form onSubmit={handleBorrowSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="borrowerName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Borrower's Name
                  </label>
                  <input
                    type="text"
                    id="borrowerName"
                    value={borrowerName}
                    onChange={(e) => setBorrowerName(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="borrowerEmail"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Borrower's Email
                  </label>
                  <input
                    type="email"
                    id="borrowerEmail"
                    value={borrowerEmail}
                    onChange={(e) => setBorrowerEmail(e.target.value)}
                    required
                    placeholder="name@company.com"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="borrowQuantity"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="borrowQuantity"
                      value={borrowQuantity}
                      onChange={(e) => setBorrowQuantity(e.target.value)}
                      required
                      min="1"
                      max={borrowModal.item.available}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="daysToBorrow"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Days
                    </label>
                    <input
                      type="number"
                      id="daysToBorrow"
                      value={daysToBorrow}
                      onChange={(e) => setDaysToBorrow(e.target.value)}
                      required
                      min="1"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setBorrowModal(null)}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Confirm Borrow
                </button>
              </div>
            </form>
            </div>
        </div>
      )}
    </div>
  );
};

/**
 * Request Item Page Component
 */
const RequestItemPage = ({ onRequest, inventory }) => {
  const [borrowerName, setBorrowerName] = useState('');
  const [borrowerEmail, setBorrowerEmail] = useState('');
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [daysToBorrow, setDaysToBorrow] = useState(1);
  const [requestType, setRequestType] = useState('Borrow'); // New state for request type

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 1. Find item
    const item = inventory.find(i => i.id.toLowerCase() === itemId.toLowerCase());
    
    if (!item) {
      setError('Invalid Item ID. Please check the ID and try again.');
      return;
    }

    // 2. Check quantity
    const reqQty = parseInt(quantity, 10);
    if (reqQty <= 0) {
      setError('Quantity must be at least 1.');
      return;
    }
    
    // 3. Check availability only if NOT returning (Borrow or Non-Returnable)
    if (requestType !== 'Return' && reqQty > item.available) {
      setError(`Not enough stock. Only ${item.available} available for ${item.name}.`);
      return;
    }
    
    // 4. Check days only if borrowing
    const reqDays = parseInt(daysToBorrow, 10);
    if (requestType === 'Borrow' && reqDays <= 0) {
      setError('Days to borrow must be at least 1.');
      return;
    }

    // 5. All good, call onRequest and capture result
    const result = onRequest({
      itemId: item.id,
      borrowerName,
      borrowerEmail,
      quantity: reqQty,
      daysToBorrow: reqDays,
      requestType: requestType,
    });
    
    // --- NEW: Handle returned errors from RepositoryApp (Overdue Check) ---
    if (typeof result === 'string') {
      setError(result);
      return;
    }
    // --------------------------------------------------------------------

    // --- Update success message based on type ---
    let successMessage = '';
    switch (requestType) {
      case 'Borrow':
        successMessage = `Successfully borrowed ${reqQty}x ${item.name} for ${borrowerName}.`;
        break;
      case 'Return':
        successMessage = `Successfully processed return of ${reqQty}x ${item.name}.`;
        break;
      case 'Non-Returnable':
        successMessage = `Processed ${reqQty}x ${item.name} as consumed (Non-Returnable) for ${borrowerName}.`;
        break;
      default:
        successMessage = 'Request processed.';
    }
    setSuccess(successMessage);
    
    // Reset form
    setBorrowerName('');
    setBorrowerEmail('');
    setItemId('');
    setQuantity(1);
    setDaysToBorrow(1);
    setRequestType('Borrow');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Request Item</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="requestItemName"
              className="block text-sm font-medium text-gray-700"
            >
              Your Name
            </label>
            <input
              type="text"
              id="requestItemName"
              value={borrowerName}
              onChange={(e) => setBorrowerName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g., Michael Pon"
            />
            </div>
          
          <div>
            <label
              htmlFor="requestItemEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Company Email
            </label>
            <input
              type="email"
              id="requestItemEmail"
              value={borrowerEmail}
              onChange={(e) => setBorrowerEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g., michael.pon@onsemi.com"
            />
          </div>

          <div>
            <label
              htmlFor="requestType"
              className="block text-sm font-medium text-gray-700"
            >
              Request Type
            </label>
            <select
              id="requestType"
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Borrow">Borrow (To be returned)</option>
              <option value="Return">Return</option>
              <option value="Non-Returnable">Non-Returnable (Consumable/Components)</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="requestItemId"
              className="block text-sm font-medium text-gray-700"
            >
              Item Code / ID (Manual/Scan Barcode)
            </label>
            <input
              type="text"
              id="requestItemId"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-mono"
              placeholder="e.g., TIB-001"
            />
            {itemId.toUpperCase() === 'TIB-001' && (
              <p className='text-xs text-gray-500 mt-1'>
                Inventory status for TIB-001: {inventory.find(i => i.id === 'TIB-001')?.available || 0} available.
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="requestItemQuantity"
                className="block text-sm font-medium text-gray-700"
              >
                Quantity
              </label>
              <input
                type="number"
                id="requestItemQuantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                min="1"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {/* --- Conditionally show "Number of Days" only for Borrowing --- */}
            {requestType === 'Borrow' && (
              <div>
                <label
                  htmlFor="requestItemDays"
                  className="block text-sm font-medium text-gray-700"
                >
                  Number of Days
                </label>
                <input
                  type="number"
                  id="requestItemDays"
                  value={daysToBorrow}
                  onChange={(e) => setDaysToBorrow(e.target.value)}
                  required={requestType === 'Borrow'} 
                  min="1"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            )}
          </div>

          {error && (
            <div className="text-red-600 text-sm p-3 bg-red-50 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-700 text-sm p-3 bg-green-50 rounded-md">
              {success}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Request
            </button>
          </div>
        </form>
        </div>
      </div>
  );
};


/**
 * Register Item Page Component
 */
const RegisterItemPage = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('Test Interface Board');
  const [quantity, setQuantity] = useState(1);
  const [generatedItem, setGeneratedItem] = useState(null);

  const itemTypes = [
    'Test Interface Board',
    'Load Board',
    'Electronic Component',
    'Hardware Item',
    'Other',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name,
      type,
      quantity: parseInt(quantity, 10),
    };
    const registeredItem = onRegister(newItem); // onRegister returns the full item with ID
    setGeneratedItem(registeredItem);

    // Reset form
    setName('');
    setType('Test Interface Board');
    setQuantity(1);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Register New Item</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="itemName"
                className="block text-sm font-medium text-gray-700"
              >
                Item Name
              </label>
              <input
                type="text"
                id="itemName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g., Pizza Board v2.0"
              />
            </div>
            <div>
              <label
                htmlFor="itemType"
                className="block text-sm font-medium text-gray-700"
              >
                Item Type
              </label>
              <select
                id="itemType"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {itemTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="itemQuantity"
                className="block text-sm font-medium text-gray-700"
              >
                Initial Quantity
              </label>
              <input
                type="number"
                id="itemQuantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                min="1"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register Item
              </button>
            </div>
          </form>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Generated Barcode
          </h2>
          {generatedItem ? (
            <div className="w-full max-w-xs space-y-4">
              <p className="text-center text-gray-600">
                Successfully registered:{' '}
                <strong className="text-gray-900">{generatedItem.name}</strong>
              </p>
              <SimulatedBarcode value={generatedItem.id} />
              <button
                type="button"
                onClick={() => window.alert('Print functionality not implemented.')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Print Label
              </button>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <BarcodeIcon className="h-16 w-16 mx-auto text-gray-400" />
              <p className="mt-2">Barcode will appear here after registration.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Borrowers Page Component
 */
const BorrowersPage = ({ borrowRecords, onReturn }) => {
  // Sort active borrows to show the oldest (and potentially most overdue) first
  const activeBorrows = borrowRecords.filter((r) => !r.dateReturned).sort((a, b) => new Date(a.dateBorrowed) - new Date(b.dateBorrowed));
  const returnedBorrows = borrowRecords.filter((r) => r.dateReturned).sort((a, b) => new Date(b.dateReturned) - new Date(a.dateReturned)); // Newest returned first

  const ListSection = ({ title, records, showReturn }) => (
    <div className="bg-white shadow-md rounded-lg overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 p-4 border-b border-gray-200">
        {title}
      </h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Borrower
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Item (ID)
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Qty
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Days
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date Borrowed
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {showReturn ? 'Action' : 'Date Returned'}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {records.length === 0 && (
            <tr>
              <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                No records found.
              </td>
            </tr>
          )}
          {records.map((r) => {
            const borrowedDate = new Date(r.dateBorrowed);
            const dueDate = new Date(borrowedDate);
            dueDate.setDate(borrowedDate.getDate() + r.daysToBorrow);
            const isOverdue = showReturn && dueDate.getTime() < new Date().getTime();

            return (
              <tr key={r.recordId} className={`${isOverdue ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {r.borrowerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {r.itemName}
                  <span className="font-mono text-gray-500"> ({r.itemId})</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {r.borrowerEmail}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {r.quantityBorrowed}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {r.daysToBorrow}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatTimestamp(r.dateBorrowed)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {showReturn ? (
                    <button
                      onClick={() => onReturn(r.recordId)}
                      className={`font-medium ${isOverdue ? 'text-red-700 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                    >
                      {isOverdue ? '[OVERDUE] Mark as Returned' : 'Mark as Returned'}
                    </button>
                  ) : (
                    <span className="text-gray-500">
                      {formatTimestamp(r.dateReturned)}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
        </table>
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Borrower Records</h1>
      <ListSection
        title="Active Borrows (Check for OVERDUE in Red)"
        records={activeBorrows}
        showReturn={true}
      />
      <ListSection
        title="Borrow History"
        records={returnedBorrows}
        showReturn={false}
      />
    </div>
  );
};

/**
 * Main Application Shell (after login)
 */
const RepositoryApp = ({ onLogout }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [inventory, setInventory] = useState(initialInventory);
  const [borrowRecords, setBorrowRecords] = useState(initialBorrowRecords);
  const [activityLog, setActivityLog] = useState(initialActivityLog);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // --- Data Handling Logic ---

  const addActivity = (message) => {
    const newLog = {
      id: `L-${activityLog.length + 1}`,
      timestamp: new Date().toISOString(),
      message,
    };
    setActivityLog([newLog, ...activityLog]);
  }
  
  // Helper function to find active, overdue records for a given email
  const getOverdueRecords = (email) => {
    const today = new Date().getTime();
    return borrowRecords.filter((record) => {
      // Check if the email matches (case-insensitive) and the item is NOT returned
      if (record.borrowerEmail.toLowerCase() !== email.toLowerCase() || record.dateReturned) {
        return false;
      }
      
      const borrowedDate = new Date(record.dateBorrowed);
      // Calculate due date: borrowedDate + daysToBorrow days
      const dueDate = new Date(borrowedDate);
      dueDate.setDate(borrowedDate.getDate() + record.daysToBorrow);
      
      // Check if the due date is in the past
      return dueDate.getTime() < today;
    });
  };


  const handleRegisterItem = (itemData) => {
    // Generate new ID
    const typePrefix =
      itemData.type.match(/\b([A-Z])/g)?.join('') || 'ITEM';
    const nextId =
      inventory.filter((i) => i.id.startsWith(typePrefix)).length + 1;
    const newItemId = `${typePrefix}-${String(nextId).padStart(3, '0')}`;

    const newItem = {
      ...itemData,
      id: newItemId,
      available: itemData.quantity,
      lastUpdate: new Date().toISOString(),
    };

    setInventory([newItem, ...inventory]);
    addActivity(`Admin registered new item: ${newItem.name} (${newItem.id}).`);
    return newItem; // Return to show on barcode page
  };

  const handleRequestItem = (requestData) => {
    const {
      itemId,
      borrowerName,
      quantity,
      daysToBorrow,
      requestType, 
      borrowerEmail
    } = requestData;

    const itemIndex = inventory.findIndex((i) => i.id === itemId);
    if (itemIndex === -1) return "Invalid Item ID."; // Return specific error to caller
    
    const item = inventory[itemIndex];
    let updatedInventory = [...inventory];
    let activityMessage = '';

    switch (requestType) {
      case 'Borrow':
        // --- OVERDUE CHECK: BLOCK BORROWING IF USER HAS OVERDUE ITEMS ---
        const overdueItems = getOverdueRecords(borrowerEmail);
        if (overdueItems.length > 0) {
          const overdueList = overdueItems.map(
            (r) => `${r.itemName} (Borrowed: ${formatTimestamp(r.dateBorrowed)})`
          ).join('; ');
          return `Borrowing blocked! ${borrowerName} has overdue item(s): ${overdueList}`; 
        }
        // ---------------------------------------------------------------
        
        const newRecord = {
          recordId: `B-${borrowRecords.length + 1}`,
          itemId,
          itemName: item.name,
          borrowerName,
          borrowerEmail,
          quantityBorrowed: quantity,
          daysToBorrow,
          dateBorrowed: new Date().toISOString(),
          dateReturned: null,
        };
        setBorrowRecords([newRecord, ...borrowRecords]);

        updatedInventory[itemIndex] = {
          ...item,
          available: item.available - quantity,
          lastUpdate: new Date().toISOString(),
        };
        
        activityMessage = `${borrowerName} borrowed ${quantity}x ${item.name} (${itemId}).`;
        break;

      case 'Non-Returnable':
        updatedInventory[itemIndex] = {
          ...item,
          // Decrement both available and total quantity for consumables
          available: item.available - quantity,
          quantity: item.quantity - quantity, 
          lastUpdate: new Date().toISOString(),
        };
        activityMessage = `${borrowerName} took ${quantity}x ${item.name} (${itemId}) (Non-Returnable).`;
        break;

      case 'Return':
        updatedInventory[itemIndex] = {
          ...item,
          // Only increment available stock
          available: item.available + quantity, 
          lastUpdate: new Date().toISOString(),
        };
       // Ensure available doesn't exceed total quantity
        if (updatedInventory[itemIndex].available > updatedInventory[itemIndex].quantity) {
          updatedInventory[itemIndex].available = updatedInventory[itemIndex].quantity;
        }
        activityMessage = `${borrowerName} returned ${quantity}x ${item.name} (${itemId}).`;
        break;
      
      default:
        return "Unknown request type.";
    }

    setInventory(updatedInventory);
    addActivity(activityMessage);
    
    return true; // Indicate success
  };

  const handleReturnItem = (recordId) => {
    let returnedItem = null;

    // First find the record without modifying it
    const record = borrowRecords.find(r => r.recordId === recordId);
    if (!record) return;

    // Update borrow records
    setBorrowRecords(
      borrowRecords.map((record) => {
        if (record.recordId === recordId) {
          returnedItem = record;
          return { 
            ...record, 
            dateReturned: new Date().toISOString(),
            // Preserve the original dateBorrowed
            dateBorrowed: record.dateBorrowed 
          };
        }
        return record;
      })
    );

    // Update inventory
    if (returnedItem) {
      setInventory(
        inventory.map((item) =>
          item.id === returnedItem.itemId
            ? {
                ...item,
                available: item.available + returnedItem.quantityBorrowed,
                lastUpdate: new Date().toISOString(),
              }
            : item
        )
      );

      addActivity(
        `${returnedItem.borrowerName} returned ${returnedItem.quantityBorrowed}x ${returnedItem.itemName} (${returnedItem.itemId}).`
      );
    }
  };

  // --- Render Logic ---

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <DashboardPage
            inventory={inventory}
            borrowRecords={borrowRecords}
            activityLog={activityLog}
          />
        );
      case 'inventory':
        return (
          <InventoryPage inventory={inventory} onRequest={handleRequestItem} />
        );
      case 'register':
        return <RegisterItemPage onRegister={handleRegisterItem} />;
      case 'request':
        return (
          <RequestItemPage
            onRequest={handleRequestItem}
            inventory={inventory}
          />
        );
      case 'borrowers':
        return (
          <BorrowersPage
            borrowRecords={borrowRecords}
            onReturn={handleReturnItem}
          />
        );
      default:
        return <DashboardPage />;
    }
  };

  const NavLink = ({ page, label, icon: Icon }) => (
    <button
      onClick={() => {
        setCurrentPage(page);
        setIsMobileNavOpen(false);
      }}
      className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
        currentPage === page
          ? 'bg-indigo-700 text-white'
          : 'text-indigo-100 hover:bg-indigo-500 hover:bg-opacity-75'
      }`}
    >
      <Icon className="mr-3 h-6 w-6" />
      {label}
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-indigo-600 text-white p-4 space-y-4 transform ${
          isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <h2 className="text-2xl font-bold text-center">Repository System</h2>
        <nav className="flex-1 space-y-2">
          <NavLink
            page="dashboard"
            label="Dashboard"
            icon={LayoutDashboardIcon}
          />
          <NavLink
            page="inventory"
            label="Inventory"
            icon={HardDriveIcon}
          />
          <NavLink
            page="register"
            label="Register Item"
            icon={PlusCircleIcon}
          />
          <NavLink
            page="request"
            label="Request Item"
            icon={ClipboardPlusIcon}
          />
          <NavLink
            page="borrowers"
            label="Borrower Records"
            icon={UsersIcon}
          />
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={onLogout}
            className="flex w-full items-center justify-center px-4 py-3 text-sm font-medium rounded-md transition-colors text-indigo-100 hover:bg-indigo-500 hover:bg-opacity-75"
          >
            <LogOutIcon className="mr-3 h-6 w-6" />
            Logout
          </button>
        </div>
      </div>
      
      {/* Mobile nav overlay */}
      {isMobileNavOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsMobileNavOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600">Repository System</h1>
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="text-gray-600 p-2 rounded-md hover:bg-gray-100"
          >
            <span className="sr-only">Open menu</span>
            {/* Hamburger Icon */}
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>
        
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

/**
 * Login Page Component
 */
const LoginPage = ({ onLoginSuccess }) => {
  const [authView, setAuthView] = useState('login'); // 'login' or 'signup'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    // Hardcoded credentials for development
    if (username === 'admin' && password === 'admin') {
      onLoginSuccess();
    } else {
      setError('Invalid username or password.');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError(
      'Sign up is disabled for this demo. Please use the admin account.'
    );
  };

  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-6">
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <div className="mt-1">
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm text-center">{error}</div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in
        </button>
        </div>
    </form>
  );

  const renderSignupForm = () => (
    <form onSubmit={handleSignup} className="space-y-6">
      {/* Simplified signup form */}
      <div>
        <label
          htmlFor="email-signup"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <input
          id="email-signup"
          type="email"
          required
          className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        </div>
        <div>
          <label
            htmlFor="password-signup"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password-signup"
            type="password"
            required
            className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign up
          </button>
        </div>
      </form>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <HardDriveIcon className="mx-auto h-12 w-auto text-indigo-600" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Cebu Test Development Hardware Repository System
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {authView === 'login' ? 'Sign in to your account' : 'Create a new account'}
          <button
            onClick={() => {
              setAuthView(authView === 'login' ? 'signup' : 'login');
              setError('');
            }}
            className="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
          >
            {authView === 'login' ? 'or sign up' : 'or sign in'}
            </button>
        </p>
        <p className="mt-2 text-center text-xs text-gray-500">
          (Demo: use <strong className="font-mono">admin</strong> / <strong className="font-mono">admin</strong> to log in)
        </p>
        </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {authView === 'login' ? renderLoginForm() : renderSignupForm()}
        </div>
      </div>
    </div>
  );
};

/**
 * Root Application Component
 */
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return <RepositoryApp onLogout={() => setIsLoggedIn(false)} />;
}
