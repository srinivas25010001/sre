import axios from 'axios';

const EMPLOYEE_API_BASE_URL = window.env.API_BASE_URL + "/api/v1/employees";

class EmployeeService {

    getEmployees(){
        return axios.post(EMPLOYEE_API_BASE_URL + '/findEmployees');
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL + '/addEmployee', employee);
    }

    getEmployeeById(employeeId){
        return axios.post(EMPLOYEE_API_BASE_URL + `/findEmployeeById?Id=${employeeId}`);
    }

    updateEmployee(employee, employeeId){
        return axios.put(EMPLOYEE_API_BASE_URL + `/updateEmployee?Id=${employeeId}`, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL + `/deleteEmployee?Id=${employeeId}`);
    }
}

export default new EmployeeService()