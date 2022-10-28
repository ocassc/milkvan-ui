import React, { useState } from 'react'
import { useTable, usePagination, useExpanded } from 'react-table'
import { ConfigProvider } from 'antd'
import locale from 'antd/es/date-picker/locale/en_US'
import { Alert } from 'antd'

export const ReactTable = ({ columns, data, allowSearch, allowPaging, pageOptions, searchAction, pageChange }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data, initialState: { pageIndex: 2 } }, useExpanded, usePagination)

  const [tempSearch, setTempSearch] = useState('')
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      searchAction(tempSearch)
    }
  }

  const state = pageOptions
  const totalPages = state === undefined ? 1 : Math.ceil(state.totalRecords / state.pageSize).toFixed()

  return (
    <div>
      <div style={{ float: 'left' }}>
        {allowSearch === true && (
          <input
            style={{ width: '300px' }}
            className="ant-input"
            placeholder="Search by keywords"
            value={tempSearch}
            onChange={e => { setTempSearch(e.target.value) }}
            onKeyDown={handleKeyDown}
          ></input>
        )}
      </div>
      <div style={{ float: 'right' }}>
        {allowPaging === true && pageOptions.totalRecords > 0 && (
          <div className="pagination">
            <button className="ant-btn-link" onClick={() => pageChange(1)}>Refresh </button>
            <span>
              {' | '}{' '}Page{' '}
              <strong>
                {state.currentPage} of {state.totalRecords <= state.pageSize ? 1 : totalPages}
              </strong>
              {' | '}
            </span>
            <button className="ant-btn-link" onClick={() => pageChange(1)}
              disabled={state.currentPage === 1}>
              {'First'}
            </button>
            <button className="ant-btn-link" onClick={() => pageChange(state.currentPage - 1)}
              disabled={state.currentPage === 1}>
              {'Prev'}
            </button>
            <label> - </label>
            <button className="ant-btn-link" onClick={() => pageChange(state.currentPage + 1)}
              disabled={totalPages <= 1 || state.currentPage >= totalPages}>
              {'Next'}
            </button>
            <button className="ant-btn-link" onClick={() => pageChange(totalPages)}
              disabled={totalPages <= 1 || state.currentPage >= totalPages}>
              {'Last'}
            </button>
          </div>
        )}
      </div>
      <div style={{ clear: 'both' }}></div>
      <ConfigProvider locale={locale}>
        <>
          {rows.length === 0 ?
            <Alert message="No record available!" type="info" showIcon className="mb-10" />
            :
            <table {...getTableProps()} className="table">
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th width={column.width} {...column.getHeaderProps()}>
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          }
        </>
      </ConfigProvider>
    </div>
  )
}
