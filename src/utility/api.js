const BASE_URL = "https://localhost:7289/api/";
// const BASE_URL = "/api/";
export const api = {
  base_url: BASE_URL,
  visits: {
    create_visit:BASE_URL+"Visits/AddVisit",
    get_all_visits_for_application_user:BASE_URL+"Visits/GetAllVisits/",
    delete_visit:BASE_URL+"Visits/DeleteVisit/",
    update_visit:BASE_URL+"Visits/UpdateVisit"
  },
  medicines: {
    create_medicine:BASE_URL+"Medicines/AddMedicine",
    get_all_medicines:BASE_URL+"Medicines/GetAllMedicines",
    update_medicine:BASE_URL+"Medicines/UpdateMedicine",
    delete_medicine:BASE_URL+"Medicines/DeleteMedicine/",
  },
  treatments: {
    create_treatment:BASE_URL+"Treatments/AddTreatment",
    get_visit_treatments:BASE_URL+"Treatments/GetVisitTreatments/",
    delete_treatment:BASE_URL+"Treatments/DeleteTreatment/",
  },
  account: {
    login:BASE_URL+"Accounts/Login",
    create_account:BASE_URL+"Accounts/CreatePatientFile",
    get_all_accounts:BASE_URL+"Accounts/GetAllFiles",
    get_account_data:BASE_URL+"Accounts/GetFile/",
    update_account:BASE_URL+"Accounts/UpdateFile",
    delete_account:BASE_URL+"Accounts/DeleteFile/"
  },
  slider_images: {
    upload_slider_image: BASE_URL + "WebSiteManagement/UploadSliderImage",
    get_all_slider_images: BASE_URL + "WebSiteManagement/GetAllSliderImages",
    delete_slider_image: BASE_URL + "WebSiteManagement/DeleteSliderImage/",
  },
  clinic_services: {
    add_new_service: BASE_URL + "WebSiteManagement/AddClinicService",
    update_service: BASE_URL + "WebSiteManagement/updateClinicService",
    get_all_services: BASE_URL + "WebSiteManagement/GetAllClinicServices",
    delete_service: BASE_URL + "WebSiteManagement/DeleteService/",
  },
  articles: {
    add_new_article: BASE_URL + "WebSiteManagement/AddArticle",
    update_article: BASE_URL + "WebSiteManagement/updateArticle",
    get_all_articles: BASE_URL + "WebSiteManagement/GetAllArticles",
    get_article_by_id: BASE_URL + "WebSiteManagement/GetArticle/",
    get_latest_two_articles:
      BASE_URL + "WebSiteManagement/GetLatestTwoArticles",
    delete_article: BASE_URL + "WebSiteManagement/DeleteArticle/",
  },
  news: {
    add_new_news: BASE_URL + "WebSiteManagement/AddNews",
    update_news: BASE_URL + "WebSiteManagement/updateNews",
    get_all_news: BASE_URL + "WebSiteManagement/GetAllNews",
    get_latest_two_news: BASE_URL + "WebSiteManagement/GetLatestTwoNews",
    delete_news: BASE_URL + "WebSiteManagement/DeleteNews/",
  },
  vaccins: {
    add_new_vaccin: BASE_URL + "WebSiteManagement/AddVaccin",
    update_vaccin: BASE_URL + "WebSiteManagement/updateVaccin",
    get_all_vaccins: BASE_URL + "WebSiteManagement/GetAllVaccins",
    delete_vaccin: BASE_URL + "WebSiteManagement/DeleteVaccin/",
  },
  bookings: {
    book: BASE_URL + "WebSiteManagement/AddBooking",
    get_all_bookings: BASE_URL + "WebSiteManagement/GetAllBookings",
    delete_booking: BASE_URL + "WebSiteManagement/DeleteBooking/",
  },
  metaDatas: {
    add_meta_data: BASE_URL + "WebSiteManagement/AddMetaDatas",
    get_meta_data: BASE_URL + "WebSiteManagement/GetMetaDatas",
  },
};
