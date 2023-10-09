
export default function Input({ label, value, name, handleChange, type, textArea = false ,disabled}) {

    if (textArea) {
        return (
            <div className="form-group mt-3">
                <label>{label}</label>
                <textarea className="form-control mt-1" name={name} rows="4" onChange={handleChange} value={value} />
            </div>
        )
    }

    return (
        <div className="form-group mt-3">
            <label>{label}</label>
            <input type={type} className="form-control mt-1" value={value} name={name} onChange={handleChange} disabled={disabled} />
        </div>
    )

}