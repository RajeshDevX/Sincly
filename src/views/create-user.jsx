import * as React from 'react';
import ReusableStickyTable from '../components/table';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';

const columns = [
  { key: 'name', label: 'Name', width: 180 },
  { key: 'email', label: 'Email', width: 250 },
  { key: 'roles', label: 'Roles', width: 180 },
  { key: 'manager', label: 'Manager', width: 180 },
];

const allUsers = [
  { id: 'u1', name: 'Rajesh Kumar', email: 'rajesh.kumar@example.com', roles: 'Admin', manager: 'Priya Verma' },
  { id: 'u2', name: 'Anita Sharma', email: 'anita.sharma@example.com', roles: 'Editor', manager: 'Rajesh Kumar' },
  { id: 'u3', name: 'Ravi Mehta', email: 'ravi.mehta@example.com', roles: 'Viewer', manager: 'Anita Sharma' },
  { id: 'u4', name: 'Priya Verma', email: 'priya.verma@example.com', roles: 'Manager', manager: '—' },
  { id: 'u5', name: 'Sumit Roy', email: 'sumit.roy@example.com', roles: 'Editor', manager: 'Priya Verma' },
    { id: 'u6', name: 'Rajesh Kumar', email: 'rajesh.kumar@example.com', roles: 'Admin', manager: 'Priya Verma' },
  { id: 'u7', name: 'Anita Sharma', email: 'anita.sharma@example.com', roles: 'Editor', manager: 'Rajesh Kumar' },
  { id: 'u8', name: 'Ravi Mehta', email: 'ravi.mehta@example.com', roles: 'Viewer', manager: 'Anita Sharma' },
  { id: 'u9', name: 'Priya Verma', email: 'priya.verma@example.com', roles: 'Manager', manager: '—' },
  { id: 'u10', name: 'Sumit Roy', email: 'sumit.roy@example.com', roles: 'Editor', manager: 'Priya Verma' },
];

export default function UserTable() {
  const [search, setSearch] = React.useState('');
  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(1);

  const filteredUsers = allUsers.filter((user) =>
    [user.name, user.email, user.roles]
      .some((field) => field.toLowerCase().includes(search.toLowerCase()))
  );

  const totalRows = filteredUsers.length;
  const paginatedUsers = filteredUsers.slice((page - 1) * pageSize, page * pageSize);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setPage(1);
  };

  const renderActions = (user) => (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button size="sm" variant="plain" sx={{ px: 1.5, fontWeight: 500 }}>
        Edit
      </Button>
      <Button
        size="sm"
        variant="soft"
        sx={{
          color: '#7f1d1d',
          backgroundColor: '#fee2e2',
          fontWeight: 600,
          borderRadius: '9999px',
          px: 2,
          '&:hover': { backgroundColor: '#fecaca' },
        }}
      >
        Delete
      </Button>
    </Box>
  );

  return (
    <Box sx={{ p: 2 }}>
  {/* Section heading and Create button */}
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
    <Typography level="h4" fontWeight="lg">
      User Management Section
    </Typography>
    <Button
      variant="soft"
      sx={{
        backgroundColor: '#818cf8', // same color as "Add todo"
        color: 'white',
        fontWeight: '500',
        borderRadius: 'md',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#6366f1',
        },
      }}
    >
      Create User
    </Button>
  </Box>

  {/* Search bar */}
  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
    <Input
      placeholder="Search user..."
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setPage(1);
      }}
      sx={{ width: 300 }}
    />
  </Box>


      {/* Table with pagination controls passed in */}
      <ReusableStickyTable
        columns={columns}
        rows={paginatedUsers}
        renderActions={renderActions}
        page={page}
        pageSize={pageSize}
        totalRows={totalRows}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </Box>
  );
}
