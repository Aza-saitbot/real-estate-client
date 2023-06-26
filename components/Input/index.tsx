import {useFormContext, Controller, RegisterOptions, FieldValues, Control} from "react-hook-form";
import {TextField, TextFieldProps} from "@mui/material";
import {useStylesInput} from "@/components/Input/config";
import {ErrorMessage} from "@hookform/error-message";


type InputStyledType<TFieldValues> = {
    name: keyof TFieldValues
    label: string
    options?: RegisterOptions
} & TextFieldProps

const Input = <TFieldValues extends FieldValues>({name, label, options, ...props}: InputStyledType<TFieldValues>) => {
    const {control, formState} = useFormContext<TFieldValues>();
    const s = useStylesInput();

    return (
        <div>
            <Controller
                name={name}
                control={control as Control<TFieldValues>}
                render={({ field }) => (
                    <TextField
                        {...field}
                        {...props}
                        label={label}
                        error={!!formState.errors[name]}
                        helperText={formState.errors[name]?.message}
                    />
                )}
            />
            <ErrorMessage
                name={name}
                errors={formState.errors}
                render={({ message }) => <p className={s.error}>{message}</p>}
            />
        </div>
    );
};

export default Input;