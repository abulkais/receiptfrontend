

import React, { useState, useEffect, useRef } from 'react';
import Receipt from './Receipt'; // Import your Receipt component
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Admin = () => {
    const [receiptData, setReceiptData] = useState({
        receiptNo: '',
        date: '',
        receivedFrom: '',
        amountInWords: '',
        paymentMethods: [
            { label: 'Cash', checked: false },
            { label: 'UPI / BT', checked: false },
            { label: 'Pay-U', checked: false },
            { label: 'CC', checked: false },
        ],
        chequeNo: '',
        drawn: '',
        onDate: '',
        towards: [
            { label: 'Registration', checked: false },
            { label: 'Full', checked: false },
            { label: 'Instalment Fee', checked: false },
            { label: 'Fine', checked: false },
        ],
        amount: '',
        bankDraftName: '',
        totalValue: '',
        courseFees: '',
        cgst: '',
        sgst: '',
        gstin: '09AAACK1111B1ZE',
        pan: 'AAACK1111B',
        cin: 'U74899DL1991PTC044952',
        stateCode: '09 U.P (NOIDA)',
        address: 'C-109, Sector-2, Noida, U.P-201301',
        contact: 'Ph. 9510 860 860'
    });

    // const receiptRef = useRef();

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

    useEffect(() => {
        const courseFees = parseFloat(receiptData.courseFees) || 0;
        const cgstRate = 0.09;
        const sgstRate = 0.09;

        const cgst = (courseFees * cgstRate).toFixed(2);
        const sgst = (courseFees * sgstRate).toFixed(2);
        const totalValue = (courseFees + parseFloat(cgst) + parseFloat(sgst)).toFixed(2);

        setReceiptData((prevData) => ({
            ...prevData,
            cgst,
            sgst,
            totalValue,
        }));
    }, [receiptData.courseFees]);

    const handleCheckboxChange = (index, type) => {
        const updatedList = receiptData[type].map((item, idx) => ({
            ...item,
            checked: idx === index ? !item.checked : false,
        }));

        setReceiptData((prevData) => ({
            ...prevData,
            [type]: updatedList,
        }));
    };

    const areRequiredFieldsFilled = () => {
        return (
            receiptData.receiptNo &&
            receiptData.date &&
            receiptData.receivedFrom &&
            receiptData.amountInWords &&
            receiptData.courseFees
        );
    };

    const downloadReceipt = () => {
        html2canvas(receiptRef.current).then((canvas) => {
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

            // pdf.save('receipt.pdf');
            const receiptFilename = `${receiptData.receiptNo}.pdf`;
            pdf.save(receiptFilename);
        });
    };

    return (
        <div className="container">
            <h2>Generate Receipt</h2>
            <form>
                <input type="text" name="receiptNo" placeholder="Receipt No" onChange={handleChange} required />
                {/* <input type="text" name="receiptNo" placeholder='Receipt No' value={receiptData.receiptNo} readOnly required /> */}
                <input type="date" name="date" onChange={handleChange} required />

                <input type="text" name="receivedFrom" placeholder="Received From" onChange={handleChange} required style={{ textTransform: 'capitalize' }} />
                <input type="text" name="amountInWords" placeholder="Amount in Words" onChange={handleChange} required style={{ textTransform: 'capitalize' }} />
                <input type="text" name="chequeNo" placeholder="Cheque No" onChange={handleChange} />
                <input type="text" name="drawn" placeholder="Drawn" onChange={handleChange} />
                <input type="date" name="onDate" onChange={handleChange} />
                <input type="text" name="bankDraftName" placeholder="Bank Draft Name" onChange={handleChange} />
                <input type="text" name="amount" placeholder="Fine" onChange={handleChange} />
                <input type="text" name="courseFees" placeholder="Course Fees" onChange={handleChange} required />
                <input type="text" name="cgst" placeholder="CGST" value={receiptData.cgst} readOnly disabled />
                <input type="text" name="sgst" placeholder="SGST" value={receiptData.sgst} readOnly disabled />
                <input type="text" name="totalValue" placeholder="Total Value" value={receiptData.totalValue} disabled readOnly />

                <h3>Payment Methods</h3>
                {receiptData.paymentMethods.map((method, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            checked={method.checked}
                            onChange={() => handleCheckboxChange(index, 'paymentMethods')}
                        />
                        {method.label}
                    </div>
                ))}

                <h3>Towards</h3>
                {receiptData.towards.map((toward, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            checked={toward.checked}
                            onChange={() => handleCheckboxChange(index, 'towards')}
                        />
                        {toward.label}
                    </div>
                ))}

                <button type="button" 
                    data-bs-toggle="modal" 
                    data-bs-target="#myModal" 
                    disabled={!areRequiredFieldsFilled()}
                >
                    Preview Receipt
                </button>
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
                                className="btn btn-danger" 
                                onClick={downloadReceipt}
                            >
                                Download
                            </button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;

