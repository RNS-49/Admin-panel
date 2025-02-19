import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import Calendar from "react-calendar";
import "../styles/dashboard.css";
import user from '../images/user.png'

const Dashboard = () => {      //Implementing graph in the UI
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Sales Overview",
        data: [1550, 2300, 300, 580, 3900, 4600, 2000, 3080, 3900, 5700, 3000, 3600],
        backgroundColor: "white",
        borderRadius: 5,
      },
    ],
  };

  const [date, setDate] = useState(new Date());

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000)

    return () => clearInterval(timer)
  }, [])


  const navigate = useNavigate();


  function handleLogout(){
    localStorage.removeItem('admin');
    window.dispatchEvent(new Event('authChange')); // Notify App.js about the change
     navigate('/login'); // Redirect to the login page
     toast.success("LogOut Succesfull")
     console.log("LogOut Success");
    }


  return (
    <div className="container-fluid dashboard">
      {/* Navbar */}
      <nav className="navbar navbar-dark">
        <span className="navbar-brand">EVIREX</span>
        <div className="dropdown">
          <img src={user} alt="" className="user-icon dropdown-toggle" type="button" data-bs-toggle="dropdown"/>
          <ul className="dropdown-menu dropdown-menu-end">
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><a className="dropdown-item" href="#">Billing</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a onClick={handleLogout} className="dropdown-item text-danger" href="#">Log out</a></li>
          </ul>
        </div>
      </nav>

      {/* Dashboard Cards */}
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card stats-card">
            <h5>Total Revenue</h5>
            <h3>56567</h3>
            <p>+10% from last month</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card stats-card">
            <h5>Subscriptions</h5>
            <h3>+5000</h3>
            <p>+50% from last month</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card stats-card">
            <h5>Sales</h5>
            <h3>+12,234</h3>
            <p>+30% from last month</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card stats-card">
            <h5>Active Users</h5>
            <h3>+1000</h3>
            <p>+500 since last month</p>
          </div>
        </div>
      </div>

      {/* Graph Section */}
      <div className="row mt-4">
        <div className="col-md-12 col-lg-8">
          <div className="card chart-card">
            <h3>Overview</h3>
            <Bar data={chartData} />
          </div>
        </div>

        {/* Recent Sales */}
        <div className="col-md-12 col-lg-4">
          <div className="card sales-card">
            <h5>Recent Sales</h5>
            <ul className="list-group">
              <li className="list-group-item">Edward Newgate - 1,999.00</li>
              <li className="list-group-item">Jackson - 39.00</li>
              <li className="list-group-item">Isabella - 299.00</li>
              <li className="list-group-item">William - 99.00</li>
              <li className="list-group-item">Sofia Davis - 39.00</li>
              <li className="list-group-item">Olivia Martin - 1,999.00</li>
              <li className="list-group-item">Jackson  - 39.00</li>
              <li className="list-group-item">Isabella  - 299.00</li>
              <li className="list-group-item">William - 99.00</li>
              <li className="list-group-item">Sofia Davis - 39.00</li>
            </ul>
          </div>

          <div className="col-lg-6 col-md-12 calendar-container">
            <h5>Mini Calendar</h5>
            <Calendar
              onChange={setDate}
              value={date}
              className="small-calendar"
            />
            <p className="selected-date">
              Selected Date: <strong>{date.toDateString()}</strong>
            </p>
          </div>

        </div>
      </div>
      

      <div className="container-fluid user-profiles-container">
      <div className="card user-profiles-card">
        <h3 className="card-title">User Profiles</h3>
        <table className="table user-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="status-badge success">Success</span></td>
              <td>kenny@gmail.com</td>
              <td>300.00</td>
              <td>...</td>
            </tr>
            <tr>

              <td><span className="status-badge success">Success</span></td>
              <td>abel@gmail.com</td>
              <td>240.00</td>
              <td>...</td>
            </tr>
            <tr>
              <td><span className="status-badge processing">Processing</span></td>
              <td>edward@gmail.com</td>
              <td>800.00</td>
              <td>...</td>
            </tr>
            <tr>
              <td><span className="status-badge success">Success</span></td>
              <td>alice@gmail.com</td>
              <td>800.00</td>
              <td>...</td>
            </tr>
            <tr>
              <td><span className="status-badge failed">Failed</span></td>
              <td>nova@gmail.com</td>
              <td>700.00</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
        <div className="pagination-container">
          <span className="text-muted">0 of 5 row(s) selected</span>
          <div>
            <button className="btn btn-sm btn-light">Previous</button>
            <button className="btn btn-sm btn-light">Next</button>
          </div>
        </div>
      </div>
    </div>

    </div>
  );
};

export default Dashboard;