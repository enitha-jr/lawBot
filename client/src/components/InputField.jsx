function InputField(props) {
    return (
        <div>
            <div className='InputField'>
                <div className='inputfield-label'>{props.label}</div>
                <input
                    className='inputfield'
                    type={props.type}
                    placeholder={props.placeholder}
                    {...props.registerProps}
                    readOnly={props.readOnly}
                />
            </div>
            <div className='inputfield-error'>{props.error}</div>
        </div>
    )
}

export default InputField