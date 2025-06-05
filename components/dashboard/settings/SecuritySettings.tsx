'use client';
import { useState } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
// Import React if you're using React.CSSProperties, which is a good practice for TypeScript
import React from 'react'; 

export default function SecuritySettings() {
  const { darkMode } = useDarkMode();

  // State for demonstration purposes - in a real app, this would come from an API
  // FIX 3: Explicitly type the useState for arrays
  const [is2FAEnabled, setIs2FAEnabled] = useState<boolean>(false);
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]); // Explicitly define as string array
  const [activityLog, setActivityLog] = useState<
    Array<{ id: number; date: string; action: string; user: string; ip: string; details: string }>
  >([
    { id: 1, date: '2025-06-05 10:30', action: 'Successful login', user: 'self', ip: '192.168.1.1', details: 'Via Chrome on Windows' },
    { id: 2, date: '2025-06-04 14:00', action: 'Changed password', user: 'self', ip: '192.168.1.5', details: 'From mobile device' },
    { id: 3, date: '2025-06-03 09:15', action: 'AI feature usage', user: 'self', ip: '192.168.1.10', details: 'Generated report XYZ' },
  ]);
  const [connectedDevices, setConnectedDevices] = useState<
    Array<{ id: number; type: string; location: string; lastActivity: string; current: boolean }>
  >([
    { id: 1, type: 'Desktop (Chrome on Windows)', location: 'A Coruña, Spain', lastActivity: 'Just now', current: true },
    { id: 2, type: 'Mobile (Safari on iOS)', location: 'Madrid, Spain', lastActivity: '2 hours ago', current: false },
  ]);
  const [appPermissions, setAppPermissions] = useState<
    Array<{ id: number; name: string; access: string }>
  >([
    { id: 1, name: 'Third-Party Analytics', access: 'Read-only access to usage data' },
    { id: 2, name: 'Marketing Automation Tool', access: 'Access to email and name' },
  ]);

  const handleToggle2FA = () => {
    setIs2FAEnabled(!is2FAEnabled);
    if (!is2FAEnabled) {
      // Simulate generating recovery codes
      // FIX 3: This array is now correctly typed as string[]
      setRecoveryCodes(['CODE-ABC-123', 'CODE-DEF-456', 'CODE-GHI-789']);
    } else {
      setRecoveryCodes([]);
    }
  };

  const handleGenerateNewRecoveryCodes = () => {
    // In a real app, this would call an API
    alert('New recovery codes generated (simulated). Please save them securely!');
    // FIX 3: This array is now correctly typed as string[]
    setRecoveryCodes(['NEW-CODE-111', 'NEW-CODE-222', 'NEW-CODE-333']);
  };

  // FIX 2: Explicitly type 'id' as number
  const handleRevokeDevice = (id: number) => {
    setConnectedDevices(connectedDevices.filter(device => device.id !== id));
  };

  const handleRevokeAllDevices = () => {
    const confirmRevoke = confirm("Are you sure you want to log out from all other devices?");
    if (confirmRevoke) {
      setConnectedDevices(connectedDevices.filter(device => device.current)); // Keep only the current device
      alert('Logged out from all other devices.');
    }
  };

  // FIX 2: Explicitly type 'id' as number
  const handleRevokeAppPermission = (id: number) => {
    setAppPermissions(appPermissions.filter(app => app.id !== id));
  };

  const handleDeleteAccount = () => {
    const confirmDelete = confirm("Are you absolutely sure you want to delete your account? This action cannot be undone.");
    if (confirmDelete) {
      // In a real app, this would trigger an API call to delete the account
      alert('Account deletion initiated (simulated).');
    }
  };

  // FIX 1: Explicitly type the style objects as React.CSSProperties
  const commonSectionStyle: React.CSSProperties = {
    marginBottom: '2.5rem',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    border: darkMode ? '1px solid #333' : '1px solid #eee',
    backgroundColor: darkMode ? '#1a1a1a' : '#fff',
    boxShadow: darkMode ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.05)',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    marginBottom: '1rem',
    color: darkMode ? '#f4f4f5' : '#111',
    borderBottom: darkMode ? '1px solid #444' : '1px solid #ddd',
    paddingBottom: '0.5rem',
  };

  const labelStyle: React.CSSProperties = {
    color: darkMode ? '#ccc' : '#333',
    fontWeight: 'bold',
    marginRight: '0.5rem',
  };

  const valueStyle: React.CSSProperties = {
    color: darkMode ? '#aaa' : '#555',
  };

  // FIX 1: Explicitly type the style object as React.CSSProperties
  const buttonStyle = (danger = false): React.CSSProperties => ({
    padding: '0.6rem 1.2rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
    marginTop: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    backgroundColor: danger ? (darkMode ? '#ef4444' : '#dc2626') : (darkMode ? '#3b82f6' : '#2563eb'),
    color: '#fff',
    transition: 'background-color 0.2s ease-in-out',
    marginRight: '0.75rem',
    // Note: Inline style objects do not support pseudo-classes like :hover directly.
    // For hover effects, you would typically use CSS modules or a styling library like Emotion/Styled Components.
    // The commented out '&:hover' below will not work as inline style.
    // '&:hover': {
    //   backgroundColor: danger ? (darkMode ? '#dc2626' : '#b91c1c') : (darkMode ? '#2563eb' : '#1d4ed8'),
    // },
  });

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
  };

  const thStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '0.75rem',
    borderBottom: darkMode ? '1px solid #444' : '1px solid #eee',
    color: darkMode ? '#f4f4f5' : '#333',
    backgroundColor: darkMode ? '#222' : '#f9f9f9',
  };

  const tdStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '0.75rem',
    borderBottom: darkMode ? '1px solid #333' : '1px solid #eee',
    color: darkMode ? '#ccc' : '#555',
  };

  // FIX 1: Explicitly type the style object as React.CSSProperties
  const titleStyle = (dark: boolean): React.CSSProperties => ({ fontSize: '1.5rem', marginBottom: '1rem', color: dark ? '#f4f4f5' : '#111' });
  const descStyle = (dark: boolean): React.CSSProperties => ({ color: dark ? '#ccc' : '#555', marginBottom: '2rem' });
  // FIX 1: Explicitly type the style object as React.CSSProperties
  const linkStyle = (dark: boolean): React.CSSProperties => ({
    color: dark ? '#3b82f6' : '#2563eb',
    textDecoration: 'none',
    // '&:hover': { textDecoration: 'underline' } // This also won't work in inline styles
  });


  return (
    <div style={{ padding: '2rem' }}>
      <h3 style={titleStyle(darkMode)}>Security</h3>
      <p style={descStyle(darkMode)}>Control password, 2FA, and other security measures for your account.</p>

      {/* Two-Factor Authentication (2FA) */}
      <div style={commonSectionStyle}>
        <h4 style={sectionTitleStyle}>Two-Factor Authentication (2FA)</h4>
        <p style={{ color: darkMode ? '#aaa' : '#555', marginBottom: '1rem' }}>
          Add an extra layer of security to your account by enabling 2FA.
          This requires a code from your mobile device in addition to your password for login.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={labelStyle}>Status:</span>
          <span style={{ ...valueStyle, color: is2FAEnabled ? '#22c55e' : '#ef4444' }}>
            {is2FAEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>

        {!is2FAEnabled ? (
          <div>
            <p style={{ color: darkMode ? '#ccc' : '#555', marginBottom: '1rem' }}>
              To enable 2FA, you can use an authenticator app (like Google Authenticator), SMS, or email.
            </p>
            <button style={buttonStyle()} onClick={handleToggle2FA}>
              Enable 2FA
            </button>
          </div>
        ) : (
          <div>
            <p style={{ color: darkMode ? '#ccc' : '#555', marginBottom: '0.75rem' }}>
              2FA is currently active. You can manage your settings below.
            </p>
            <div style={{ marginBottom: '1rem' }}>
              <span style={labelStyle}>Recovery Codes:</span>
              {recoveryCodes.length > 0 ? (
                <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                  {recoveryCodes.map((code, index) => (
                    <li key={index} style={{ ...valueStyle, marginBottom: '0.25rem' }}>{code}</li>
                  ))}
                </ul>
              ) : (
                <span style={valueStyle}>No recovery codes generated yet.</span>
              )}
            </div>
            <button style={buttonStyle()} onClick={handleGenerateNewRecoveryCodes}>
              Generate New Recovery Codes
            </button>
            <button style={buttonStyle(true)} onClick={handleToggle2FA}>
              Disable 2FA
            </button>
          </div>
        )}
      </div>

      {/* Activity Log / Audit Log */}
      <div style={commonSectionStyle}>
        <h4 style={sectionTitleStyle}>Activity Log</h4>
        <p style={{ color: darkMode ? '#aaa' : '#555', marginBottom: '1rem' }}>
          Review important actions taken on your account, including logins and setting changes.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Date/Time</th>
                <th style={thStyle}>Action</th>
                <th style={thStyle}>User</th>
                <th style={thStyle}>IP Address</th>
                <th style={thStyle}>Details</th>
              </tr>
            </thead>
            <tbody>
              {activityLog.map((entry) => (
                <tr key={entry.id}>
                  <td style={tdStyle}>{entry.date}</td>
                  <td style={tdStyle}>{entry.action}</td>
                  <td style={tdStyle}>{entry.user}</td>
                  <td style={tdStyle}>{entry.ip}</td>
                  <td style={tdStyle}>{entry.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* You could add filters and search functionality here */}
        {/* <div style={{ marginTop: '1rem' }}>
          <input type="text" placeholder="Filter by action..." style={{ padding: '0.5rem', marginRight: '0.5rem', borderRadius: '0.25rem', border: `1px solid ${darkMode ? '#555' : '#ddd'}`, backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#eee' : '#333' }} />
          <button style={buttonStyle()}>Search</button>
        </div> */}
      </div>

      {/* Connected Devices */}
      <div style={commonSectionStyle}>
        <h4 style={sectionTitleStyle}>Connected Devices</h4>
        <p style={{ color: darkMode ? '#aaa' : '#555', marginBottom: '1rem' }}>
          Manage devices currently logged into your account.
        </p>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {connectedDevices.map((device) => (
            <li key={device.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', padding: '0.75rem', borderRadius: '0.375rem', border: darkMode ? '1px solid #444' : '1px solid #eee', backgroundColor: darkMode ? '#222' : '#fcfcfc' }}>
              <div>
                <span style={labelStyle}>Device Type:</span>
                <span style={valueStyle}>{device.type} {device.current && '(Current Session)'}</span>
                <br />
                <span style={labelStyle}>Location:</span>
                <span style={valueStyle}>{device.location}</span>
                <br />
                <span style={labelStyle}>Last Activity:</span>
                <span style={valueStyle}>{device.lastActivity}</span>
              </div>
              {!device.current && (
                <button style={buttonStyle(true)} onClick={() => handleRevokeDevice(device.id)}>
                  Log Out
                </button>
              )}
            </li>
          ))}
        </ul>
        <button style={buttonStyle(true)} onClick={handleRevokeAllDevices}>
          Log Out From All Devices
        </button>
      </div>

      {/* Application Permissions */}
      <div style={commonSectionStyle}>
        <h4 style={sectionTitleStyle}>Application Permissions</h4>
        <p style={{ color: darkMode ? '#aaa' : '#555', marginBottom: '1rem' }}>
          Review and revoke access for third-party applications connected to your account via OAuth.
        </p>
        {appPermissions.length > 0 ? (
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {appPermissions.map((app) => (
              <li key={app.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', padding: '0.75rem', borderRadius: '0.375rem', border: darkMode ? '1px solid #444' : '1px solid #eee', backgroundColor: darkMode ? '#222' : '#fcfcfc' }}>
                <div>
                  <span style={labelStyle}>Application:</span>
                  <span style={valueStyle}>{app.name}</span>
                  <br />
                  <span style={labelStyle}>Access:</span>
                  <span style={valueStyle}>{app.access}</span>
                </div>
                <button style={buttonStyle(true)} onClick={() => handleRevokeAppPermission(app.id)}>
                  Revoke Access
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p style={valueStyle}>No third-party applications connected.</p>
        )}
      </div>

      {/* Privacy Policy and Terms of Service */}
      <div style={commonSectionStyle}>
        <h4 style={sectionTitleStyle}>Legal Documents</h4>
        <p style={{ color: darkMode ? '#aaa' : '#555', marginBottom: '1rem' }}>
          Access our legal documents for more information on how we handle your data and our terms of service.
        </p>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/privacy-policy" style={linkStyle(darkMode)}>Privacy Policy</a>
          </li>
          <li>
            <a href="/terms-of-service" style={linkStyle(darkMode)}>Terms of Service</a>
          </li>
        </ul>
      </div>

      {/* Account Deletion */}
      <div style={{ ...commonSectionStyle, borderColor: darkMode ? '#ef4444' : '#dc2626' }}>
        <h4 style={{ ...sectionTitleStyle, color: darkMode ? '#ef4444' : '#dc2626', borderBottomColor: darkMode ? '#ef4444' : '#dc2626' }}>
          Delete Account
        </h4>
        <p style={{ color: darkMode ? '#aaa' : '#555', marginBottom: '1rem' }}>
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <button style={buttonStyle(true)} onClick={handleDeleteAccount}>
          Delete My Account
        </button>
      </div>
    </div>
  );
}

// FIX 1: Explicitly type the functions returning CSSProperties
const titleStyle = (dark: boolean): React.CSSProperties => ({ fontSize: '1.5rem', marginBottom: '1rem', color: dark ? '#f4f4f5' : '#111' });
const descStyle = (dark: boolean): React.CSSProperties => ({ color: dark ? '#ccc' : '#555', marginBottom: '2rem' });
const linkStyle = (dark: boolean): React.CSSProperties => ({ color: dark ? '#3b82f6' : '#2563eb', textDecoration: 'none' }); // Removed hover effect as it's not supported inline