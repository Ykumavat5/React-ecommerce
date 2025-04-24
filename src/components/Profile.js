import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from "../AuthContext";
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './Profile.css';

const Profile = () => {
    const { user } = useAuth();
console.log(user);

    const initialUserData = {
        name: user.name || "John Doe",
        email: user.email || "john.doe@example.com",
        country_code: user.country_code || "",
        mobile_number: user.mobile_number || "",
        skills: user.skills || "",
    };

    const [userData, setUserData] = useState(initialUserData);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");

    const quillRef = useRef(null);
    const quillInstance = useRef(null);

    useEffect(() => {
        if (!quillInstance.current) {
            quillInstance.current = new Quill(quillRef.current, {
                theme: 'snow',
                readOnly: !isEditing,
                modules: {
                    toolbar: [
                        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'align': [] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        ['link', 'image']
                    ]
                }
            });
    
            // Event listener to update skills when editing
            quillInstance.current.on('text-change', () => {
                if (isEditing) {
                    setUserData(prev => ({
                        ...prev,
                        skills: quillInstance.current.root.innerHTML
                    }));
                }
            });
        }
    
        // Update editor read-only state
        if (quillInstance.current) {
            quillInstance.current.enable(isEditing);
        }
    }, [isEditing]);
    
    useEffect(() => {
        if (quillInstance.current && userData.skills !== quillInstance.current.root.innerHTML) {
            quillInstance.current.root.innerHTML = userData.skills || "";
        }
    }, [userData.skills]);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSave = () => {
        if (!userData.name || !userData.email) {
            setError("All fields are required.");
            return;
        }

        setIsEditing(false);
        setError("");
        alert("Profile updated successfully!");
    };

    return (
        <div className="profile-container" style={{ minHeight: "80vh" }}>
            <div className="profile-details">
                <div className="profile-field">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>

                <div className="profile-field">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>

                <div className="profile-field">
                    <label>Country Code:</label>
                    <input
                        type="text"
                        name="country_code"
                        value={userData.country_code}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>

                <div className="profile-field">
                    <label>Mobile Number:</label>
                    <input
                        type="text"
                        name="mobile_number"
                        value={userData.mobile_number}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>

                <div className="profile-field">
                    <label>Skills:</label>
                    <div ref={quillRef} className="quill-editor" disabled={!isEditing}></div>
                </div>

                {error && <p className="error-message">{error}</p>}

                <div className="profile-actions">
                    {!isEditing ? (
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                    ) : (
                        <button onClick={handleSave}>Save</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
