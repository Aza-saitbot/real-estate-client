
type InputStyledType={
    name:string
    label:string
    options:RegisterOptions
} & TextFieldProps
const InputStyled = ({name,label,options,...props}:InputStyledType) => {
    const { control,formState } = useFormContext();
    const s = useStylesInput()

    return (
        <div>
            <Controller
                name={name}
                control={control}
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

export default InputStyled;