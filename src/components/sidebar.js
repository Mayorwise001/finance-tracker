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

  // New: Save entry and hide dialog
  // const handleSave = () => {
  //   setEntries([...entries, formData]); // Add new entry to list
  //   setFormData({ title: '', startDate: '', endDate: '' }); // Reset form
  //   setShowDialog(false); // Close dialog
  // };




  const handleSave = () => {
    // Add new entry to entries array with default income and expenses
    setEntries([
      ...entries,
      {
        ...formData,
        income: '',
        expenses: [],
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

  // New: toggle editing mode per card
  // const toggleEdit = (index) => {
  //   const updated = [...entries];
  //   updated[index].editing = !updated[index].editing; // Toggle edit state
  //   setEntries(updated);
  // };

  const toggleEdit = (index) => {
    const updated = [...entries];
    updated[index].editing = true;
    // updated[index].original = { ...updated[index] }; // Save original state
    // Deep copy the original state (especially expenses array)
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
    // const updated = [...entries];
    // updated[index][field] = value;
    // setEntries(updated);

      const updated = [...entries];
  const prev = updated[index][field];

  // if (prev !== value) {
  //   toast.info(`${field} updated.`);
  // }

  updated[index][field] = value;
  setEntries(updated);
  };

  // New: add a new blank expense input to a card
  const addExpense = (index) => {
    // const updated = [...entries];
    // updated[index].expenses.push('');
    // setEntries(updated);

      const updated = [...entries];
  updated[index].expenses.push('');
  setEntries(updated);
  toast.info('New expense field added.');
  };

  // New: update a specific expense line in a card
  const handleExpenseChange = (entryIndex, expenseIndex, value) => {
    // const updated = [...entries];
    // updated[entryIndex].expenses[expenseIndex] = value;
    // setEntries(updated);

      const updated = [...entries];
  const prev = updated[entryIndex].expenses[expenseIndex];

  // if (prev !== value) {
  //   toast.info(`Expense ${expenseIndex + 1} updated.`);
  // }

  updated[entryIndex].expenses[expenseIndex] = value;
  setEntries(updated);
  };

  const calculateExpenseTotal = (expenses) => {
    return expenses.reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
  };

const deleteExpense = (entryIndex, expenseIndex) => {
  const updated = [...entries];
  updated[entryIndex].expenses.splice(expenseIndex, 1);
  setEntries(updated);
};


  return (
    <div className={`layout ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <div className={`sidebar ${isOpen ? 'active' : ''}`}>
        <ul>
        <li onClick={handleItemClick}><span className="icon"><HomeIcon /></span><span><Link to="/sidebar" className="text link-clean">Home</Link></span></li>
        {/* <li onClick={handleItemClick}><span className="icon"><HomeIcon /></span><span><Link to="/sidebar" className="text link-clean">Home</Link></span></li> */}
        {/* <li onClick={handleItemClick}><span className="icon"><NoteAdd /></span><span className="text">New</span></li> */}
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

        {/* New: Display saved entries in a grid */}
        {/* <div className="grid">
          {entries.map((entry, index) => (
            <div key={index} className="grid-card"> */}
              
              {/* New: card title and edit/delete icons */}
              {/* <div className="card-header">
                <h3>
                  {entry.editing ? (
                    <input
                      type="text"
                      value={entry.title}
                      onChange={(e) => handleFieldChange(index, 'title', e.target.value)}
                    />
                  ) : entry.title}
                </h3>
                <div className="card-actions"> */}
                  {/* <EditIcon className="edit-icon" onClick={() => toggleEdit(index)} />
                  <DeleteIcon className="delete-icon" onClick={() => handleDelete(index)} /> */}

                  {/* If not editing, show edit icon */}
  {/* {!entry.editing && (
    <EditIcon className="edit-icon" onClick={() => toggleEdit(index)} />
  )} */}

  {/* If editing, show save icon */}
  {/* {entry.editing && (
    <SaveIcon className="save-icon" onClick={() => toggleEdit(index)} />
  )} */}

  {/* Delete icon always shows */}
  {/* <DeleteIcon className="delete-icon" onClick={() => handleDelete(index)} />
                </div>
              </div> */}

              {/* Editable start date */}
              {/* <p><strong>Start:</strong> {entry.editing ? (
                <input
                  type="date"
                  value={entry.startDate}
                  onChange={(e) => handleFieldChange(index, 'startDate', e.target.value)}
                />
              ) : entry.startDate}</p> */}

              {/* Editable end date */}
              {/* <p><strong>End:</strong> {entry.editing ? (
                <input
                  type="date"
                  value={entry.endDate}
                  onChange={(e) => handleFieldChange(index, 'endDate', e.target.value)}
                />
              ) : entry.endDate}</p> */}

              {/* Editable income */}
              {/* <p><strong>Income:</strong> {entry.editing ? (
                <input
                  type="number"
                  value={entry.income}
                  onChange={(e) => handleFieldChange(index, 'income', e.target.value)}
                />
              ) : `₦${entry.income || 0}`}</p> */}

              {/* Expense lines with input */}
              {/* <div className="expense-section">
                <strong>Expenses:</strong>
                {entry.expenses.map((exp, expIndex) => (
                  <input
                    key={expIndex}
                    type="text"
                    value={exp}
                    onChange={(e) => handleExpenseChange(index, expIndex, e.target.value)}
                    disabled={!entry.editing}
                    className="expense-input"
                  />
                ))} */}

                {/* Button to add new expense row */}
                {/* {entry.editing && (
                  <AddCircleOutlineIcon
  className="add-expense-icon"
  onClick={() => addExpense(index)}
  titleAccess="Add Expense"
/>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar; */}

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

                <p><strong>Income:</strong> {entry.editing ? (
                  <input
                    type="number"
                    value={entry.income}
                    onChange={(e) => handleFieldChange(index, 'income', e.target.value)}
                  />
                ) : `₦${entry.income || 0}`}</p>

                <div className="expense-section">
                  <strong>Expenses:</strong>
                  {/* {entry.expenses.map((exp, expIndex) => (
                    <input
                      key={expIndex}
                      type="text"
                      value={exp}
                      onChange={(e) => handleExpenseChange(index, expIndex, e.target.value)}
                      disabled={!entry.editing}
                      className="expense-input"
                    />
                  ))} */}
{/* {entry.expenses.map((exp, expIndex) => (
  entry.editing ? (
    <input
      key={expIndex}
      type="text"
      value={exp}
      onChange={(e) => handleExpenseChange(index, expIndex, e.target.value)}
      className="expense-input"
    />
  ) : (
    <p key={expIndex} className="expense-label">- ₦{exp || 0}</p>
  )
))} */}


{entry.expenses.map((exp, expIndex) => {
  // Hide empty expense fields when not editing
  if (!entry.editing && !exp) return null;

  return (
    <div key={expIndex} className="expense-row">
      {entry.editing ? (
        <>
          <input
            type="text"
            value={exp}
            onChange={(e) => handleExpenseChange(index, expIndex, e.target.value)}
            className="expense-input"
          />
          <DeleteIcon
            className="expense-delete-icon"
            onClick={() => deleteExpense(index, expIndex)}
            titleAccess="Delete Expense"
          />
        </>
      ) : (
        <p className="expense-label">↓ ₦{exp || 0}</p>
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
                  <p><strong>Total Expenses:</strong> ₦{totalExpenses}</p>
                  <p><strong>Balance:</strong> ₦{(parseFloat(entry.income || 0) - totalExpenses)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


