

// import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import * as XLSX from 'xlsx';
// import Receipt from './Receipt'; // Adjust the import path as necessary

// const BulkReceiptGen = () => {
//     const [file, setFile] = useState(null);
//     const [receiptDataArray, setReceiptDataArray] = useState([]); // Store receipt data for HTML rendering
//     const [fileName, setFileName] = useState(''); // New state variable for the file name
//     const [showModal, setShowModal] = useState(false); // State variable for modal visibility
//     const [missingFields, setMissingFields] = useState([]);
//     const [errorMessages, setErrorMessages] = useState([]); // To hold error messages
//     const [isDownloading, setIsDownloading] = useState(false);
// const [saveMessage, setSaveMessage] = useState(''); // New state to track the save status message

//     const handleFileChange = (event) => {
//         const uploadedFile = event.target.files[0]; // Get the first file


//         const allowedExtensions = /(\.xlsx|\.xls)$/i;

//         if (uploadedFile && allowedExtensions.exec(uploadedFile.name)) {
//             setFile(uploadedFile);
//             setFileName(uploadedFile.name); // Set the file name
//         } else {
//             alert('Please upload only Excel files (.xlsx or .xls)');
//             event.target.value = ''; // Reset the input field
//         }
//     };

// const excelDateToJSDate = (excelDate) => {
//     // Convert Excel date to JavaScript date
//     const jsDate = new Date((excelDate - (25567 + 2)) * 86400 * 1000);

//     // Format the date as "DD/MMM/YYYY"
//     const formattedDate = jsDate.toLocaleDateString('en-GB', {
//         day: '2-digit',
//         month: 'short', // Use 'numeric' if you want the month as a number
//         year: 'numeric',
//     });

//     return formattedDate;
// };


// const generateReceipts = async (jsonData) => {
//     const receipts = [];
//     const missingFields = []; // To track missing fields for each receipt

//     jsonData.forEach((row) => {
//         const totalCourseFees = parseFloat(row['Amount Paid']) || 0;
//         const courseFees = (totalCourseFees / 1.18).toFixed(2);
//         const cgst = (courseFees * 0.09).toFixed(2);
//         const sgst = (courseFees * 0.09).toFixed(2);
//         const formattedDate = row['Date'] ? excelDateToJSDate(row['Date']) : '';

//         // Check for missing fields
//         if (!row['Receipt No.'] || !row['Name'] || !row['Course Name'] || !row['Amount Paid'] || !row['Payment Mode']) {
//             const missingFieldNames = [];
//             if (!row['Receipt No.']) missingFieldNames.push("Receipt No.");
//             if (!row['Name']) missingFieldNames.push("Name");
//             if (!row['Course Name']) missingFieldNames.push("Course Name");
//             if (!row['Amount Paid']) missingFieldNames.push("Amount Paid");
//             if (!row['Payment Mode']) missingFieldNames.push("Payment Mode");

//             // Use Receipt No for the message
//             const receiptNo = row['Receipt No.'] || 'Unknown Receipt No';
//             missingFields.push(`Receipt No: ${receiptNo} -  ${missingFieldNames.join(', ')} is Missing`);
//         } else {
//             const receiptData = {
//                 receiptNo: row['Receipt No.'],
//                 date: formattedDate,
//                 receivedFrom: row['Name'],
//                 courseName: row['Course Name'],
//                 totalCourseFees: row['Amount Paid'],
//                 courseFees,
//                 cgst,
//                 sgst,
//                 totalValue: totalCourseFees,
//                 modofPayment: row['Payment Mode'],
//                 amountInWords: convertNumberToWords(row['Amount Paid']),
//                 excelFileName: fileName,
//             };

//             receipts.push(receiptData);
//         }
//     });

//     // If there are missing fields, set the error messages and prevent table display
//     if (missingFields.length > 0) {
//         setErrorMessages(missingFields);
//         setReceiptDataArray([]); // Clear the receipt data array
//     } else {
//         setReceiptDataArray(receipts);
//         setErrorMessages([]); // Clear any previous error messages
//     }
// };

