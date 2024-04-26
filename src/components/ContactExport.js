import React, { useState } from 'react';
import { AiOutlineExport } from 'react-icons/ai';

const ContactExport = ({ contacts }) => {
  const [format, setFormat] = useState('json');

  const handleExport = () => {
    if (format === 'json') {
      exportToJSON();
    } else if (format === 'csv') {
      exportToCSV();
    }
  };

  const exportToJSON = () => {
    const jsonData = JSON.stringify(contacts);
    downloadFile(jsonData, 'contacts.json', 'application/json');
  };

  const exportToCSV = () => {
    const csvData = convertToCSV(contacts);
    downloadFile(csvData, 'contacts.csv', 'text/csv');
  };

  const convertToCSV = (data) => {
  const csvRows = [];
  const headers = ['name', 'email', 'phone']; // Propiedades relevantes

  csvRows.push(headers.join(','));

  data.forEach(contact => {
    const values = headers.map(header => {
      return contact[header]; // Seleccionar solo las propiedades relevantes
    });
    csvRows.push(values.join(','));
  });

  return csvRows.join('\n');
};

  const downloadFile = (data, filename, type) => {
    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  };

  return (
    <div className='pa2 bg-lightest-blue'>
      <h2>Export Contacts</h2>
      <select className='ba b--blue bg-light-green pa3 br3 w-20' value={format} onChange={(e) => setFormat(e.target.value)}>
        <option value="json">JSON</option>
        <option value="csv">CSV</option>
      </select>
      <button className='ba b--blue bg-light-green pa3 br3 w-20' onClick={handleExport}><AiOutlineExport />Export</button>
    </div>
  );
};

export default ContactExport;
