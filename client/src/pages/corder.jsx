import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authcontext";

const OrderHistoryTable = () => {
    const [orders, setOrders] = useState([]);
    const [sortBy, setSortBy] = useState(""); // State to store the column to sort by
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser?.email) { // Check if currentUser and currentUser.email are both truthy
            axios
                .get("/api/getord/" + currentUser.email)
                .then((res) => {
                    setOrders(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [currentUser]); // useEffect depends on currentUser

    const renderProductInfo = (pname, key) => {
        try {
            if (!pname) return <div>No items</div>;

            const products = JSON.parse(pname);
            return products.map((item, index) => <div key={index}>{item[key]}</div>);
        } catch (error) {
            console.error("Error parsing product info:", error);
            return <div>Error parsing product info</div>;
        }
    };

    const calculateTotalRate = (pname) => {
        try {
            if (!pname) return 0;
            const products = JSON.parse(pname);
            return products.reduce((acc, curr) => acc + parseFloat(curr.rate), 0);
        } catch (error) {
            console.error("Error calculating total rate:", error);
            return 0;
        }
    };

    // Function to sort orders based on the selected column
    const sortOrders = (column) => {
        const sortedOrders = [...orders];
        sortedOrders.sort((a, b) => {
            if (a[column] < b[column]) return -1;
            if (a[column] > b[column]) return 1;
            return 0;
        });
        setOrders(sortedOrders);
        setSortBy(column);
    };

    const shareOnInstagram= (order) => {
        const url = "https://www.instagram.com/direct/t/asset/?" +
            `media_id=${encodeURIComponent(order.pname)}` +
            "&recipient_users=%5B%5D" +
            "&recipient_threads=%5B%5D";
        window.location.href = url;
    }

    return (
        <>
            <br />
            <br />
            <br />
            <table>
                <thead>
                    <tr>
                        <th onClick={() => sortOrders("order_date")}>Order Date{sortBy === "order_date" && " ▼"}</th>
                        <th>Product Name</th>
                        <th>Rate</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>token</th>
                        <th onClick={() => sortOrders("total_rate")}>Total Rate{sortBy === "total_rate" && " ▼"}</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order.order_id}>
                            <td>{order.order_date}</td>
                            <td>{renderProductInfo(order.pname, "product_name")}</td>
                            <td>{renderProductInfo(order.pname, "rate")}</td>
                            <td>{currentUser?.email}</td> {/* Access email property safely */}
                            <td>{order.phone}</td>
                            <td>{order.token}</td>
                            <td>{calculateTotalRate(order.pname)}</td>
                            <td>{order.status === 1 ? "Supplied" : "Pending"}</td>
                            <td><button onClick={() => shareOnInstagram(order)}>Share on Instagram</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default OrderHistoryTable;

