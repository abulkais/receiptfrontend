

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import Receipt from './Receipt'; // Adjust the import path as necessary

const BulkReceiptGen = () => {

    const [file, setFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [receiptDataArray, setReceiptDataArray] = useState([]); // Store receipt data for HTML rendering
    const [fileName, setFileName] = useState(''); // New state variable for the file name

    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0]; // Get the first file

        if (uploadedFile) {
            setFile(uploadedFile);
            setFileName(uploadedFile.name); // Only set the file name if uploadedFile is defined
        } else {
            console.error('No file uploaded');
        }
    };

    const excelDateToJSDate = (excelDate) => {
        // Convert Excel date to JavaScript date
        const jsDate = new Date((excelDate - (25567 + 2)) * 86400 * 1000);

        // Format the date as "DD/MMM/YYYY"
        const formattedDate = jsDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short', // Use 'numeric' if you want the month as a number
            year: 'numeric',
        });

        return formattedDate;
    };

    // Example usage
    const excelDate = 44923; // Example Excel date
    console.log(excelDateToJSDate(excelDate)); // Outputs: "01/Jan/2024"

    const generateReceipts = async (jsonData) => {
        return jsonData.map((row) => {
            const totalCourseFees = parseFloat(row['Amount Paid']) || 0;
            const courseFees = (totalCourseFees / 1.18).toFixed(2);
            const cgst = (courseFees * 0.09).toFixed(2);
            const sgst = (courseFees * 0.09).toFixed(2);
            const formattedDate = row['Date'] ? excelDateToJSDate(row['Date']) : '';

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
                excelFileName: fileName, // Include the file name in the receipt data
            };

            return receiptData;
        });
    };

    const handlePreview = async (event) => {
        event.preventDefault();
        if (!file) return;

        const fileReader = new FileReader();
        fileReader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet);

            const receipts = await generateReceipts(jsonData);
            setReceiptDataArray(receipts);
            setShowModal(true);
        };

        fileReader.readAsArrayBuffer(file);
    };

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


    const downloadPDF = async () => {
        const pdf = new jsPDF();
        const pageHeight = pdf.internal.pageSize.getHeight();

        for (let index = 0; index < receiptDataArray.length; index += 2) {
            const firstReceiptElement = document.getElementById(`receipt-${index}`);

            // Use await to ensure that the canvas is generated before proceeding
            const firstCanvas = await html2canvas(firstReceiptElement);
            const firstImgData = firstCanvas.toDataURL('image/png');

            // Add the first receipt
            pdf.addImage(firstImgData, 'PNG', 10, 10, 190, 0);

            // Check if there is a second receipt for the current page
            if (index + 1 < receiptDataArray.length) {
                const secondReceiptElement = document.getElementById(`receipt-${index + 1}`);
                const secondCanvas = await html2canvas(secondReceiptElement);
                const secondImgData = secondCanvas.toDataURL('image/png');

                // Add the second receipt below the first one
                pdf.addImage(secondImgData, 'PNG', 10, pageHeight / 2 + 10, 190, 0);
            }

            // Add a new page only if there are more receipts to process
            if (index + 2 < receiptDataArray.length) {
                pdf.addPage();
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
            alert('Receipts saved successfully!');
        } catch (error) {
            console.error(error);
            alert('Error saving receipts. Please try again.');
        }
    };

    return (
        <>
            <div className='container'>
                <h1>Bulk Receipt Generator</h1>
                <form onSubmit={handlePreview}>
                    <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} required />
                    <button type="submit" className="btn btn-primary" data-bs-toggle="modal"
                        data-bs-target="#bulkReceipt">Preview Receipts</button>
                </form>

                {/* Modal */}
                <div className="modal" id="bulkReceipt">
                    <div className="modal-dialog modal-xl modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Receipt Preview</h5>

                            </div>
                            <div className="modal-body">
                                {receiptDataArray.map((receiptData, index) => (
                                    <div id={`receipt-${index}`} key={index} className="receipt-preview">
                                        <Receipt receiptData={receiptData} />
                                    </div>
                                ))}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={downloadPDF}>Download PDF</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BulkReceiptGen;

