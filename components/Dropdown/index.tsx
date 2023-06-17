import React from 'react';
import {FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
import { useStylesDropdown } from './style';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {Controller, useFormContext} from "react-hook-form";
import {SelectProps} from "@mui/material/Select/Select";


type DropdownProps = {
    list:{id:number | string,name:string}[]
    name:string
    label:string
} & SelectProps
const Dropdown = ({name,list,label,...props}:DropdownProps) => {
    const {control} = useFormContext()
    return (
        <FormControl>
            <InputLabel id={label}>
                {label}
            </InputLabel>
            <Controller
                control={control}
                name={name}
                render={({field}) => (
                    <Select
                        {...props}
                        id={name}
                        labelId={label}
                        IconComponent={KeyboardArrowDownIcon}
                        displayEmpty
                        {...field}
                        fullWidth
                        input={<OutlinedInput label={label} />}
                    >
                        {list.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />
        </FormControl>


    );
};

export default Dropdown;