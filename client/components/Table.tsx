import { Paper, TableContainer, Table as MUITable, TableHead, TableRow, TableBody, TableCell, } from '@mui/material';
import React, { useMemo } from 'react';
import _ from "lodash"
import MainLayout from '../layouts/MainLayout';

interface TableProps {
  columns: any[],
  data: any[]
}

const Table: React.FC<TableProps> = ({ columns, data }) => {

  const renderColumns = (item) => _.map(columns, (column, index) => renderCell(column, item, index))


  const renderCell = (column, item, index) => {
    return (
      <TableCell
        key={index}
        align={'left'}
      >
        <div>
          {item?.render ? item.render() : _.get(item, column?.key)}
        </div>
      </TableCell>
    );
  };

  const renderRow = (item, index) => {
    console.log("item 2", item)
    return (
      <TableRow key={index}>
        {renderColumns(item)}
      </TableRow>
    );
  };


  const renderHeaderCell = (item, key) => {
    const { name } = item;
    // console.log("item", item)
    // if (_.isBoolean(isVisible) && !isVisible) return null;
    return (
      <TableCell
        key={key}
      //  align={align || "left"}
      // className={css(key === 'actions' && styles.actionCell)}
      >
        {name}
      </TableCell>
    );
  };

  const renderfilterCells = useMemo(() => _.map(columns, renderHeaderCell), [data]);

  const renderNoData = (
    <TableRow>
      <TableCell align="center" colSpan={columns.length}>
        No data
      </TableCell>
    </TableRow>
  );

  const renderRows = (
    <>
      {_.map(data, renderRow)}
    </>
  );

  const renderData = !data.length ? renderNoData : renderRows;

  return (
    <MainLayout>
      <Paper isPadding={false} >
        {/* {renderTitle()} */}
        {/* {isLoading && renderLoading} */}
        <TableContainer>
          <MUITable>
            <TableHead>
              <TableRow>
                {renderfilterCells}
              </TableRow>
            </TableHead>
            <TableBody>
              {renderData}
            </TableBody>
          </MUITable>
        </TableContainer>
      </Paper>
    </MainLayout>
  );
};

export default Table;