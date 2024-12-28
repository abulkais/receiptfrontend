import React from 'react'

const Receipt = () => {
    return (
        <>
            <section className='receipt_sec'>
                <div className="container">
                    <div className="receipt_header">
                        <img loading="lazy" data-src="https://kvch.in/assets-new/img/website-logo.webp" src="https://kvch.in/nigeria/assets-new/img/logo.webp" alt="" />
                        <h1>TAX RECEIPT/INVOICE</h1>
                    </div>
                    <div className='border_line'></div>
                    <h2>Receipt No: KVT/23-24/69 | Date: 25<sup>th</sup> May 2023</h2>

                    <div className="receipt_body">
                        <table style={{ tableLayout: "fixed", width: "100%", padding: 5 }}>
                            <tbody>
                                <tr>
                                    <td>Received from</td>
                                    <td
                                        width="90%"
                                        style={{
                                            fontSize: "large",
                                            fontWeight: "bold",
                                            borderBottom: "1px solid black"
                                        }}>
                                        Deepak Verma
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table style={{ tableLayout: "fixed", width: "100%", marginTop: '1.3rem' }}>
                            <tbody>
                                <tr>
                                    <td>An amount of Rupees</td>
                                    <td
                                        width="75%"
                                        style={{
                                            fontSize: "large",
                                            fontWeight: "bold",
                                            borderBottom: "1px solid black"
                                        }}>
                                        Five Thousand Only
                                    </td>
                                    <td width="10%">vide</td>
                                </tr>
                            </tbody>
                        </table>

                        <table style={{ tableLayout: "fixed", width: "100%", marginTop: '1.3rem' }}>
                            <tbody>
                                <tr>
                                    <td className='d-flex'>
                                        <input style={{ width: '30px', height: 'auto' }} type="checkbox" name="" id="" /> <label style={{ marginBottom: '.2rem', marginRight: '.5rem' }} htmlFor="">Cash</label>
                                        <input style={{ width: '30px', height: 'auto' }} type="checkbox" name="" id="" /> <label style={{ marginBottom: '.2rem', marginRight: '.5rem' }} htmlFor="">UPI / BT</label>
                                        <input style={{ width: '30px', height: 'auto' }} type="checkbox" name="" id="" /> <label style={{ marginBottom: '.2rem', marginRight: '.5rem' }} htmlFor=""> Pay-U</label>
                                        <input style={{ width: '30px', height: 'auto' }} type="checkbox" name="" id="" /> <label style={{ marginBottom: '.2rem', marginRight: '1rem' }} htmlFor="">CC</label>


                                        DD/ Bankers Cheque No.*
                                        <td
                                            width="20%"
                                            style={{
                                                fontSize: "large",
                                                fontWeight: "bold",
                                                borderBottom: "1px dotted black",
                                                marginLeft: '1rem',
                                                marginRight: '1rem'
                                            }}
                                            className=""
                                        >
                                            903893434904
                                        </td>
                                        Drawn
                                        <td
                                            width="15%"
                                            style={{
                                                fontSize: "large",
                                                fontWeight: "bold",
                                                borderBottom: "1px dotted black",
                                                marginLeft: '1rem'
                                            }}
                                            className=""
                                        >
                                            903893434904
                                        </td>
                                    </td>


                                </tr>
                            </tbody>
                        </table>
                        <table style={{ tableLayout: "fixed", width: "100%", marginTop: '1.3rem' }}>
                            <tbody>
                                <tr className='d-flex' style={{ justifyContent: 'space-between' }}>

                                    on
                                    <td
                                        width="15%"
                                        style={{
                                            fontSize: "large",
                                            fontWeight: "bold",
                                            borderBottom: "1px dotted black",

                                        }}
                                    >

                                    </td>
                                    Dated
                                    <td
                                        width="15%"
                                        style={{
                                            fontSize: "large",
                                            fontWeight: "bold",
                                            borderBottom: "1px dotted black",

                                        }}

                                    >
                                        17-09-2024
                                    </td>
                                    Towards
                                    <input style={{ width: '30px', height: 'auto' }} type="checkbox" name="" id="" /> <label style={{ marginBottom: '.2rem', marginRight: '.5rem' }} htmlFor="">Registration</label>
                                    <input style={{ width: '30px', height: 'auto' }} type="checkbox" name="" id="" /> <label style={{ marginBottom: '.2rem', marginRight: '.5rem' }} htmlFor="">Full</label>
                                    <input style={{ width: '30px', height: 'auto' }} type="checkbox" name="" id="" /> <label style={{ marginBottom: '.2rem', marginRight: '.5rem' }} htmlFor="">Instalment Fee</label>
                                    <input style={{ width: '30px', height: 'auto' }} type="checkbox" name="" id="" /> <label style={{ marginBottom: '.2rem' }} htmlFor="">Fine</label>
                                    <td
                                        width="10%"
                                        style={{
                                            fontSize: "large",
                                            fontWeight: "bold",
                                            borderBottom: "1px dotted black"
                                        }} >
                                        1000
                                    </td>
                                </tr>
                                <tr>
                                    <p style={{ marginTop: '1rem', marginBottom: '0' }}>Bank Draft/Cheque in favour of KV Computer Home Pvt. Ltd.</p>
                                </tr>

                            </tbody>


                        </table>


                        <table style={{ tableLayout: "fixed", width: "100%", marginTop: '1.3rem' }}>
                            <tbody>
                                <div className='row align-items-center'>
                                    <div className="col-lg-2">
                                        <td
                                            style={{
                                                fontSize: "large",
                                                fontWeight: "bold",
                                                border: "1px solid black",
                                                height: '70px',
                                                width: '140px',
                                                textAlign: 'center'
                                            }}>
                                            <p style={{ marginTop: '1.3rem' }}>₹ 5000</p>
                                        </td>
                                    </div>

                                    <div className="col-lg-5">

                                        <tr> Course Fees
                                            <td
                                                style={{
                                                    width: '300px',
                                                    fontSize: "large",
                                                    fontWeight: "bold",
                                                    borderBottom: "1px solid black"
                                                }}>
                                                ₹ 4237/-
                                            </td>
                                        </tr>

                                        <tr> CGST@9%
                                            <td
                                                style={{
                                                    width: '300px',
                                                    fontSize: "large",
                                                    fontWeight: "bold",
                                                    borderBottom: "1px solid black"
                                                }}>
                                                ₹ 381.50/-
                                            </td>
                                        </tr>
                                        <tr> SGST@9%
                                            <td
                                                style={{
                                                    width: '300px',
                                                    fontSize: "large",
                                                    fontWeight: "bold",
                                                    borderBottom: "1px solid black"
                                                }}>
                                                ₹ 381.50/-
                                            </td>
                                        </tr>


                                    </div>
                                    <div className="col-lg-4">
                                        <div style={{ float: 'right' }}>
                                            <p style={{ marginBottom: '0px' }}>For K V Computer Home Pvt Ltd</p>
                                            <img src="https://i.ibb.co/pxNJ47k/kvch-stamp.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </tbody>
                        </table>
                        <p style={{ marginBottom: '0px' }}> TOTAL VALUE (IN FIGURE): <strong> 5000/-</strong> </p>
                        <p>  TOTAL VALUE (IN WORDS): <strong> Five Thousand Only</strong> </p>
                        <p style={{ textAlign: 'center', fontSize: '11px', fontWeight: '600', marginBottom:'5px' ,marginTop:'3rem' }}>GSTIN # : 09AAACK1111B1ZE, PAN # : AAACK1111B, CIN : U74899DL1991PTC044952 State Code - 09 U.P (NOIDA)</p>
                        <p style={{ textAlign: 'center', fontSize: '11px', fontWeight: '600' }}> Address: C-109, Sector-2, Noida, U.P-201301 Contact at : Ph. 9510 860 860 | *Fee once paid will not be refunded under any circumstances.</p>
                    </div>
                </div>



            </section>
        </>
    )
}

export default Receipt