//     const handlePreview = async (event) => {
//         event.preventDefault();
//         if (!file) return;

//         const fileReader = new FileReader();
//         fileReader.onload = async (e) => {
//             const data = new Uint8Array(e.target.result);
//             const workbook = XLSX.read(data, { type: 'array' });
//             const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
//             const jsonData = XLSX.utils.sheet_to_json(firstSheet);

//             await generateReceipts(jsonData);
//             setShowModal(true);
//         };

//         fileReader.readAsArrayBuffer(file);
//     };

// const convertNumberToWords = (num) => {
//     const singleDigits = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
//     const doubleDigits = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
//     const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
//     const bigNumbers = ["", "Thousand", "Million", "Billion", "Trillion"];

//     if (num === 0) return "Zero";
//     if (num.toString().length > 9) return "Overflow"; // max number limit

//     let words = "";
//     const parts = ("000000000" + num).slice(-9).match(/.{1,3}/g); // split number into hundreds, thousands, millions

//     for (let i = 0; i < parts.length; i++) {
//         let currentPart = parseInt(parts[i], 10);
//         if (currentPart === 0) continue;

//         let partInWords = "";
//         if (currentPart > 99) {
//             partInWords += singleDigits[Math.floor(currentPart / 100)] + " Hundred ";
//             currentPart %= 100; // reassigning currentPart using 'let'
//         }
//         if (currentPart > 19) {
//             partInWords += tens[Math.floor(currentPart / 10)] + " ";
//             currentPart %= 10; // reassigning currentPart using 'let'
//         }
//         if (currentPart > 0) {
//             partInWords += (currentPart < 10 ? singleDigits[currentPart] : doubleDigits[currentPart - 10]) + " ";
//         }
//         words += partInWords + bigNumbers[parts.length - i - 1] + " ";
//     }

//     return words.trim();
// };

// const downloadPDF = async () => {
//     setIsDownloading(true);  // Set loading state to true to show "Please Wait..." text

//     const pdf = new jsPDF();
//     const pageHeight = pdf.internal.pageSize.getHeight();

//     for (let index = 0; index < receiptDataArray.length; index += 2) {
//         const firstReceiptElement = document.getElementById(`receipt-${index}`);

//         // Use await to ensure that the canvas is generated before proceeding
//         const firstCanvas = await html2canvas(firstReceiptElement);
//         const firstImgData = firstCanvas.toDataURL('image/png');

//         // Add the first receipt
//         pdf.addImage(firstImgData, 'PNG', 10, 10, 190, 0);

//         // Check if there is a second receipt for the current page
//         if (index + 1 < receiptDataArray.length) {
//             const secondReceiptElement = document.getElementById(`receipt-${index + 1}`);
//             const secondCanvas = await html2canvas(secondReceiptElement);
//             const secondImgData = secondCanvas.toDataURL('image/png');

//             // Add the second receipt below the first one
//             pdf.addImage(secondImgData, 'PNG', 10, pageHeight / 2 + 10, 190, 0);
//         }

//         // Add a new page only if there are more receipts to process
//         if (index + 2 < receiptDataArray.length) {
//             pdf.addPage();
//         }
//     }

//     pdf.save('Receipts.pdf');

//     // Save receipt data to the database
//     try {
//         const response = await fetch('http://localhost:5000/api/save-receipt2', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(receiptDataArray), // Send the whole array of receipt data
//         });

//         if (!response.ok) {
//             throw new Error('Failed to save receipts');
//         }

//         setSaveMessage('Receipts saved successfully!'); // Show success message
//     } catch (error) {
//         console.error(error);
//         setSaveMessage('Error saving receipts. Please try again.'); // Show error message
//     } finally {
//         setIsDownloading(false);  // Reset loading state to false after download is complete
//     }
// };

