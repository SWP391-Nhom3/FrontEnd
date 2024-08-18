import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
// import { fetchAllUsers } from '../../data/api';
import { Button, Input, Table } from 'antd';
import { Card } from 'primereact/card';
import Loading from '../../components/Loading';

const Customers = () => {
    const [Users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);

    const { Search } = Input;
    const formatDate = (dateString) => {
        return dateString ? format(new Date(dateString), 'dd-MM-yyyy') : "Chưa có thông tin";
    };
    //!! FETCH ALL USER !!
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             const result = JSON.parse(localStorage.getItem("result"));
    //             const res = await fetchAllUsers(result);
    //             const formattedUsers = res.data.users.map(user => ({
    //                 ...user,
    //                 full_name: user.full_name || "Chưa có thông tin",
    //                 date_of_birth: formatDate(user.date_of_birth),
    //                 phone: user.phone || "Chưa có thông tin",
    //                 address: user.address || "Chưa có thông tin"
    //             }));

    //             setUsers(formattedUsers);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error("Error fetching users:", error);
    //         }
    //     };
    //     fetchUsers();
    // }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '15%',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'full_name',
            key: 'full_name',
            ellipsis: true,
            width: '22%',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.full_name.localeCompare(b.full_name),
        },
        // {
        //     title: 'Ngày sinh',
        //     dataIndex: 'date_of_birth',
        //     key: 'date_of_birth',
        //     ellipsis: true,
        //     width: '10%',
        //     sorter: (a, b) => new Date(a.date_of_birth) - new Date(b.date_of_birth),
        // },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            ellipsis: true,
            width: '10%',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            ellipsis: true,
            width: '20%',
            render: text => <div style={{whiteSpace: 'normal', wordBreak: 'break-word'}}>{text}</div>
        },
        {
            title: 'Điểm thành viên',
            dataIndex: 'member_ship',
            key: 'member_ship',
            width: '10%',
            render: (value) =>
                new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(value),
            sorter: (a, b) => a.member_ship - b.member_ship,
        },
    ];

    const onSearch = (value) => {
        setSearchText(value);
    };

    const filteredUsers = Users.filter(user =>
        user.full_name.toLowerCase().includes(searchText.toLowerCase()) &&
        user.role_name === "Member"
    );

    if (loading) {
        return <Loading />;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: 'auto' }}>
            <Card title="Tất cả khách hàng" subTitle="" footer="" header="" className="" style={{ width: '90%', height: 'auto', marginTop: '50px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                    <Search
                        placeholder="Nhập tên khách hàng"
                        allowClear
                        enterButton={<Button style={{ backgroundColor: '#55B6C3', color: 'white' }}>Tìm kiếm</Button>}
                        size="large"
                        onSearch={onSearch}
                        style={{ width: '40%' }}
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredUsers}
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: Users.filter(u => u.role_name === "Member").length,
                    }} scroll={{ x: '100%' }}
                    onChange={handleTableChange}
                    style={{ overflowX: 'auto', flexGrow: 1 }}
                    rowKey="email"
                />
            </Card>
        </div>
    );
};

export default Customers;
