const BASE_URL='https://localhost:7289/api';
export const api={
    base_url:BASE_URL,
    account:{},
    slider_images:{},
    clinic_services:{
        add_new_service:BASE_URL+'/WebSiteManagement/AddClinicService',
        update_service:BASE_URL+'/WebSiteManagement/updateClinicService',
        get_all_services:BASE_URL+'/WebSiteManagement/GetAllClinicServices',
        delete_service:BASE_URL+'/WebSiteManagement/DeleteService/',
        images_url:BASE_URL+'/StaticFiles/ServicesImages/',
    },
}