//     return (
//         <div className='container mt-5'>
//             <form onSubmit={handlePreview}>
//                 <div class="upload-files-container">
// <div class="drag-file-area">
//     <span class="material-icons-outlined upload-icon">Only Upload Excel file</span>
//     <label class="label" style={{ display: 'block' }} >
//         <span class="browse-files">
//             <input type="file" class="default-file-input" accept=".xlsx, .xls" onChange={handleFileChange} required />
//             <span class="browse-files-text">browse file</span><span> from device</span>
//         </span>
//     </label>
// </div>
//                     <button type="submit" class="upload-button">Load Data</button>
//                 </div>
//             </form>

// {
//     errorMessages.length > 0 && (
//         <div class="alert alert-danger alert-dismissible d-flex mt-4" style={{ justifyContent: 'space-between', width: '50%', padding: '1rem', margin: '0 auto' }}>
//             {errorMessages.map((msg, index) => (
//                 <div key={index}>{msg}</div>
//             ))}
//             <button type="button" class="btn-close" data-bs-dismiss="alert" style={{ background: 'transparent', border: 'none' }}> ❌</button>
//         </div>

//     )
// }
//             {
//                 receiptDataArray.length > 0 && (
//                     <div>
//                         <h3>Loaded Receipts:</h3>
//                         <table className="table table-striped table-hover table-bordered">
//                             <thead>
//                                 <tr>
//                                     <th>Receipt No</th>
//                                     <th>Date</th>
//                                     <th>Name</th>
//                                     <th>Course</th>
//                                     <th>Amount Paid</th>
//                                     <th>Payment Mode</th>
//                                     <th>File Name</th>
//                                     <th><input type="checkbox" /></th>
//                                     <th>Preview Button</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {receiptDataArray.map((receipt, index) => (
//                                     <tr key={index}>
//                                         <td>{receipt.receiptNo}</td>
//                                         <td>{receipt.date}</td>
//                                         <td>{receipt.receivedFrom}</td>
//                                         <td>{receipt.courseName}</td>
//                                         <td>{receipt.totalCourseFees}</td>
//                                         <td>{receipt.modofPayment}</td>
//                                         <td>{receipt.excelFileName}</td>
//                                         <th><input type="checkbox" /></th>
//                                         <td>   <button className="btn btn-secondary" data-bs-toggle="modal"
//                                             data-bs-target="#bulkReceipt">Preview Receipts</button></td>

//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                         <button className="btn btn-secondary" data-bs-toggle="modal"
//                             data-bs-target="#bulkReceipt">Preview Receipts For Bulk</button>
//                     </div>
//                 )
//             }
//             {/* Modal for Preview */}

//             <div className="modal" id="bulkReceipt">
//                 <div className="modal-dialog modal-xl modal-dialog-scrollable">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h5 className="modal-title">Receipt Preview</h5>
//                             <button type="button" className="btn-close" data-bs-dismiss='modal' style={{ border: 'none', backgroundColor: 'transparent' }} >❌</button>
//                         </div>
//                         <div className="modal-body">
//                             {receiptDataArray.map((receipt, index) => (
//                                 <div id={`receipt-${index}`} key={index}>
//                                     <Receipt receiptData={receipt} />
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="modal-footer">
//                             {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
//                             {/* <button type="button" className="btn btn-primary" onClick={downloadPDF}>Download as PDF</button> */}
// {saveMessage && (
//     <div className="mt-2">
//         <p className={saveMessage.includes('Error') ? 'text-danger' : 'text-success'}>
//             {saveMessage}
//         </p>
//     </div>
// )}
// <button
//     type="button"
//     className="btn btn-primary"
//     onClick={downloadPDF}
//     disabled={isDownloading}  // Disable button while downloading
// >
//     {isDownloading ? "Please Wait..." : "Download and save data"}
// </button>

//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </div >
//     );
// };

// export default BulkReceiptGen;


