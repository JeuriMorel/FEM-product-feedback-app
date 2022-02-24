export function isFormValid() {
    const form = document.querySelector("form")
    let inputs = [...form.elements].filter(item => item.required)

    let inputsAreValid = inputs.map(input => {
        input.classList.toggle("error", !input.checkValidity())
        return input.checkValidity()
    })
    return inputsAreValid.every(item => item === true)
}