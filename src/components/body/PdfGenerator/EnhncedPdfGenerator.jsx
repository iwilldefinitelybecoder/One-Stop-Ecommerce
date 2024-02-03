import React, { useEffect, useRef, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Image, BlobProvider, PDFDownloadLink, Font } from "@react-pdf/renderer";
import { logoIcon } from '../../../assets/icons/png/toolbar1/data';
import { wrap } from 'retry';
import useAddresses from '../../../CustomHooks/AddressHooks';
import useCard from '../../../CustomHooks/CardsHooks';
import { formatOrderedDate } from '../../../utils/DisplayFormatters';

Font.register({ family: 'Arial', src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf', });

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Arial',
        padding: 20,

    },
    bodyRow:
    {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
    ,
    header: {
        backgroundColor: '#e94560',
        padding: '10px',
        marginBottom: '20px',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    subHeader: {
        fontSize: 20,
        marginBottom: 5,
        color: '#114175',
    },
    itemizedTable: {
        width: '100%',
        margin: '10px 0',
        border: '1px solid #ddd',
    },
    tableHeader: {
        backgroundColor: '#f2f2f2',
        padding: '8px',
        borderBottom: '1px solid #ddd',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tableRow: {
        padding: '8px',
        borderBottom: '1px solid #ddd',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bold: {
        fontWeight: 'bold',
    },
    logo: {
        width: 150,
        height: 40,
        marginRight: '10px',
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: 'row',
        flexWrap: "wrap",
        textAlign: "center",
        justifyContent: 'center',
        fontSize: 10,
        color: '#fff',
        backgroundColor: '#114175',
        padding: '10px',
    },
    section: {
        margin: 10,
        lineHeight: 1.5,
    },
    section2:{
        margin: 10,
        lineHeight: 1.5,
        width: "200px",
        flexWrap: "wrap",
    }
});

const EnhancedInvoiceGenerator = ({ generatePdfRef, orderDetails }) => {
    const downloadPdfRef = useRef(null);
    const [download, setDownload] = useState();
    const [orderDetail, setOrderDetail] = useState(orderDetails);
    const [card, setCard] = useState();
    const [address, setAddress] = useState();
    const { getAddresses } = useAddresses();
    const { getCard } = useCard();
    const [loading, setLoading] = useState(false);
    const items = [
        { name: 'Product A', price: '$50', quantity: 5 },
        { name: 'Product B', price: '$30', quantity: 10 },
        // Add more items as needed
    ];

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const response = await getAddresses(orderDetail?.shippingAddressId);
            setAddress(response)
            const response1 = await getCard(orderDetail?.paymentId)
            setCard(response1)
            setLoading(false)
        }
        fetchData();

    }, [orderDetail])

    useEffect(() => {
        setOrderDetail(orderDetails)
    }, [orderDetails])
    const total = items.reduce((acc, item) => acc + parseFloat(item.price.replace('$', '')), 0);
    const PdfElement = (
        (


            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        {/* Add your logo image here */}

                        <Text style={styles.headerText}>One Stop - A Ecommerce Copmany</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.header}>Detailed Invoice</Text>
                        <Text>Order ID: {orderDetail?.generatedOrderId}</Text>
                        <Text>Date: {formatOrderedDate(orderDetail?.orderDate)}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.subHeader}>Itemized List:</Text>
                        <View style={styles.itemizedTable}>
                            <View style={styles.tableHeader}>
                                <Text style={styles.bold}>Product Name</Text>
                                <Text style={styles.bold}>Quantity</Text>
                                <Text style={styles.bold}>Price</Text>
                            </View>
                            {orderDetail?.productId?.map((product, index) => (
                                <View style={styles.tableRow} key={index}>
                                    <Text>{product?.name}</Text>
                                    <Text>{product?.quantity}</Text>
                                    <Text>{product?.totalPrice}</Text>
                                </View>
                            ))}
    
                            <View style={styles.tableRow}>
                                <Text style={styles.bold}>Shipping Charges</Text>
                                <Text style={styles.bold}>{orderDetail?.orderSummary?.shippingTotal}</Text>


                            </View>

                            <View style={styles.tableRow}>
                                <Text style={styles.bold}>Tax</Text>
                                <Text style={styles.bold}>{orderDetail?.orderSummary?.taxTotal}</Text>


                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.bold}>Total</Text>

                                <Text style={styles.bold}>{`${orderDetail?.orderSummary?.grandTotal?.toFixed(2)}`}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bodyRow}>
                        <View style={styles.section2}>
                            {
                                orderDetail?.paymentId !== null ?
                                <>
                            <Text style={styles.subHeader}>Payment Information:</Text>
                            <Text>Card Name: {card?.cardHolderName}</Text>
                            <Text>Card Type: {card?.cardType}</Text>
                            <Text>{card?.cardNumber}</Text>
                            <Text>Expiration Date: {card?.expireDate}</Text>
                            </>
                                :
                                <>
                                 
                                <Text style={styles.subHeader}>Payment Information:</Text>
                                 <Text>Payment Method: Cash On Delivery</Text>
                                </>
                                

                        }
                        </View>
                        <View style={styles.section2} >
                            <Text style={styles.subHeader}>Shipping Address:</Text>
                            <Text>{address?.name}</Text>
                            <Text>{address?.locality}</Text>
                            <Text>{address?.area}</Text>
                            <Text>{address?.city}</Text>
                            <Text>{address?.phone}</Text>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        {/* Company info in the footer */}
                        <Text>One Stop - A Ecommerce Company{'\n'}
                            70 Washington Square South, New York, NY 10012, United States
                            Email: uilib.help@gmail.com
                            Phone: +1 1123 456 780</Text>
                    </View>
                </Page>
            </Document>

        )
    );



    return (
        <div>
            {
                loading ?
                    <span>Loading...</span>
                    :
                    <PDFDownloadLink document={PdfElement} fileName='Order_Invoice' >
                        {({ blob, url, loading, error }) => {
                            if (loading) {
                                console.log('Loading document...');
                                return <span>Loading...</span>; // or show a loading indicator
                            }

                            if (error) {
                                console.error('Error generating PDF:', error);
                                return <span>Error generating PDF</span>; // or show an error message
                            }

                            // This link will not be rendered, but its ref will be used for programmatically triggering the click event
                            return <button >Download Invoice</button>;
                        }}
                    </PDFDownloadLink>
            }
        </div>
    );

};

export default EnhancedInvoiceGenerator;
