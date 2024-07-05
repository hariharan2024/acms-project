import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import axios from 'axios';
import DateSearch from '../components/datesearch';

const StaffPieChart = () => {
    const [staff, setStaff] = useState([]);
    const [filteredStaff, setFilteredStaff] = useState([]);
    
    useEffect(() => {
        const fetchStaffData = async () => {
            try {
                const response = await axios.get('/api/staff');
                setStaff(response.data);
                setFilteredStaff(response.data);
            } catch (error) {
                console.error('Error fetching staff data:', error);
            }
        };

        fetchStaffData();
    }, []);

    const extractRoleData = () => {
        const roleData = {};

        filteredStaff.filter(member => member.date).forEach(member => {
            const name = member.name;
            if (roleData[name]) {
                roleData[name]++;
            } else {
                roleData[name] = 1;
            }
        });

        return roleData;
    };

    const roleData = extractRoleData();
    const data = Object.entries(roleData).map(([name, count]) => ({ name, count }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Example colors for the pie chart

    return (
        <div style={{ backgroundColor: 'black', padding: '20px', borderRadius: '10px' }}>
            <div style={{padding: '20px',fontSize: '20px', marginTop: '20px' , textAlign: 'center',backgroundColor:"green", color:"white"}}>Staff Roles Distribution</div>
         
            <PieChart width={400} height={400}>
                <Pie
                    dataKey="count"
                    nameKey="name"
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

export default StaffPieChart;

