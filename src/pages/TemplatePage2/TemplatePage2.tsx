import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { memo, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Table, Text, TextSize } from 'shared/ui';

import classes from './TemplatePage2.module.scss';

interface TemplatePageProps {
    className?: string;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

const fetchUsers = async() => {
	return axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
};

const TemplatePage2 = (props: TemplatePageProps) => {
	const { className } = props;
	const [data, setData] = useState<User[]>([]);

	const tableColumns: ColumnDef<User, unknown>[] = [
		{
			accessorKey: 'id',
			header: 'ID',
			cell: props => props.getValue(),
			footer: props => props.column.id,
			enableSorting: true,
			enableColumnFilter: false,
		},
		{
			accessorFn: row => row.name,
			id: 'name',
			header: 'First Name',
			cell: props => props.getValue(),
			footer: props => props.column.id
		},
		{
			accessorFn: row => row.username,
			id: 'username',
			header: 'Full Name',
			cell: props => props.getValue(),
			footer: props => props.column.id
		},
		{
			accessorFn: row => row.email,
			id: 'email',
			header: 'Email',
			cell: props => props.getValue(),
			footer: props => props.column.id
		},
		{
			accessorFn: row => row.phone,
			id: 'phone',
			header: 'Phone',
			cell: props => props.getValue(),
			footer: props => props.column.id
		},
		{
			accessorFn: row => row.website,
			id: 'website',
			header: 'Web Site',
			cell: props => props.getValue(),
			footer: props => props.column.id
		},
	];


	useEffect(() => {
		fetchUsers().then(({ data }) => setData([...data, ...data, ...data, ...data, ...data]));
	}, []);

	return (
		<div className={classNames(classes.TemplatePage2, {}, [className])}>
			<Text size={TextSize.LARGE}>Тестовая страница 2!!!</Text>
			<Table tableData={data} tableColumns={tableColumns}/>
		</div>
	);
};

export default memo(TemplatePage2);