import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import Receipt from './Receipt'; // Adjust the import path as necessary

const BulkReceiptGen = () => {
    const [file, setFile] = useState(null);
    const [receiptDataArray, setReceiptDataArray] = useState([]); // Store receipt data for HTML rendering
    const [fileName, setFileName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedReceipt, setSelectedReceipt] = useState(null); // For individual receipt preview
    const [isDownloading, setIsDownloading] = useState(false);
    const [saveMessage, setSaveMessage] = useState(''); // New state to track the save status message
    const [errorMessages, setErrorMessages] = useState([]); // To hold error messages

    const convertNumberToWords = (num) => {
        const singleDigits = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
        const doubleDigits = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
        const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
        const bigNumbers = ["", "Thousand", "Million", "Billion", "Trillion"];

        if (num === 0) return "Zero";
        if (num.toString().length > 9) return "Overflow"; // max number limit

        let words = "";
        const parts = ("000000000" + num).slice(-9).match(/.{1,3}/g); // split number into hundreds, thousands, millions

        for (let i = 0; i < parts.length; i++) {
            let currentPart = parseInt(parts[i], 10);
            if (currentPart === 0) continue;

            let partInWords = "";
            if (currentPart > 99) {
                partInWords += singleDigits[Math.floor(currentPart / 100)] + " Hundred ";
                currentPart %= 100; // reassigning currentPart using 'let'
            }
            if (currentPart > 19) {
                partInWords += tens[Math.floor(currentPart / 10)] + " ";
                currentPart %= 10; // reassigning currentPart using 'let'
            }
            if (currentPart > 0) {
                partInWords += (currentPart < 10 ? singleDigits[currentPart] : doubleDigits[currentPart - 10]) + " ";
            }
            words += partInWords + bigNumbers[parts.length - i - 1] + " ";
        }

        return words.trim();
    };
    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        const allowedExtensions = /(\.xlsx|\.xls)$/i;

        if (uploadedFile && allowedExtensions.exec(uploadedFile.name)) {
            setFile(uploadedFile);
            setFileName(uploadedFile.name);
        } else {
            alert('Please upload only Excel files (.xlsx or .xls)');
            event.target.value = '';
        }
    };

    const handlePreview = (event) => {
        event.preventDefault();
        if (!file) return;

        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet);

            generateReceipts(jsonData);
            setShowModal(true); // Show the modal
        };

        fileReader.readAsArrayBuffer(file);
    };

    const excelDateToJSDate = (excelDate) => {
        // Convert Excel date to JavaScript date
        const jsDate = new Date((excelDate - (25567 + 2)) * 86400 * 1000);

        // Format the date as "DD/MMM/YYYY"
        const formattedDate = jsDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long', // Use 'numeric' if you want the month as a number
            year: 'numeric',
        });

        return formattedDate;
    };


    const generateReceipts = async (jsonData) => {
        const receipts = [];
        const missingFields = []; // To track missing fields for each receipt
        const expectedHeaders = [
            'Receipt No.',
            'Name',
            'Course Name',
            'Amount Paid',
            'Payment Mode',
            'Date' // Include 'Date' if you want to check this too
        ];

        // Check for missing or incorrect headers
        const actualHeaders = Object.keys(jsonData[0] || {});
        const missingHeaders = expectedHeaders.filter(header => !actualHeaders.includes(header));

        if (missingHeaders.length > 0) {
            setErrorMessages([`The following headers fields are missing or incorrect: ${missingHeaders.join(', ')}`]);
            setReceiptDataArray([]); // Clear the receipt data array
            return; // Stop further processing
        }

        jsonData.forEach((row) => {
            const totalCourseFees = parseFloat(row['Amount Paid']) || 0;
            const courseFees = (totalCourseFees / 1.18).toFixed(2);
            const cgst = (courseFees * 0.09).toFixed(2);
            const sgst = (courseFees * 0.09).toFixed(2);
            const formattedDate = row['Date'] ? excelDateToJSDate(row['Date']) : '';

            // Check for missing fields
            if (!row['Receipt No.'] || !row['Name'] || !row['Course Name'] || !row['Amount Paid'] || !row['Payment Mode']) {
                const missingFieldNames = [];
                if (!row['Receipt No.']) missingFieldNames.push("Receipt No.");
                if (!row['Name']) missingFieldNames.push("Name");
                if (!row['Course Name']) missingFieldNames.push("Course Name");
                if (!row['Amount Paid']) missingFieldNames.push("Amount Paid");
                if (!row['Payment Mode']) missingFieldNames.push("Payment Mode");

                // Use Receipt No for the message
                const receiptNo = row['Receipt No.'] || 'Unknown Receipt No';
                missingFields.push(`Receipt No: ${receiptNo} -  ${missingFieldNames.join(', ')} is Missing`);
            } else {
                const receiptData = {
                    receiptNo: row['Receipt No.'],
                    date: formattedDate,
                    receivedFrom: row['Name'],
                    courseName: row['Course Name'],
                    totalCourseFees: row['Amount Paid'],
                    courseFees,
                    cgst,
                    sgst,
                    totalValue: totalCourseFees,
                    modofPayment: row['Payment Mode'],
                    amountInWords: convertNumberToWords(row['Amount Paid']),
                    excelFileName: fileName,
                };

                receipts.push(receiptData);
            }
        });

        // If there are missing fields, set the error messages and prevent table display
        if (missingFields.length > 0) {
            setErrorMessages(missingFields);
            setReceiptDataArray([]); // Clear the receipt data array
        } else {
            setReceiptDataArray(receipts);
            setErrorMessages([]); // Clear any previous error messages
        }
    };



    const handleReceiptPreview = (receipt) => {
        setSelectedReceipt(receipt); // Set the selected receipt for preview
        setShowModal(true); // Open modal
    };

    const handleBulkPreview = () => {
        setSelectedReceipt(receiptDataArray); // Set all receipts for bulk preview
        setShowModal(true); // Open modal
    };



    const downloadPDF = async () => {
        setIsDownloading(true);  // Set loading state to true to show "Please Wait..." text

        const pdf = new jsPDF();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Handle single receipt preview
        if (!Array.isArray(selectedReceipt)) {
            const receiptElement = document.getElementById(`receipt-${selectedReceipt.receiptNo}`);
            const canvas = await html2canvas(receiptElement);
            const imgData = canvas.toDataURL('image/png');

            pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
        } else {
            // Handle bulk receipts
            for (let index = 0; index < selectedReceipt.length; index += 2) {
                const firstReceiptElement = document.getElementById(`receipt-${index}`);

                // Use await to ensure that the canvas is generated before proceeding
                const firstCanvas = await html2canvas(firstReceiptElement);
                const firstImgData = firstCanvas.toDataURL('image/png');

                // Add the first receipt
                pdf.addImage(firstImgData, 'PNG', 10, 10, 190, 0);

                // Check if there is a second receipt for the current page
                if (index + 1 < selectedReceipt.length) {
                    const secondReceiptElement = document.getElementById(`receipt-${index + 1}`);
                    const secondCanvas = await html2canvas(secondReceiptElement);
                    const secondImgData = secondCanvas.toDataURL('image/png');

                    // Add the second receipt below the first one
                    pdf.addImage(secondImgData, 'PNG', 10, pageHeight / 2 + 10, 190, 0);
                }

                // Add a new page only if there are more receipts to process
                if (index + 2 < selectedReceipt.length) {
                    pdf.addPage();
                }
            }
        }

        pdf.save('Receipts.pdf');

        // Save receipt data to the database
        try {
            const response = await fetch('http://localhost:5000/api/save-receipt2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(receiptDataArray), // Send the whole array of receipt data
            });

            if (!response.ok) {
                throw new Error('Failed to save receipts');
            }

            setSaveMessage('Receipts saved successfully!'); // Show success message

            setTimeout(() => {
                setSaveMessage('');
            }, 5000);

        } catch (error) {
            console.error(error);
            setSaveMessage('Error saving receipts. Please try again.'); // Show error message
        } finally {
            setIsDownloading(false);  // Reset loading state to false after download is complete
        }
    };


    return (
        <div className='container mt-5'>
            <form onSubmit={handlePreview}>
                <div className="upload-files-container">
                    <div class="drag-file-area">
                        <span class="material-icons-outlined upload-icon">Only Upload Excel file</span>
                        <label class="label" style={{ display: 'block' }} >
                            <span class="browse-files">
                                <input type="file" class="default-file-input" accept=".xlsx, .xls" onChange={handleFileChange} required />
                                <span class="browse-files-text">browse file</span><span> from device</span>
                            </span>
                        </label>
                    </div>
                    <button type="submit" className='upload-button'>Load Data</button>
                </div>
            </form>

            {
                errorMessages.length > 0 && (
                    <div class="alert alert-danger alert-dismissible mt-4" style={{ justifyContent: 'space-between', width: '70%', padding: '1rem', margin: '0 auto', display:'flex' }}>
                        {errorMessages.map((msg, index) => (
                            <div style={{display:'inline-block'}} key={index}>{msg}</div>
                        ))}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" style={{ background: 'transparent', border: 'none' }}> ❌</button>
                    </div>

                )
            }

            {
                receiptDataArray.length > 0 && (
                    <div>
                        <h3 className='text-center mt-5 mb-4'>Receipts Data</h3>
                        <table className="table table-hover table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Receipt No</th>
                                    <th>Date</th>
                                    <th>Name</th>
                                    <th>Course</th>
                                    <th>Amount Paid</th>
                                    <th>Payment Mode</th>
                                    <th>File Name</th>
                                    <th>Preview Button</th>
                                </tr>
                            </thead>
                            <tbody>
                                {receiptDataArray.map((receipt, index) => (
                                    <tr key={index}>
                                        <td>{receipt.receiptNo}</td>
                                        <td>{receipt.date}</td>
                                        <td>{receipt.receivedFrom}</td>
                                        <td>{receipt.courseName}</td>
                                        <td>{receipt.totalCourseFees}</td>
                                        <td>{receipt.modofPayment}</td>
                                        <td>{receipt.excelFileName}</td>
                                        <td>
                                            <button
                                                className="btn btn-secondary"
                                                onClick={() => handleReceiptPreview(receipt)}>
                                                Preview Receipt
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="btn btn-primary" onClick={handleBulkPreview}>
                            Preview All Receipts
                        </button>
                    </div>
                )
            }

            {/* Modal for Preview */}
            {showModal && selectedReceipt && (
                <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ background: '#00000069' }}>
                    <div className="modal-dialog modal-xl modal-dialog-scrollable" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Receipt Preview</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)} style={{ border: 'none', backgroundColor: 'transparent' }} >❌</button>
                            </div>
                            <div className="modal-body">
                                {Array.isArray(selectedReceipt) ? (
                                    selectedReceipt.map((receipt, index) => (
                                        <div key={index} id={`receipt-${index}`}>
                                            <Receipt receiptData={receipt} />
                                        </div>
                                    ))
                                ) : (
                                    <div id={`receipt-${selectedReceipt.receiptNo}`}>
                                        <Receipt receiptData={selectedReceipt} />
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                {saveMessage && (
                                    <div className="mt-2">
                                        <p className={saveMessage.includes('Error') ? 'text-danger' : 'text-success'}>
                                            {saveMessage}
                                        </p>
                                    </div>
                                )}
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={downloadPDF}
                                    disabled={isDownloading}  // Disable button while downloading
                                >
                                    {isDownloading ? "Please Wait..." : "Download and save data"}
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BulkReceiptGen;
