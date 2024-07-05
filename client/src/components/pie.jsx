import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import axios from 'axios';
import DateSearch from '../components/datesearch';

const ProductSalesPieChart = () => {
    const [orders, setOrders] = useState([]);

    const [startDate, setStartDate] = useState(''); // Unused
    const [filterOrders, setfilterOrders] = useState([]);
    const [endDate, setEndDate] = useState(''); // Unused

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await axios.get('/api/getord');
                setOrders(response.data);
                setfilterOrders(response.data);
            } catch (error) {
                console.error('Error fetching order history:', error);
            }
        };

        fetchOrderHistory();

        // Cleanup function
        return () => {
            // Cleanup logic if needed
        };
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    const handleDateSearch = (startDate, endDate) => {
        const filtered = orders.filter(order => {
          const orderDate = new Date(order.order_date);
          return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
        });
        setfilterOrders(filtered);
      };
    

    const extractSalesData = (filterOrders) => {
        const salesData = {};

        filterOrders.forEach(order => {
            const products = JSON.parse(order.pname);
            products.forEach(product => {
                const productName = product.product_name;
                const rate = parseFloat(product.rate);
                if (salesData[productName]) {
                    salesData[productName] += rate;
                } else {
                    salesData[productName] = rate;
                }
            });
        });

        return salesData;
    };

    const salesData = extractSalesData(filterOrders);
    const data = Object.entries(salesData).map(([product, sales]) => ({ product, sales }));

    const totalRate = Object.values(salesData).reduce((acc, curr) => acc + curr, 0); // Calculate total rate

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Example colors for the pie chart

    return (
        <div style={{ backgroundColor: 'black', padding: '20px', borderRadius: '10px' }}>
            <DateSearch
                handleDateSearch={handleDateSearch} // Ignore the date search as it's not needed
                
            />

            <div style={{padding: '20px',fontSize: '20px', marginTop: '20px' , textAlign: 'center',backgroundColor:"green", color:"white"}}>Total revenue  rs: {totalRate}</div>
         
            <PieChart width={400} height={400}>
                <Pie
                    dataKey="sales"
                    nameKey="product"
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                >
                    {
                        data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))
                    }
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
            <br /><br /><br /> 
        </div>

    );
};

export default ProductSalesPieChart;

