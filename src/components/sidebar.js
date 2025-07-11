import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css'; // Import your CSS file for styling
import {logout} from './logout'
// Material UI Icons
import HomeIcon from '@mui/icons-material/Home';
import NoteAdd from '@mui/icons-material/NoteAdd';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Fancy Add Expense icon
import SaveIcon from '@mui/icons-material/Save';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Tooltip from '@mui/material/Tooltip';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIconCategory from '@mui/icons-material/Home';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CategoryIcon from '@mui/icons-material/Category';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';











const Sidebar = () => {
  // const [isOpen, setIsOpen] = useState(true);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768); // open by default on desktop
 // New: State to control dialog visibility
  const [showDialog, setShowDialog] = useState(false);
  // New: State to hold saved entries
  const [entries, setEntries] = useState([]);
  // New: Form input data
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: ''
  });

const formatCurrency = (amount) => {
  const number = parseFloat(amount || 0);
  return number.toLocaleString('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
};

const handleExpenseFieldChange = (entryIndex, expenseIndex, field, value) => {
  const updated = [...entries];
  updated[entryIndex].expenses[expenseIndex][field] = value;
  setEntries(updated);
};


  const [categories, setCategories] = useState([
    "Food", "Transport", "Utilities", "Entertainment", "Health", "Education", "Others"
  ]);


// Handle screen resize for sidebar toggle
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsOpen(!mobile); // Open on desktop, closed on mobile
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    document.activeElement.blur(); // removes focus from any clicked item

  };

  const handleItemClick = () => {
    if (!isOpen) setIsOpen(true);
  };

  // New: Handle input field changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSave = () => {
    // Add new entry to entries array with default income and expenses
    setEntries([
      ...entries,
      {
        ...formData,
        income: [{ label: '', amount: '' }], // NEW: multiple income entries
        expenses: [{ label: '', amount: '', category: 'Others' }],
        editing: false, // Not editing by default
        original: {}
      }
    ]);

    // Reset form and close modal
    setFormData({ title: '', startDate: '', endDate: '' });
    setShowDialog(false);
     toast.success('Entry created successfully!');
  };

  // New: delete a card entry
  const handleDelete = (index) => {
    const updated = [...entries];
    updated.splice(index, 1); // Remove entry by index
    setEntries(updated);
     toast.success('Entry deleted.');
  };



  const toggleEdit = (index) => {
    const updated = [...entries];
    updated[index].editing = true;
      // Convert string expenses to object format if needed
  updated[index].expenses = updated[index].expenses.map((exp) =>
    typeof exp === 'string' ? { label: '', amount: exp } : exp
  );
  updated[index].original = {
    title: updated[index].title,
    startDate: updated[index].startDate,
    endDate: updated[index].endDate,
    income: updated[index].income,
    expenses: [...updated[index].expenses]  // ✅ Deep copy the array
  }; 
    setEntries(updated);
  };


  const saveEdit = (index) => {
    const updated = [...entries];
    const original = updated[index].original || {};
    const current = updated[index];
    const hasChanged = original.title !== current.title ||
      original.startDate !== current.startDate ||
      original.endDate !== current.endDate ||
      original.income !== current.income ||
      original.expenses !== current.expenses ||
JSON.stringify(original.expenses || []) !== JSON.stringify(current.expenses || []);

    if (!hasChanged) {
      toast.info('No changes made.');
      return;
    }

    updated[index].editing = false;
    updated[index].original = {};
    setEntries(updated);
    toast.success('Changes saved successfully!');
  };


  
  
  
  // New: update individual field in a card while editing
  const handleFieldChange = (index, field, value) => {

    const updated = [...entries];
    updated[index][field] = value;
  setEntries(updated);
  };
  
  // New: add a new blank expense input to a card
  const addExpense = (index) => {
      const updated = [...entries];
  updated[index].expenses.push({ label: '', amount: '', category: 'Others' });
  setEntries(updated);
  toast.info('New expense field added.');
  };

// NEW: Add new income field to a card
const addIncome = (entryIndex) => {  
  const updated = [...entries];
  updated[entryIndex].income.push({ label: '', amount: '' });
  setEntries(updated);
  toast.info('New income source added.'); // NEW: toast
};

// NEW: delete a specific income field
const deleteIncome = (entryIndex, incomeIndex) => {
  const updated = [...entries];
  updated[entryIndex].income.splice(incomeIndex, 1); // remove by index
  setEntries(updated);
  toast.success('Income source deleted.'); // optional toast
};


// NEW: Update income label or amount
const handleIncomeChange = (entryIndex, incomeIndex, field, value) => {
  const updated = [...entries];
  updated[entryIndex].income[incomeIndex][field] = value;
  setEntries(updated);
};


