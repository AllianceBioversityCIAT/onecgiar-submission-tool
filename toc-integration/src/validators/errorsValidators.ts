export class ErrorValidators{
    async errorGeneral(descriptionError:any, statusError: any) {
        return {
            error: descriptionError,
            status: statusError
        }
    }

    async createSdgResultMenssage(listValid:any, listNotValid:any, status:any){
        return {
            dataSave: listValid,
            dataError: listNotValid,
            status: status,
        }
        
    }
}