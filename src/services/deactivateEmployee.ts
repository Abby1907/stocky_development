import databaseConfiguration from "@/configs/dbConfig/databaseConfiguration";
import Employee from "@/models/Employee";
interface requestBodyType {
    employeeId: string
}
export async function deactivateEmployee(reqBody: requestBodyType) {
    const responseObject = {
        message: "",
        status: false,
        statusCode: 400
    }
    try {
        await databaseConfiguration();
        const deactivateEmployee = await Employee.findByIdAndUpdate({_id: reqBody.employeeId}, {isActive: false}, {new: true});
        if (!deactivateEmployee) {
            responseObject.message = "Employee not found !";
            responseObject.status = false;
            responseObject.statusCode = 400;
            return responseObject;
        }
        responseObject.message = "Employee deactivated successfully.";
        responseObject.status = true;
        responseObject.statusCode = 200;
        return responseObject;
        
    } catch (error) {
        console.log(error);
        responseObject.message = "Internal server error.";
        responseObject.status = false;
        responseObject.statusCode = 500;
        return responseObject;
    }
}