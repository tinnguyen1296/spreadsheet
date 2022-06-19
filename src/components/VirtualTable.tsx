import { useCallback, useEffect, useState } from 'react';
import { Column, ReactGrid, Row } from '@silevis/reactgrid';
import '@silevis/reactgrid/styles.css';
import ReactPaginate from 'react-paginate';
import { getColumnName } from '../helpers/utils';

const ITEMS_PER_PAGE = 50;
const COL_LENGTH = 1000;
const ROW_LENGTH = 1000000;

const createRowSlice = (start: number, end: number): Row[] =>
  Array.from({ length: end - start }).map((_, idx) => ({
    rowId: idx + start,
    cells: Array.from({ length: COL_LENGTH }).map((_, idxCol) => ({
      type: 'text',
      text: `${idx + start + 1}:${idxCol + 1}`,
    })),
  }));

const headerRows: Row = {
  rowId: 'header',
  cells: Array.from({ length: COL_LENGTH }).map((_, idx) => ({ type: 'header', text: getColumnName(idx) })),
};

const columns: Column[] = Array.from({ length: COL_LENGTH }).map((s: any, idx: number) => ({
  columnId: getColumnName(idx),
  width: 150,
}));

function Table({ rows, columns }: any) {
  return (
    <div className='w-full h-[700px] overflow-auto'>
      <ReactGrid rows={rows} columns={columns} enableRangeSelection />
    </div>
  );
}

export default function VirutalTable() {
  const [dataRows, setDataRows] = useState<Row[]>([]);
  const [pageCount, setPageCount] = useState<number>(1);
  const [itemOffset, setItemOffset] = useState<number>(0);

  useEffect(() => {
    const initRows = createRowSlice(0, ROW_LENGTH < ITEMS_PER_PAGE ? ROW_LENGTH : ITEMS_PER_PAGE);

    console.log('initRowsinitRows', initRows);
    setDataRows(initRows);
    setPageCount(Math.ceil(ROW_LENGTH / ITEMS_PER_PAGE));
  }, []);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + ITEMS_PER_PAGE;
    setDataRows(createRowSlice(itemOffset, endOffset));
  }, [itemOffset, ITEMS_PER_PAGE]);

  const handlePageClick = useCallback((event: any) => {
    const newOffset = (event.selected * ITEMS_PER_PAGE) % ROW_LENGTH;
    setItemOffset(newOffset);
  }, []);

  console.log('dataRows', dataRows.length);

  return (
    <div>
      <h3>react-virtual table</h3>
      <div>
        <ReactPaginate
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          breakLabel='...'
          nextLabel='>'
          previousLabel='<'
          pageLinkClassName='cursor-pointer border border-1 px-2 rounded-md'
          containerClassName='flex gap-4'
          activeLinkClassName='bg-blue-500 text-white border-blue-500'
        />
      </div>
      <Table rows={[headerRows, ...dataRows]} columns={columns} />
    </div>
  );
}
