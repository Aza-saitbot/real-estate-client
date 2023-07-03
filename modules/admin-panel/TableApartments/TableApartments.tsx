import React, {useState} from 'react';
import s from './TableApartments.module.scss'
import {DataGrid, GridCellParams, GridColDef, GridRowSelectionModel} from '@mui/x-data-grid';
import {useRouter} from "next/router";
import { IconButton, InputAdornment, TextField,Button,Typography} from "@mui/material";
import { Search as IconSearch, Clear as IconClear } from '@mui/icons-material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Delete } from '@mui/icons-material';
import {DataAdminPanelType} from "@/api/apartments";
import {IApartment} from "@/api/dto/apartments.dto";
import TableApartmentCell from "@/modules/admin-panel/TableApartmentCell/TableApartmentCell";


const CustomDataGrid = styled(DataGrid)(({ theme }) => ({

    "& .MuiDataGrid-colCell": {
        backgroundColor: "#EAF7FF",
    },
}));

const theme = createTheme();


const TableApartments = ({apartments,employees,categories}:DataAdminPanelType) => {
    const router = useRouter()
    const [searchText, setSearchText] = useState('');
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
    const [list,setList]=useState<IApartment[]>(apartments)

    const handleSelectionChange = (selection:  GridRowSelectionModel) => {
         setSelectedRows(selection);
    };

     const handlerEditApartment = async (id: number) => {
        await router.push(`/admin-panel/edit-apartment/${id}`)
    };
    // categoryId: number
    // employeeId: number

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Заголовок', width: 200,
            renderCell: (params: GridCellParams) => (
                <TableApartmentCell value={params.value as string} id={params.id as number} handlerEditApartment={handlerEditApartment} />
            ),
        },
        { field: 'price', headerName: 'Цена', type:'number', width: 100 },
        { field: 'currency', headerName: 'Валюта', width: 70 },
        { field: 'address', headerName: 'Адрес',width:200 },
        // { field: 'name', headerName: 'Название сотрудника', width: 130 },
        // { field: 'name', headerName: 'Статус', width: 130 },
    ];


    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleClearSearch = () => {
        setSearchText('');
    };

    const handleDeleteSelected = () => {
        // Обработка удаления выбранных строк
        console.log('Удаление выбранных строк', selectedRows);
    };


    const filteredRows: IApartment[] = list.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchText.toLowerCase())
        )
    );

    return (
        <div className={s.content}>
            <div className={`${s.header} ${selectedRows.length > 0 ? s.hided : ''}`}>
                {selectedRows.length === 0 && (
                    <TextField
                        className={s.search}
                        value={searchText}
                        onChange={handleSearch}
                        placeholder="Поиск"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton>
                                        <IconSearch />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    {searchText && (
                                        <IconButton onClick={handleClearSearch}>
                                            <IconClear />
                                        </IconButton>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
                <div className={s.deleteButtonContainer}>
                    <Button
                        variant="contained"
                        startIcon={<Delete />}
                        onClick={handleDeleteSelected}
                        className={`${s.deleteButton} ${selectedRows.length > 0 ? s.visible : ''}`}
                    >
                        Удалить ({selectedRows.length})
                    </Button>
                </div>
            </div>
            <div className={s.table}>
                <ThemeProvider theme={theme}>
                    <CustomDataGrid
                        rows={filteredRows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        autoHeight
                        pageSizeOptions={[8, 15]}
                        checkboxSelection
                        onRowSelectionModelChange={handleSelectionChange}
                    />
                </ThemeProvider>
            </div>
        </div>
    );
};

export default TableApartments;