// NEW: Calculate total income per card
const calculateIncomeTotal = (incomeArr) => {
  // return incomes.reduce((acc, inc) => acc + (parseFloat(inc.amount) || 0), 0);
  return incomeArr.reduce((acc, inc) => acc + (parseFloat(inc.amount) || 0), 0);
};
  // New: update a specific expense line in a card
  const handleExpenseChange = (entryIndex, expenseIndex, value) => {
  
      const updated = [...entries];
  const prev = updated[entryIndex].expenses[expenseIndex];

  updated[entryIndex].expenses[expenseIndex] = value;
  setEntries(updated);
  };
  
  const calculateExpenseTotal = (expenses) => {
    // return expenses.reduce((acc, exp) => acc + (parseFloat(exp.amount) || 0), 0);
    return expenses.reduce((acc, exp) => acc + (parseFloat(exp.amount) || 0), 0);
  };

const deleteExpense = (entryIndex, expenseIndex) => {
  const updated = [...entries];
  updated[entryIndex].expenses.splice(expenseIndex, 1);
  setEntries(updated);
};

  const handleAddNewCategory = (newCat) => {
 if (newCat && !categories.includes(newCat.trim())) {
    setCategories(prev => [...prev, newCat.trim()]);
    toast.success(`Category "${newCat}" added`);
  }
  };

  // const totalIncome = entries.reduce((acc, e) => acc + (parseFloat(e.income || 0) || 0), 0);
  const totalIncome = entries.reduce(
  (acc, e) => acc + calculateIncomeTotal(e.income), 0);  // UPDATED
  const totalExpenses = entries.reduce((acc, e) => acc + calculateExpenseTotal(e.expenses), 0);

  const [theme, setTheme] = useState('light');
  
  // Apply theme attribute for CSS vars
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

const categoryIcons = {
  Food: <RestaurantIcon />,
  Transport: <DirectionsCarIcon />,
  Utilities: <HomeIconCategory />,
  Health: <LocalHospitalIcon />,
  Entertainment: <MusicNoteIcon />,
  Others: <CategoryIcon />
};

const categoryTotals = entries.flatMap((e) => e.expenses)
  .reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + (parseFloat(exp.amount) || 0);
    return acc;
  }, {});

