import bcrypt from "bcrypt";



export const checkEnvironmentVariables = () => {
    let errors = 0;
    const variables = ["ADMIN_PASSWORD", "JWT_SIGNATURE"];

    variables.forEach(variable => {
        if(!process.env[variable]) {
            console.error(`${variable} must be defined in the .env file`);
            errors++;
        }
    });
    
    if(errors) {
        process.exit(1);
    }
}



export const hashPassword = (password: string): string => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}