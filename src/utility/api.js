//const BASE_URL = "https://localhost:7289/api/";
const BASE_URL = "/api/";
export const api = {
  base_url: BASE_URL,
  account: {
    login: BASE_URL + "Accounts/Login",
    create_account: BASE_URL + "Accounts",
    get_all_accounts: BASE_URL + "Accounts",
    get_account_data: BASE_URL + "Accounts/",
    update_account: BASE_URL + "Accounts",
    delete_account: BASE_URL + "Accounts/",
  },
  articles: {
    add_new_article: BASE_URL + "WebSiteManagement/Articles",
    update_article: BASE_URL + "WebSiteManagement/Articles",
    get_all_articles: BASE_URL + "WebSiteManagement/Articles",
    get_latest_two_articles: BASE_URL + "WebSiteManagement/Articles/LatestTwoArticles",
    get_article_by_id: BASE_URL + "WebSiteManagement/Articles/",
    delete_article: BASE_URL + "WebSiteManagement/Articles/",
  },
  bookings: {
    book: BASE_URL + "WebSiteManagement/Bookings",
    get_all_bookings: BASE_URL + "WebSiteManagement/Bookings",
    delete_booking: BASE_URL + "WebSiteManagement/Bookings/",
  },
  medicines: {
    create_medicine: BASE_URL + "Medicines",
    get_all_medicines: BASE_URL + "Medicines",
    update_medicine: BASE_URL + "Medicines",
    delete_medicine: BASE_URL + "Medicines/",
  },
  metaDatas: {
    add_meta_data: BASE_URL + "WebSiteManagement/MetaDatas",
    get_meta_data: BASE_URL + "WebSiteManagement/MetaDatas",
  },
  news: {
    add_new_news: BASE_URL + "WebSiteManagement/News",
    update_news: BASE_URL + "WebSiteManagement/News",
    get_all_news: BASE_URL + "WebSiteManagement/News",
    get_latest_two_news: BASE_URL + "WebSiteManagement/News/LatestTwoNews",
    delete_news: BASE_URL + "WebSiteManagement/News/",
  },
  payments: {
    create_payment: BASE_URL + "Payments",
    get_all_payments: BASE_URL + "Payments",
    delete_payment: BASE_URL + "Payments/",
  },
  purchases: {
    create_purchase: BASE_URL + "Purchases",
    get_all_purchases: BASE_URL + "Purchases",
    delete_purchase: BASE_URL + "Purchases/",
  },
  clinic_services: {
    add_new_service: BASE_URL + "WebSiteManagement/Services",
    update_service: BASE_URL + "WebSiteManagement/Services",
    get_all_services: BASE_URL + "WebSiteManagement/Services",
    delete_service: BASE_URL + "WebSiteManagement/Services/",
  },
  slider_images: {
    upload_slider_image: BASE_URL + "WebSiteManagement/SliderImages",
    get_all_slider_images: BASE_URL + "WebSiteManagement/SliderImages",
    delete_slider_image: BASE_URL + "WebSiteManagement/SliderImages/",
  },
  tools: {
    create_tool: BASE_URL + "Tools",
    get_all_tools: BASE_URL + "Tools",
    delete_tool: BASE_URL + "Tools/",
  },
  treatments: {
    create_treatment: BASE_URL + "Treatments",
    delete_treatment: BASE_URL + "Treatments/",
  },
  vaccins: {
    add_new_vaccin: BASE_URL + "WebSiteManagement/Vaccines",
    update_vaccin: BASE_URL + "WebSiteManagement/Vaccines",
    get_all_vaccins: BASE_URL + "WebSiteManagement/Vaccines",
    delete_vaccin: BASE_URL + "WebSiteManagement/Vaccines/",
  },
  visits: {
    create_visit: BASE_URL + "Visits",
    get_all_visits_for_application_user: BASE_URL + "Visits/",
    get_visits_of_today: BASE_URL + "Visits/VisitsOfToday",
    delete_visit: BASE_URL + "Visits/",
    update_visit: BASE_URL + "Visits",
  },
};
