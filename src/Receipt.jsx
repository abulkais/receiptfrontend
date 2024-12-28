

import React from 'react';
import stamp from '../src/kvch-stamp.png';
import logo from '../src/kvch-logo.png';

const Receipt = ({ receiptData }) => {
    const formattedDate = new Date(receiptData.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
    return (
        <section className='receipt_sec'>
            <div className="container">
                <div className="receipt_header">
                    <img loading="lazy"
                        src={logo}
                        alt="Company Logo" crossOrigin="Anonymous" />
                    <h1>TAX RECEIPT/INVOICE</h1>
                </div>
                <div className='border_line'></div>
                <h2>Receipt No: {receiptData.receiptNo} | Date: {formattedDate}</h2>

                <div className="receipt_body">
                    <table className='table1'>
                        <tbody>
                            <tr>
                                <td>Received from</td>
                                <td className='table1td'>{receiptData.receivedFrom}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className='table2'>
                        <tbody>
                            <tr>
                                <td>Mode of Payment</td>
                                <td className='table2td'>{receiptData.modofPayment}</td>
                                <td style={{ textAlign: 'center' }}>Course Name</td>
                                <td className='table2td2'>{receiptData.courseName}</td>
                            </tr>
                        </tbody>
                    </table>

                    <table className='table4'>
                        <tbody>

                            <tr>
                                <p className='para1'>Bank Draft/Cheque in favour of KV Computer Home Pvt. Ltd.</p>
                            </tr>
                        </tbody>
                    </table>



                    <table className='table5'>
                        <tbody>
                            <tr>
                                <div className='row align-items-center'>
                                    <div className="col-lg-2">
                                        <td className='table5td1'>
                                            <p>₹ {receiptData.totalCourseFees} /-</p>
                                        </td>
                                    </div>
                                    <div className="col-lg-5">
                                        <tr> Course Fees
                                            <td className='table5td2'>₹ {receiptData.courseFees} /-</td>
                                        </tr>
                                        <tr> CGST@9%
                                            <td className='table5td3'>₹ {receiptData.cgst} /-</td>
                                        </tr>
                                        <tr> SGST@9%
                                            <td className='table5td4'>₹ {receiptData.sgst} /-</td>
                                        </tr>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className='stampImgdiv'>
                                            <p>For K V Computer Home Pvt Ltd</p>
                                            <img src={stamp} crossOrigin="Anonymous" alt="Stamp" />
                                        </div>
                                    </div>
                                </div>
                            </tr>
                        </tbody>
                    </table>
                    <p className='para2'> TOTAL VALUE (IN FIGURE): <strong> ₹ {receiptData.totalCourseFees}/-</strong> </p>
                    <p className='para5'> TOTAL VALUE (IN WORDS): <strong> ₹ {receiptData.amountInWords} Only</strong> </p>

                    {/* Static Information */}
                    <p className='para3'>
                        GSTIN # : 09AAACK1111B1ZE, PAN # : AAACK1111B, CIN : U74899DL1991PTC044952 State Code - 09 U.P (NOIDA)
                    </p>
                    <p className='para4'>
                        Address: C-109, Sector-2, Noida, U.P-201301 Contact at : Ph. 9510 860 860 | *Fee once paid will not be refunded under any circumstances.
                    </p>

                </div>
            </div>
        </section>
    );
};

export default Receipt;
