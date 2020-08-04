export const validatePassword = (value) => {
    let error;
    if (!value) {
        error = 'Please enter your Password';
    } else if (value.length < 4) {
        error = 'Value must be longer than 3 characters';
    }
    return error;
};
  
export const validateEmail = (value) => {
    let error;
    if (!value) {
      error = 'Please enter your Email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid Email Address';
    }
    return error;
};
  
export const validateName = (value) => {
    let error;
    if (!value) {
      error = 'Please enter your Full Name';
    } else if (!/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/i.test(value)) {
      error = 'Invalid Full Name';
    }
    return error;
};
  
export const validatePhone = (value) => {
    let error;
    if (!value) {
      error = 'Please enter your Phone No';
    } else if (!/^\d+$/i.test(value)) {
      error = 'Invalid Phone No';
    } else if (value.length!==10) {
      error = 'Post Code must be a 10 digit number';
    }
    return error;
};

export const validateDob = (value) => {
    let error;
    if (!value) {
      error = 'Please enter your date of birth';
    }
    return error;
};

export const validateAddress = (value) => {
    let error;
    if (!value) {
      error = 'Please enter your address';
    }
    return error;
};

export const validateCity = (value) => {
    let error;
    if (!value) {
      error = 'Please enter your city lol';
    } else if (!/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/i.test(value)) {
      error = 'Invalid City Name';
    }
    return error;
};

export const validatePostcode = (value) => {
    let error;
    if (!value) {
      error = 'Please enter your post code';
    } else if (!/^\d+$/i.test(value)) {
      error = 'Invalid Post Code';
    } else if (value.length!==6) {
        error = 'Post Code must be a 6 digit number';
    }
    return error;
};

export const validateIfsc = (value) => {
    let error;
    if (!value) {
        error = 'Please enter your IFSC code';
      }
    return error;
};

export const validateAccno = (value) => {
    let error;
    if (!value) {
        error = 'Please enter your account no';
      }
    return error;
};