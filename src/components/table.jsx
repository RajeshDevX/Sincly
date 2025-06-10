import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

export default function ReusableStickyTable({ columns, rows, renderActions }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const totalPages = Math.ceil(rows.length / pageSize);
  const paginatedRows = rows.slice((page - 1) * pageSize, page * pageSize);

  const handlePageChange = (_e, newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (_e, value) => {
    setPageSize(Number(value));
    setPage(1); // Reset to first page on page size change
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Sheet
        variant="outlined"
        sx={{
          '--TableCell-height': '40px',
          '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
          '--Table-firstColumnWidth': '80px',
          '--Table-lastColumnWidth': '144px',
          '--TableRow-stripeBackground': 'rgba(0, 0, 0, 0.03)',
          '--TableRow-hoverBackground': 'rgba(0, 0, 0, 0.08)',
          overflow: 'auto',
          backgroundColor: 'var(--card-color)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-color)',
        }}
      >
        <Table
          borderAxis="bothBetween"
          stripe="odd"
          hoverRow
          sx={{
            backgroundColor: 'var(--card-color)',
            color: 'var(--text-color)',
            '& thead': {
              backgroundColor: 'var(--table-header-bg)',
            },
            '& thead th': {
              borderBottom: '1px solid var(--border-color)',
              color: 'var(--table-header-text)',
              fontWeight: 600,
              fontSize: 14,
            },
            '& td': {
              borderColor: 'var(--border-color)',
              color: 'var(--text-color)',
            },
            '& tr:hover': {
              backgroundColor: 'var(--hover-color)',
            },
            '& tr > *:first-child': {
              position: 'sticky',
              left: 0,
              boxShadow: '1px 0 var(--border-color)',
              backgroundColor: 'var(--card-color)',
              color: 'var(--text-color)',
            },
            '& tr > *:last-child': {
              position: 'sticky',
              right: 0,
              backgroundColor: 'var(--card-color)',
              color: 'var(--text-color)',
            },
          }}
        >
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} style={{ width: col.width }}>
                  {col.label}
                </th>
              ))}
              <th style={{ width: 'var(--Table-lastColumnWidth)' }} />
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row, index) => (
              <tr key={row.id || index}>
                {columns.map((col) => (
                  <td key={col.key}>{row[col.key]}</td>
                ))}
                <td>{renderActions(row)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>

      {/* Pagination Controls */}
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 1,
        }}
      >
        {/* Page size dropdown */}
        <Box>
          <Select
            size="sm"
            value={pageSize}
            onChange={handlePageSizeChange}
            variant="soft"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <Option key={size} value={size}>
                Show {size}
              </Option>
            ))}
          </Select>
        </Box>

        {/* Pagination component */}
        <Stack spacing={2} direction="row">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="small"
            shape="rounded"
          />
        </Stack>
      </Box>
    </Box>
  );
}