const chartData = Object.entries(categoryTotals).map(([name, value]) => ({
  name,
  value
}));

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4560'];







  return (
    <div className={`layout ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
     
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <div className={`sidebar ${isOpen ? 'active' : ''}`}>
         <div className="top-bar">
  {/* ...other header items... */}
  <button
    className="theme-toggle-btn"
    onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
  >
    {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
  </button>
</div>
        <ul>
        <li onClick={handleItemClick}><span className="icon"><HomeIcon /></span><span><Link to="/sidebar" className="text link-clean">Home</Link></span></li>
           {/* New: 'New' menu item opens the dialog */}
          <li onClick={() => setShowDialog(true)}>
            <span className="icon"><NoteAdd /></span>
            <span className="text">New</span>
          </li>
          <li onClick={handleItemClick}><span className="icon"><SearchIcon /></span><span className="text">Search</span></li>
          <li onClick={handleItemClick}><span className="icon"><PersonIcon /></span><span className="text">Profile</span></li>
          <li onClick={handleItemClick,logout} ><span className="icon"><LogoutIcon /></span><span onClick={logout} className="text">Logout</span></li>
        </ul>
      </div>

      <div className="content">
               <h1>Expense Tracker</h1>
        <p>Track your incomes and expenses below.</p>
      {/* New: Dialog box for adding new entries */}
        {showDialog && (
          <div className="dialog-overlay">
            <div className="dialog-box">
              <h2>New Entry</h2>

              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />

              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />

              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
              />

              {/* New: Dialog action buttons */}
              <div className="dialog-buttons">
                <button className="save-btn" onClick={handleSave}>Save</button>
                <button className="cancel-btn" onClick={() => setShowDialog(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

 <div className="grid">
          {entries.map((entry, index) => {
            const totalExpenses = calculateExpenseTotal(entry.expenses);
            return (
              <div key={index} className="grid-card">
                <div className="card-header">
                  <h3>{entry.editing ? (
                    <input
                      type="text"
                      value={entry.title}
                      onChange={(e) => handleFieldChange(index, 'title', e.target.value)}
                    />
                  ) : entry.title}</h3>

                  <div className="card-actions">
                    {!entry.editing && (
                      <EditIcon className="edit-icon" onClick={() => toggleEdit(index)} />
                    )}
                    {entry.editing && (
                      <SaveIcon className="save-icon" onClick={() => saveEdit(index)} />
                    )}
                    <DeleteIcon className="delete-icon" onClick={() => handleDelete(index)} />
                  </div>
                </div>

                <p><strong>Start:</strong> {entry.editing ? (
                  <input
                    type="date"
                    value={entry.startDate}
                    onChange={(e) => handleFieldChange(index, 'startDate', e.target.value)}
                  />
                ) : entry.startDate}</p>

                <p><strong>End:</strong> {entry.editing ? (
                  <input
                    type="date"
                    value={entry.endDate}
                    onChange={(e) => handleFieldChange(index, 'endDate', e.target.value)}
                  />
                ) : entry.endDate}</p>


<div className="income-section"> {/* NEW wrapper */}
  <strong>Income:</strong>
  {entry.income.map((inc, incomeIndex) => (
    <div key={incomeIndex} className="income-row"> {/* NEW layout for each income */}
      {entry.editing ? (
        <>
          <div className="income-column"> {/* NEW column wrapper */}
            <input
              type="text"
              placeholder="Source"
              value={inc.label}
              onChange={(e) =>
                handleIncomeChange(index, incomeIndex, 'label', e.target.value)
              }
              className="income-input"
            />
            <input
              type="number"
              placeholder="Amount"
              value={inc.amount}
              onChange={(e) =>
                handleIncomeChange(index, incomeIndex, 'amount', e.target.value)
              }
              className="income-input"
            />
          </div>

          <DeleteIcon
            className="income-delete-icon" // NEW delete icon
            onClick={() => deleteIncome(index, incomeIndex)} // NEW
            titleAccess="Delete Income"
          />
        </>
      ) : (
        <span className="income-label">
          ↑ {inc.label}: {formatCurrency(inc.amount)}
        </span>
      )}
    </div>
  ))}

  {entry.editing && (
    <AddCircleOutlineIcon
      className="add-income-icon"
      onClick={() => addIncome(index)}
      titleAccess="Add Income"
    />
  )}
</div>


                <div className="expense-section">
                  <strong>Expenses:</strong>


{entry.expenses.map((exp, expIndex) => {
  if (!entry.editing && (!exp.label || !exp.amount)) return null;
  
  return (
    <div key={expIndex} className="expense-row">
      {entry.editing ? (
        <>
          <input
            type="text"
            placeholder="Enter the expense Title e.g Food"
            value={exp.label}
            onChange={(e) =>
              handleExpenseFieldChange(index, expIndex, 'label', e.target.value)
            }
            className="expense-input"
            />
          <input
            type="number"
            placeholder="Amount"
            value={exp.amount}
            onChange={(e) =>
              handleExpenseFieldChange(index, expIndex, 'amount', e.target.value)
            }
            className="expense-input"
            />

          <select
                        value={exp.category}
                        onChange={(e) => handleExpenseFieldChange(index, expIndex, 'category', e.target.value)}
                        className="category-select"
                      >
     
                        {categories.map((cat, i) => (
                          <option key={i} value={cat}>{cat}</option>
                        ))}
                        <option value="">+ New Category</option>
                      </select>

                      {!entry.editing && (
                         <div className="expense-icon-label">
    {categoryIcons[exp.category] || <CategoryIcon />}
  <span className="expense-category-display">({exp.category})</span> 
  </div>
)}
                       
                        <input
    type="text"
    placeholder="Add new category"
    className="new-category-input" 
    onBlur={(e) => handleAddNewCategory(e.target.value)}
  />

          <DeleteIcon
            className="expense-delete-icon"
            onClick={() => deleteExpense(index, expIndex)}
            titleAccess="Delete Expense"
          />
        </>
      ) : (
        <p className="expense-label">
          <Tooltip title={exp.category}>
          <span className="expense-icon">
          {categoryIcons[exp.category] || <CategoryIcon />} {/* ✅ New line */}
          </span>
          </Tooltip>
          ↓ {exp.label}: <span>{formatCurrency(exp.amount)}</span>
                    
        </p>
      )}
    </div>
  );
})}

                  {entry.editing && (
                    <AddCircleOutlineIcon
                    className="add-expense-icon"
                    onClick={() => addExpense(index)}
                      titleAccess="Add Expense"
                    />
                  )}
                </div>

                <div className="summary">
                    <p><span className="summary-income"><strong> Total Income:</strong> {formatCurrency(calculateIncomeTotal(entry.income))}</span></p>
                  <p><strong>Total Expenses:</strong> ₦{totalExpenses}</p>
    
                  <p className={`balance-text ${parseFloat(entry.income || 0) - totalExpenses < 0 ? 'negative' : 'positive'}`}>
  <strong>Balance:</strong> {formatCurrency(parseFloat(entry.income || 0) - totalExpenses)}
</p>

                </div>
              </div>
            );
          })}
        </div>
   

      <div className="expense-category-summary"> 
  <h3>Global Summary</h3>
  <p className="global-income"><strong>Total Income:</strong> {formatCurrency(totalIncome)}</p> {/* NEW styling */}
  <p className="global-expense"><strong>Total Expenses:</strong> {formatCurrency(totalExpenses)}</p>
  <p className={`global-balance ${totalIncome - totalExpenses >= 0 ? 'positive' : 'negative'}`}> {/* NEW */}
    <strong>Balance:</strong> {formatCurrency(totalIncome - totalExpenses)}
  </p>
</div>



      <ResponsiveContainer width="100%" height={200}>
  <PieChart>
    <Pie dataKey="value" data={chartData} outerRadius={80} label>
      {chartData.map((entry, i) => (
        <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
      ))}
    </Pie>
    <Legend />
  </PieChart>
</ResponsiveContainer>
    </div>
      </div>
  );
};

export default Sidebar;


