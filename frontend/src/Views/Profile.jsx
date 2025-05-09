import React from "react";

const Profile = () => {
  const user = {
    firstName: "David",
    lastName: "Doe",
    email: "david@gmail.com",
    phone: "03123456789",
    nic: "4220123456789",
    dob: "1990-05-15T00:00:00.000Z",
    gender: "Male",
    password: "SecurePass123",
    role: "Patient"
  };

  return (
    <div className="profile-wrapper">
      <h2 className="profile-heading">👤 User Profile</h2>
      <form className="profile-form">
        <div className="form-row">
          <label>First Name</label>
          <input type="text" value={user.firstName} disabled />
        </div>
        <div className="form-row">
          <label>Last Name</label>
          <input type="text" value={user.lastName} disabled />
        </div>
        <div className="form-row">
          <label>Email</label>
          <input type="email" value={user.email} disabled />
        </div>
        <div className="form-row">
          <label>Phone</label>
          <input type="text" value={user.phone} disabled />
        </div>
        <div className="form-row">
          <label>NIC</label>
          <input type="text" value={user.nic} disabled />
        </div>
        <div className="form-row">
          <label>Date of Birth</label>
          <input
            type="text"
            value={new Date(user.dob).toLocaleDateString()}
            disabled
          />
        </div>
        <div className="form-row">
          <label>Gender</label>
          <input type="text" value={user.gender} disabled />
        </div>
        <div className="form-row">
          <label>Role</label>
          <input type="text" value={user.role} disabled className="role-input" />
        </div>
      </form>
    </div>
  );
};

export default Profile;
