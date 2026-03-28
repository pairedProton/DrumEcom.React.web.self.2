import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { HiPencil, HiCheck, HiPlus, HiTrash } from 'react-icons/hi2';

// ─── User Details Panel ───────────────────────────────────────────
const UserDetailsPanel = ({ user }) => {
  const [fields, setFields] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    password: '••••••••',
  });
  const [editing, setEditing] = useState({});

  const toggleEdit = (key) => {
    if (editing[key]) {
      setEditing(prev => ({ ...prev, [key]: false }));
    } else {
      if (key === 'password') setFields(prev => ({ ...prev, password: '' }));
      setEditing(prev => ({ ...prev, [key]: true }));
    }
  };

  const rows = [
    { key: 'name', label: 'Full Name', type: 'text' },
    { key: 'phone', label: 'Phone Number', type: 'tel' },
    { key: 'email', label: 'Email Address', type: 'email' },
    { key: 'password', label: 'Password', type: 'password' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-heading font-bold text-gray-900">User Details</h2>
      <div className="flex flex-col gap-5">
        {rows.map(({ key, label, type }) => (
          <div key={key} className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-500">{label}</label>
            <div className="flex items-center gap-3">
              {editing[key] ? (
                <input
                  type={type}
                  value={fields[key]}
                  onChange={(e) => setFields(prev => ({ ...prev, [key]: e.target.value }))}
                  className="flex-1 border border-emerald-400 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white text-gray-900 font-medium"
                  autoFocus
                />
              ) : (
                <span className="flex-1 text-gray-800 font-medium py-2.5 px-1 border-b border-gray-200">
                  {key === 'password' ? '••••••••' : fields[key] || '—'}
                </span>
              )}
              <button
                onClick={() => toggleEdit(key)}
                className="p-2 rounded-full hover:bg-emerald-50 text-emerald-600 transition-colors shrink-0"
                title={editing[key] ? 'Save' : 'Edit'}
              >
                {editing[key] ? <HiCheck className="w-5 h-5" /> : <HiPencil className="w-5 h-5" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Address Panel ───────────────────────────────────────────────
const emptyAddress = { name: '', phone: '', address: '', city: '', pincode: '' };

const AddressPanel = () => {
  const [addresses, setAddresses] = useState([
    { id: 1, name: 'Home', phone: '9876543210', address: '12, Green Park Colony', city: 'New Delhi', pincode: '110016' },
  ]);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newAddress, setNewAddress] = useState(emptyAddress);

  const updateField = (id, key, value) => {
    setAddresses(prev => prev.map(a => a.id === id ? { ...a, [key]: value } : a));
  };

  const deleteAddress = (id) => setAddresses(prev => prev.filter(a => a.id !== id));

  const saveNew = () => {
    if (newAddress.name && newAddress.address) {
      setAddresses(prev => [...prev, { ...newAddress, id: Date.now() }]);
      setNewAddress(emptyAddress);
      setAdding(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-heading font-bold text-gray-900">My Addresses</h2>
      <div className="flex flex-col gap-4">
        {addresses.map(addr => (
          <div key={addr.id} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3 shadow-sm">
            {editingId === addr.id ? (
              <>
                {['name', 'phone', 'address', 'city', 'pincode'].map(key => (
                  <input key={key} type="text" value={addr[key]} placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    onChange={(e) => updateField(addr.id, key, e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                ))}
                <div className="flex gap-2 mt-1">
                  <button onClick={() => setEditingId(null)} className="px-4 py-1.5 bg-emerald-600 text-white text-sm rounded-lg font-semibold hover:bg-emerald-700 transition">Save</button>
                  <button onClick={() => setEditingId(null)} className="px-4 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-lg font-semibold hover:bg-gray-300 transition">Cancel</button>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col gap-1">
                  <p className="font-bold text-gray-900">{addr.name}</p>
                  <p className="text-gray-600 text-[15px]">{addr.address}, {addr.city} — {addr.pincode}</p>
                  <p className="text-gray-500 text-sm">📞 {addr.phone}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => setEditingId(addr.id)} className="p-2 rounded-full hover:bg-emerald-50 text-emerald-600 transition-colors"><HiPencil className="w-4 h-4" /></button>
                  <button onClick={() => deleteAddress(addr.id)} className="p-2 rounded-full hover:bg-red-50 text-red-500 transition-colors"><HiTrash className="w-4 h-4" /></button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add New Address */}
        {adding ? (
          <div className="bg-white border border-emerald-300 rounded-xl p-5 flex flex-col gap-3">
            <p className="font-semibold text-gray-800">New Address</p>
            {['name', 'phone', 'address', 'city', 'pincode'].map(key => (
              <input key={key} type="text" value={newAddress[key]} placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                onChange={(e) => setNewAddress(prev => ({ ...prev, [key]: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500" />
            ))}
            <div className="flex gap-2 mt-1">
              <button onClick={saveNew} className="px-4 py-1.5 bg-emerald-600 text-white text-sm rounded-lg font-semibold hover:bg-emerald-700 transition">Save Address</button>
              <button onClick={() => setAdding(false)} className="px-4 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-lg font-semibold hover:bg-gray-300 transition">Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setAdding(true)} className="flex items-center gap-2 text-emerald-700 font-semibold border border-dashed border-emerald-400 rounded-xl px-4 py-3 hover:bg-emerald-50 transition-colors w-fit">
            <HiPlus className="w-5 h-5" /> Add New Address
          </button>
        )}
      </div>
    </div>
  );
};

// ─── Orders Panel ─────────────────────────────────────────────────
const statusColor = { Delivered: 'text-emerald-600 bg-emerald-50', Shipped: 'text-blue-600 bg-blue-50', Processing: 'text-yellow-600 bg-yellow-50' };

const OrdersPanel = ({ orders }) => (
  <div className="flex flex-col gap-6">
    <h2 className="text-2xl font-heading font-bold text-gray-900">My Orders</h2>
    {orders.length === 0 ? (
      <p className="text-gray-500 font-medium">You have no orders yet.</p>
    ) : (
      <div className="flex flex-col gap-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-400 text-sm">Order ID: <span className="text-gray-600 font-medium">{order.id}</span></p>
                <p className="text-gray-400 text-sm">Date: <span className="text-gray-600 font-medium">{order.date}</span></p>
                <p className="text-gray-400 text-sm">Payment: <span className="text-gray-600 font-medium">{order.paymentMethod}</span></p>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
                <p className="text-xl font-bold text-gray-900">₹ {order.total}</p>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor[order.status] || 'text-gray-600 bg-gray-100'}`}>{order.status}</span>
              </div>
            </div>
            {/* Order Items */}
            <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-700">{item.name} <span className="text-gray-400">×{item.qty}</span></span>
                  <span className="text-gray-600 font-medium">₹ {(item.salePrice || item.sale_price || item.price) * item.qty}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// ─── Page Root ────────────────────────────────────────────────────
const UserProfile = () => {
  const { user, logout } = useAuth();
  const { orders } = useOrders();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');

  if (!user) {
    navigate('/');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'details', label: 'User Details' },
    { id: 'addresses', label: 'Addresses' },
    { id: 'orders', label: 'Orders' },
  ];

  return (
    <div className="w-full min-h-screen bg-[#fbf9f5] py-10 px-4">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900">My Account</h1>
          <p className="text-gray-500 text-[15px] mt-1">Welcome back, <span className="text-emerald-700 font-semibold">{user.name || user.phone}</span></p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar */}
          <aside className="w-full md:w-56 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              {tabs.map((tab, i) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-left px-6 py-4 font-semibold text-[15px] transition-all border-l-4 ${
                    activeTab === tab.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } ${i !== 0 ? 'border-t border-t-gray-100' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="text-left px-6 py-4 font-semibold text-[15px] text-red-500 hover:bg-red-50 transition-all border-t border-gray-100 mt-auto"
              >
                Logout
              </button>
            </div>
          </aside>

          {/* Right Content Panel */}
          <main className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[400px]">
            {activeTab === 'details' && <UserDetailsPanel user={user} />}
            {activeTab === 'addresses' && <AddressPanel />}
            {activeTab === 'orders' && <OrdersPanel orders={orders} />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
