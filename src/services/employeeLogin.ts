import databaseConfiguration from "@/configs/dbConfig/databaseConfiguration";
import Employee from "@/models/Employee";
interface RequestBodyType {
    email: string;
    password: string
}
interface ResponseObject {
    message: string;
    status: boolean;
    status_code: number;
}
export async function employeeLogin (reqBody: RequestBodyType):  Promise<ResponseObject> {
    const responeObject = {
        message: "",
        status: false,
        status_code: 400,
        data: {},
        employeeData: {}
    }
    try {
        await databaseConfiguration();
        const employee = await Employee.findOne({email: reqBody.email});
        if (!employee) {
            responeObject.message = "Employee not found";
            responeObject.status = false;
            responeObject.status_code = 400;
            return responeObject;
        }
        if (employee.password !== reqBody.password) {
            responeObject.message = "Invalid password";
            responeObject.status = false;
            responeObject.status_code = 400;
            return responeObject;
        }
        if (!employee.isActive) {
            responeObject.message = "Employee not active. Contact to Root user.";
            responeObject.status = false;
            responeObject.status_code = 400;
            return responeObject;
        }
        responeObject.message = "Login successful";
        responeObject.status = true;
        responeObject.status_code = 200;
        responeObject.data = employee.createdBy;
        responeObject.employeeData = employee._id;
        return responeObject;
    } catch (error) {
        console.log(error);
        responeObject.message = "Something wenrt wrong";
        responeObject.status = false;
        responeObject.status_code = 500;
        return responeObject;
    }
}