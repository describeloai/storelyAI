'use client';
import { useDarkMode } from '@/context/DarkModeContext';
import { useState } from 'react';
import styles from '@/components/dashboard/ui/BillingSettings.module.css'; // Import the CSS module

export default function BillingSettings() {
  const { darkMode } = useDarkMode();
  const themeClass = darkMode ? styles.dark : styles.light;

  // Basic state for demonstration, you'd likely fetch this data from an API
  const [currentPlan, setCurrentPlan] = useState({
    name: 'Pro',
    features: ['Unlimited AI tokens', '10 active assistants', 'Priority support'],
    billingDate: 'July 5, 2025',
    cost: '$49.99/month',
    currentUsage: {
      aiTokens: { used: 150000, limit: 'Unlimited' },
      activeAssistants: { used: 7, limit: 10 },
    },
  });

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 'card_1', type: 'Visa', last4: '4242', expiry: '12/26', default: true },
    { id: 'card_2', type: 'Mastercard', last4: '1234', expiry: '10/25', default: false },
  ]);

  const [invoices, setInvoices] = useState([
    { id: 'INV-2025-001', date: 'June 5, 2025', amount: '$49.99', status: 'Paid', downloadUrl: '/invoices/INV-2025-001.pdf' },
    { id: 'INV-2025-002', date: 'May 5, 2025', amount: '$49.99', status: 'Paid', downloadUrl: '/invoices/INV-2025-002.pdf' },
  ]);

  const [billingInfo, setBillingInfo] = useState({
    address: '123 Main St, Anytown, CA 90210',
    vatId: 'ES12345678Z',
    nameOnInvoice: 'Acme Corp',
  });

  return (
    <div className={styles.container}>
      <h3 className={`${styles.title} ${themeClass}`}>Billing Settings</h3>
      <p className={`${styles.description} ${themeClass}`}>Manage your plan, view invoices, and update payment information.</p>

      {/* Current Plan Information */}
      <div className={`${styles.section} ${themeClass}`}>
        <h4 className={`${styles.subTitle} ${themeClass}`}>Your Current Plan</h4>
        <p className={`${styles.text} ${themeClass}`}>Plan Name: <strong>{currentPlan.name}</strong></p>
        <p className={`${styles.text} ${themeClass}`}>Features: {currentPlan.features.join(', ')}</p>
        <p className={`${styles.text} ${themeClass}`}>Next Billing Date: {currentPlan.billingDate}</p>
        <p className={`${styles.text} ${themeClass}`}>Cost: {currentPlan.cost}</p>
        <div style={{ marginTop: '1rem' }}>
          <p className={`${styles.text} ${themeClass}`}><strong>Current Usage:</strong></p>
          <p className={`${styles.text} ${themeClass}`}>AI Tokens Used: {currentPlan.currentUsage.aiTokens.used} {currentPlan.currentUsage.aiTokens.limit !== 'Unlimited' && `of ${currentPlan.currentUsage.aiTokens.limit}`}</p>
          <p className={`${styles.text} ${themeClass}`}>Active Assistants: {currentPlan.currentUsage.activeAssistants.used} of {currentPlan.currentUsage.activeAssistants.limit}</p>
          {/* Add more detailed usage graphs/metrics here using a charting library */}
          <div className={`${styles.usageGraphPlaceholder} ${themeClass}`}>
            <span className={`${styles.text} ${themeClass}`}>[Placeholder for Usage Graphs]</span>
          </div>
        </div>
        <button className={`${styles.button} ${styles.primary}`} style={{ marginTop: '1.5rem' }}>Change Plan</button>
      </div>

      {/* Payment Methods */}
      <div className={`${styles.section} ${themeClass}`}>
        <h4 className={`${styles.subTitle} ${themeClass}`}>Payment Methods</h4>
        {paymentMethods.length > 0 ? (
          paymentMethods.map((method) => (
            <div key={method.id} className={`${styles.paymentMethodItem} ${themeClass}`}>
              <p className={`${styles.text} ${themeClass}`}>{method.type} ending in {method.last4} {method.default && '(Default)'}</p>
              <div>
                <button className={`${styles.button} ${styles.primary} ${styles.small}`} style={{ marginRight: '0.5rem' }}>Edit</button>
                {!method.default && <button className={`${styles.button} ${styles.danger} ${styles.small}`}>Remove</button>}
              </div>
            </div>
          ))
        ) : (
          <p className={`${styles.text} ${themeClass}`}>No payment methods added yet.</p>
        )}
        <button className={`${styles.button} ${styles.primary}`} style={{ marginTop: '1.5rem' }}>Add New Payment Method</button>
      </div>

      {/* Billing Information */}
      <div className={`${styles.section} ${themeClass}`}>
        <h4 className={`${styles.subTitle} ${themeClass}`}>Billing Information</h4>
        <p className={`${styles.text} ${themeClass}`}>Address: {billingInfo.address}</p>
        <p className={`${styles.text} ${themeClass}`}>VAT ID: {billingInfo.vatId}</p>
        <p className={`${styles.text} ${themeClass}`}>Name on Invoice: {billingInfo.nameOnInvoice}</p>
        <button className={`${styles.button} ${styles.primary}`} style={{ marginTop: '1.5rem' }}>Update Billing Info</button>
      </div>

      {/* Payment History / Invoices */}
      <div className={`${styles.section} ${themeClass}`}>
        <h4 className={`${styles.subTitle} ${themeClass}`}>Payment History / Invoices</h4>
        {invoices.length > 0 ? (
          <table className={styles.invoiceTable}>
            <thead>
              <tr className={`${styles.headerRow} ${themeClass}`}>
                <th className={themeClass}>Invoice ID</th>
                <th className={themeClass}>Date</th>
                <th className={themeClass}>Amount</th>
                <th className={themeClass}>Status</th>
                <th className={themeClass}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className={themeClass}>
                  <td className={`${styles.text} ${themeClass}`}>{invoice.id}</td>
                  <td className={`${styles.text} ${themeClass}`}>{invoice.date}</td>
                  <td className={`${styles.text} ${themeClass}`}>{invoice.amount}</td>
                  <td className={`${styles.text} ${themeClass}`}>{invoice.status}</td>
                  <td>
                    <a href={invoice.downloadUrl} target="_blank" rel="noopener noreferrer" className={`${styles.link} ${themeClass}`}>Download PDF</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={`${styles.text} ${themeClass}`}>No invoices found.</p>
        )}
      </div>
    </div>
  );
}