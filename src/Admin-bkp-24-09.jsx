import React, { useState, useEffect, useRef } from 'react';
import Receipt from './Receipt'; // Import your Receipt component
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const Admin = () => {

    // Helper function to convert numbers to words
    const numberToWords = (num) => {
        const a = [
            '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
        ];
        const b = [
            '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
        ];

        const inWords = (n) => {
            if (n < 20) return a[n];
            const digit = n % 10;
            if (n < 100) return b[Math.floor(n / 10)] + (digit ? ` ${a[digit]}` : '');
            if (n < 1000) return a[Math.floor(n / 100)] + ' hundred' + (n % 100 === 0 ? '' : ` and ${inWords(n % 100)}`);
            return inWords(Math.floor(n / 1000)) + ' thousand' + (n % 1000 !== 0 ? ` ${inWords(n % 1000)}` : '');
        };

        return inWords(num);
    };


    const [receiptData, setReceiptData] = useState({
        receiptNo: '',
        date: '',
        receivedFrom: '',
        amountInWords: '',
        modofPayment: '',
        courseName: '',
        totalCourseFees: '',
        totalValue: '',
        courseFees: '',
        cgst: '',
        sgst: ''
    });

    const [receiptCounter, setReceiptCounter] = useState(2); // Start counter at 2
    const receiptRef = useRef();

    // Function to generate the receipt number
    const generateReceiptNumber = () => {
        const financialYear = '24-25'; // Assuming the financial year format
        const newReceiptNo = `KVT/${financialYear}/${receiptCounter}`;
        setReceiptCounter((prevCounter) => prevCounter + 1); // Increment counter for next receipt
        return newReceiptNo;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        
        setReceiptData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        const newReceiptNo = generateReceiptNumber();
        setReceiptData((prevData) => ({
            ...prevData,
            receiptNo: newReceiptNo
        }));
    }, []); // Empty dependency array to run on component mount only

    // Calculate course fees, CGST, and SGST based on totalCourseFees
    useEffect(() => {
        const totalCourseFees = parseFloat(receiptData.totalCourseFees) || 0;
        const gstRate = 0.18; // Total GST rate (18%)
        const cgstRate = 0.09; // CGST 9%
        const sgstRate = 0.09; // SGST 9%

        const courseFees = (totalCourseFees / (1 + gstRate)).toFixed(2); // Course Fees excluding GST
        const cgst = (courseFees * cgstRate).toFixed(2); // CGST
        const sgst = (courseFees * sgstRate).toFixed(2); // SGST
        const totalValue = (parseFloat(courseFees) + parseFloat(cgst) + parseFloat(sgst)).toFixed(2); // Verification total

        // Set the amount in words automatically when totalCourseFees is entered
        const amountInWords = numberToWords(Math.floor(totalCourseFees));

        setReceiptData((prevData) => ({
            ...prevData,
            courseFees,
            cgst,
            sgst,
            totalValue,
            amountInWords: amountInWords.charAt(0).toUpperCase() + amountInWords.slice(1), // Capitalize the first letter
        }));
    }, [receiptData.totalCourseFees]); // Run when totalCourseFees changes

    const areRequiredFieldsFilled = () => {
        return (
            receiptData.receiptNo &&
            receiptData.date &&
            receiptData.receivedFrom &&
            receiptData.amountInWords &&
            receiptData.courseFees
        );
    };

    const downloadReceipt = async () => {
        html2canvas(receiptRef.current).then(async (canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 190;
            const pageHeight = pdf.internal.pageSize.height;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            const receiptFilename = `${receiptData.receiptNo}.pdf`;
            pdf.save(receiptFilename);

            // Save receipt data to the database
            try {
                const response = await fetch('http://localhost:5000/api/save-receipt', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(receiptData),
                });

                if (!response.ok) {
                    throw new Error('Failed to save receipt');
                }
                alert('Receipt saved successfully!');
            } catch (error) {
                console.error(error);
                alert('Error saving receipt. Please try again.');
            }
        });
    };

    return (
        <div className="container">
            <h2 className='mb-4 mt-2' style={{textAlign:'center'}}>Generate Receipt</h2>
            <form>
                <div className="row">
                    <div className="col-lg-3">
                        <div className="mb-3">
                            <label htmlFor="Receipt No">Receipt No*</label>
                            <input type="text" className='form-control' name="receiptNo" placeholder="Receipt No" onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="mb-3">
                            <label htmlFor="Receipt Date">Receipt Date*</label>
                            <input type="date" className='form-control' name="date" onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <div className="mb-3">
                            <label htmlFor="Received From">Received From*</label>
                            <input type="text" className='form-control' name="receivedFrom" placeholder="Received From" onChange={handleChange} required style={{ textTransform: 'capitalize' }} />
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="mb-3">
                            <label htmlFor="Mode Of Payment">Mode of Payment*</label>
                            <input type="text" className='form-control' name="modofPayment" placeholder="Mode of Payment" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <div className="mb-3">
                            <label htmlFor="Course Name">Course Name*</label>
                            <input type="text" className='form-control' name="courseName" placeholder="Course Name" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="mb-3">
                            <label htmlFor="Total Course Fees">Total Course Fees*</label>
                            <input type="number" className='form-control' name="totalCourseFees" placeholder="Total Course Fees" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="mb-3">
                            <label htmlFor="Amount in Words">Amount in Words*</label>
                            <input type="text" className='form-control' name="amountInWords" placeholder="Amount in Words" value={receiptData.amountInWords} readOnly required disabled style={{ textTransform: 'capitalize' }} />
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <div className="mb-3">
                            <label htmlFor="Course Fees">Course Fees*</label>
                            <input type="text" className='form-control' name="courseFees" placeholder="Course Fees" value={receiptData.courseFees} readOnly disabled />
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <div className="mb-3">
                            <label htmlFor="CGST">CGST*</label>
                            <input type="text" className='form-control' name="cgst" placeholder="CGST" value={receiptData.cgst} readOnly disabled />
                        </div>
                    </div>


                    <div className="col-lg-3">
                        <div className="mb-3">
                            <label htmlFor="SGST">SGST*</label>
                            <input type="text" className='form-control' name="sgst" placeholder="CGST" value={receiptData.sgst} readOnly disabled />
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <div className="mb-3 mt-4">

                            <button type="button"
                                className='btn btn-danger w-100'
                                data-bs-toggle="modal"
                                data-bs-target="#myModal"
                                disabled={!areRequiredFieldsFilled()}
                            >
                                Preview Receipt
                            </button>
                        </div>
                    </div>
                </div>










            </form>

            {/* The Modal */}
            <div className="modal" id="myModal">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Receipt Preview</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" />
                        </div>
                        <div className="modal-body" ref={receiptRef}>
                            <Receipt receiptData={receiptData} />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={downloadReceipt}
                            >
                                Download & Save
                            </button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
