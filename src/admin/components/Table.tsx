import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  Search
} from 'lucide-react';

interface Column<T> {
  header: React.ReactNode;
  accessor: keyof T | string | ((row: T) => React.ReactNode);
  sortable?: boolean;
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  pagination?: boolean;
  itemsPerPage?: number;
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearch?: (searchTerm: string) => void;
  emptyMessage?: string;
  isLoading?: boolean;
  highlightOnHover?: boolean;
}

function Table<T extends { id?: string | number }>({
  data,
  columns,
  pagination = true,
  itemsPerPage = 10,
  searchable = false,
  searchPlaceholder = "Buscar...",
  onSearch,
  emptyMessage = "Nenhum dado encontrado",
  isLoading = false,
  highlightOnHover = true
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination
  const totalPages = pagination ? Math.ceil(data.length / itemsPerPage) : 1;
  const paginatedData = pagination 
    ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : data;

  // Sorting
  const handleSort = (columnKey: keyof T) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  // Search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch && onSearch(value);
  };

  return (
    <div className="w-full">
      {searchable && (
        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-500" />
          </div>
          <input
            type="text"
            className="w-full py-2 pl-10 pr-3 text-sm bg-[#15152A] border border-[#21213A] rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      )}

      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#15152A] border-b border-[#21213A]">
              {columns.map((column, index) => {
                // Handle both string keys and function accessors
                const accessorKey = typeof column.accessor === 'function' 
                  ? null 
                  : column.accessor;
                
                const isSortable = column.sortable && accessorKey;
                const isSorted = sortColumn === accessorKey;

                return (
                  <th 
                    key={index}
                    className={`px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider ${column.className || ''}`}
                  >
                    {isSortable ? (
                      <button 
                        className="flex items-center space-x-1 focus:outline-none"
                        onClick={() => handleSort(accessorKey as keyof T)}
                      >
                        <span>{column.header}</span>
                        <span className="flex flex-col">
                          <ChevronUp 
                            size={14} 
                            className={`${isSorted && sortDirection === 'asc' ? 'text-[#00EEFF]' : 'text-gray-600'} -mb-1`} 
                          />
                          <ChevronDown 
                            size={14} 
                            className={`${isSorted && sortDirection === 'desc' ? 'text-[#00EEFF]' : 'text-gray-600'}`} 
                          />
                        </span>
                      </button>
                    ) : (
                      <div className="flex items-center space-x-1">
                        <span>{column.header}</span>
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#21213A] bg-[#0F0F18]">
            {isLoading ? (
              // Loading state
              Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr key={`skeleton-${rowIndex}`} className="animate-pulse">
                  {columns.map((_, colIndex) => (
                    <td key={`skeleton-${rowIndex}-${colIndex}`} className="px-4 py-4">
                      <div className="h-4 bg-[#21213A] rounded w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : paginatedData.length > 0 ? (
              // Data rows
              paginatedData.map((row, rowIndex) => (
                <tr 
                  key={row.id || rowIndex}
                  className={`${highlightOnHover ? 'hover:bg-[#15152A]' : ''} transition-colors`}
                >
                  {columns.map((column, colIndex) => {
                    const cellContent = typeof column.accessor === 'function'
                      ? column.accessor(row)
                      : row[column.accessor] as React.ReactNode;
                      
                    return (
                      <td 
                        key={`${row.id || rowIndex}-${colIndex}`}
                        className="px-4 py-4 text-sm text-gray-300"
                      >
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              // Empty state
              <tr>
                <td 
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-sm text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Mostrando {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, data.length)} de {data.length}
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:text-white hover:bg-[#21213A]'}`}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
              let pageNumber: number;
              
              // Show pages around current page
              if (totalPages <= 5) {
                pageNumber = index + 1;
              } else if (currentPage <= 3) {
                pageNumber = index + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + index;
              } else {
                pageNumber = currentPage - 2 + index;
              }
              
              if (pageNumber > 0 && pageNumber <= totalPages) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-8 h-8 rounded-md ${currentPage === pageNumber 
                      ? 'bg-[#6C00FF] text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-[#21213A]'}`}
                  >
                    {pageNumber}
                  </button>
                );
              }
              return null;
            })}
            <button
              onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:text-white hover:bg-[#21213A]'}`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;