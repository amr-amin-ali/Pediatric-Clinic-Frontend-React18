import TextInput from "../../text-input";
import { Fragment, useEffect, useState } from "react";
import ButtonGlowOnHover from "../../buttons/button-glowOnHover";
import TimeInput from "../../time-input";
import SwitchInput from "../../switch-input";
import { useStore } from "../../../../hooks-store/store";
import { api } from "../../../../utility/api";
import { httpGET } from "../../../../http/httpGET";
import { httpPOSTWithFile } from "../../../../http/httpPOSTWithFile";
import DoctorSvg from "../../icons/doctor-svg";
const MetaData = () => {
  const [state, dispatch] = useStore();
  const [clinicSelectedImage, setClinicSelectedImage] = useState(null);
  const [doctorImageUrl, setDoctorImageUrl] = useState(null);
  const [clinicImageUrl, setClinicImageUrl] = useState(null);
  const [doctorSelectedImage, setDoctorSelectedImage] = useState(null);
  const [metaDatasUpdate, setMetaDatasUpdate] = useState(state.metaDatas);
  const [isSubmitting, setIsSubmitting] = useState(false);
  //Initiale meta datas
  //get all meta datas from the server
  if (state.metaDatas.id === null) {
    httpGET(api.metaDatas.get_meta_data).then((metaDatas) => {
      if (Object.keys(metaDatas).length !== 0)
        dispatch("ADD_META_DATA_TO_STORE", metaDatas);
      setMetaDatasUpdate(metaDatas);
    });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  const submitFormHandler = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    // Create an object of formData
    const formData = new FormData();
    // Update the formData object
    if (doctorSelectedImage) {
      formData.append(
        "doctorImage",
        doctorSelectedImage,
        doctorSelectedImage.name
      );
    }
    if (clinicSelectedImage) {
      formData.append(
        "clinicLogo",
        clinicSelectedImage,
        clinicSelectedImage.name
      );
    }
    if (metaDatasUpdate.doctorFirstName !== null)
      formData.append("doctorFirstName", metaDatasUpdate.doctorFirstName);
    if (metaDatasUpdate.doctorMiddleName !== null)
      formData.append("doctorMiddleName", metaDatasUpdate.doctorMiddleName);
    if (metaDatasUpdate.doctorLastName !== null)
      formData.append("doctorLastName", metaDatasUpdate.doctorLastName);
    if (metaDatasUpdate.doctorTitle !== null)
      formData.append("doctorTitle", metaDatasUpdate.doctorTitle);
    if (metaDatasUpdate.doctorPhone1 !== null)
      formData.append("doctorPhone1", metaDatasUpdate.doctorPhone1);
    if (metaDatasUpdate.doctorPhone2 !== null)
      formData.append("doctorPhone2", metaDatasUpdate.doctorPhone2);
    if (metaDatasUpdate.doctorWhatsapp !== null)
      formData.append("doctorWhatsapp", metaDatasUpdate.doctorWhatsapp);
    if (metaDatasUpdate.doctorTelegram !== null)
      formData.append("doctorTelegram", metaDatasUpdate.doctorTelegram);
    if (metaDatasUpdate.doctorFacebook !== null)
      formData.append("doctorFacebook", metaDatasUpdate.doctorFacebook);
    if (metaDatasUpdate.doctorEmail !== null)
      formData.append("doctorEmail", metaDatasUpdate.doctorEmail);
    if (metaDatasUpdate.clinicName !== null)
      formData.append("clinicName", metaDatasUpdate.clinicName);
    if (metaDatasUpdate.clinicAddress !== null)
      formData.append("clinicAddress", metaDatasUpdate.clinicAddress);
    if (metaDatasUpdate.clinicPhone !== null)
      formData.append("clinicPhone", metaDatasUpdate.clinicPhone);
    if (metaDatasUpdate.clinicOpenAt !== null)
      formData.append("clinicOpenAt", metaDatasUpdate.clinicOpenAt);
    if (metaDatasUpdate.clinicCloseAt !== null)
      formData.append("clinicCloseAt", metaDatasUpdate.clinicCloseAt);
    if (metaDatasUpdate.clinicIsOpen !== null)
      formData.append("clinicIsOpen", metaDatasUpdate.clinicIsOpen);
    if (metaDatasUpdate.clinicHoliday !== null)
      formData.append("clinicHoliday", metaDatasUpdate.clinicHoliday);
    if (metaDatasUpdate.doctorScientificData !== null)
      formData.append(
        "doctorScientificData",
        metaDatasUpdate.doctorScientificData
      );
    if (metaDatasUpdate.doctorProfessionalData !== null)
      formData.append(
        "doctorProfessionalData",
        metaDatasUpdate.doctorProfessionalData
      );
    console.log("formData::   ", formData);
    const response = await httpPOSTWithFile(
      api.metaDatas.add_meta_data,
      formData
    );
    const responseStatusCode = (await response).status;
    if (responseStatusCode === 401) {
      alert("Please login first");
      dispatch("LOGOUT");
    } else {
      const data = await response.json();
      dispatch("ADD_META_DATA_TO_STORE", data);
    }

    //AFTER SUCCESS
    setDoctorImageUrl(null);
    setClinicImageUrl(null);
    setDoctorSelectedImage(null);
    setClinicSelectedImage(null);
    setIsSubmitting(false);
    return;
  };

  useEffect(() => {
    if (clinicSelectedImage)
      setClinicImageUrl(URL.createObjectURL(clinicSelectedImage));
    if (doctorSelectedImage)
      setDoctorImageUrl(URL.createObjectURL(doctorSelectedImage));
  }, [clinicSelectedImage, doctorSelectedImage]);

  return (
    <Fragment>
      {isSubmitting && <h1 className="text-center text-info">SAVING...</h1>}
      {!isSubmitting && (
        <form onSubmit={(_) => _.preventDefault()}>
          <div className="card text-center">
            <div className="card-header" style={{ color: "var(--blue-dark)" }}>
              بيانات العيادة
            </div>
            <div className="card-body p-0">
              <div
                className="rounded-bottom"
                style={{ backgroundColor: "var(--blue-dark)" }}
              >
                <h5 className="card-title my-0 text-white py-3 border-bottom border-secondary">
                  هنا يمكنك إضافة أو تعديل بيانات العيادة
                </h5>
                <div className="row mx-0 my-1">
                  <div className="col-7">
                    <div className="">
                      <TextInput
                        onChangeHandler={(event) =>
                          setMetaDatasUpdate({
                            ...metaDatasUpdate,
                            clinicName: event.target.value,
                          })
                        }
                        value={metaDatasUpdate.clinicName ?? ""}
                        name="clinicName"
                        placeholder="إسم العيادة"
                      />
                    </div>
                    <div className="">
                      <TextInput
                        onChangeHandler={(event) =>
                          setMetaDatasUpdate({
                            ...metaDatasUpdate,
                            clinicPhone: event.target.value,
                          })
                        }
                        value={metaDatasUpdate.clinicPhone ?? ""}
                        name="clinicPhone"
                        placeholder="تليفون العيادة"
                      />
                    </div>
                    <div className="">
                      <TimeInput
                        onChangeHandler={(event) =>
                          setMetaDatasUpdate({
                            ...metaDatasUpdate,
                            clinicOpenAt: event.target.value,
                          })
                        }
                        value={metaDatasUpdate.clinicOpenAt ?? ""}
                        name="clinicOpenAt"
                        title="وقت بدء العمل"
                      />
                    </div>
                    <div className="">
                      <TimeInput
                        onChangeHandler={(event) =>
                          setMetaDatasUpdate({
                            ...metaDatasUpdate,
                            clinicCloseAt: event.target.value,
                          })
                        }
                        value={metaDatasUpdate.clinicCloseAt ?? ""}
                        name="clinicCloseAt"
                        title="وقت نهاية العمل"
                      />
                    </div>
                    <div className="">
                      <TextInput
                        onChangeHandler={(event) =>
                          setMetaDatasUpdate({
                            ...metaDatasUpdate,
                            clinicAddress: event.target.value,
                          })
                        }
                        value={metaDatasUpdate.clinicAddress ?? ""}
                        name="clinicAddress"
                        placeholder="عنوان العيادة"
                      />
                    </div>
                    <div className="">
                      <TextInput
                        onChangeHandler={(event) =>
                          setMetaDatasUpdate({
                            ...metaDatasUpdate,
                            clinicHoliday: event.target.value,
                          })
                        }
                        value={metaDatasUpdate.clinicHoliday ?? ""}
                        name="clinicHoliday"
                        placeholder="أجازة العيادة"
                      />
                    </div>
                  </div>
                  <div className="col-5 ">
                    {!clinicImageUrl && !clinicSelectedImage && (
                      <svg
                        fill="#e1b516d9"
                        x="0px"
                        y="0px"
                        viewBox="-500 -1000 2000 2000"
                      >
                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                          <path d="M403.3,4987.5c-26.8-17.2-59.3-51.7-70.8-76.6c-32.5-68.9-28.7-9518.5,1.9-9585.5c51.7-112.9-271.8-105.3,4666.4-105.3c4201.3,0,4543.9,1.9,4593.7,32.5c30.6,17.2,63.2,51.7,74.6,76.6c15.3,32.5,21.1,1075.7,21.1,3567.8c0,3830,5.7,3600.3-105.3,3650.1c-38.3,17.2-530.2,23-2009.7,23H5613.3v1159.9v1159.9l-65.1,65.1l-65.1,65.1H2968.1C661.7,5018.1,451.2,5016.2,403.3,4987.5z M5198,4604.7c5.7-9.6,5.7-2032.7-1.9-4498l-9.6-4484.6h-400h-398.1v958.9v958.9l-65.1,65.1l-65.1,65.1H2973.9c-1385.8,0-1360.9,1.9-1414.5-99.5c-17.2-32.5-24.9-289-28.7-991.5l-3.8-947.4l-405.8-5.7l-407.7-3.8v4498v4498h2237.5C4183.5,4618.1,5194.2,4612.3,5198,4604.7z M9288.3-1104.9v-3273H7450.8H5613.3v3273v3273h1837.5h1837.5V-1104.9z M3976.8-3554.9v-813.5l-1018.3-5.7l-1020.2-3.8v823v823l1020.2-3.8l1018.3-5.7V-3554.9z M2413,4141.5l-63.2-55.5l-5.7-346.4l-5.8-344.5l-344.5-5.8l-346.4-5.7l-55.5-63.2l-55.5-61.3v-490v-490l55.5-55.5l55.5-55.5h346.4h346.4v-315.8c0-356,17.2-428.7,112.9-476.6c88.1-45.9,937.9-44,1018.3,1.9c28.7,17.2,61.3,45.9,68.9,61.2c7.7,17.2,19.1,185.7,24.9,375.2l9.6,344.5l344.5,9.6c189.5,5.7,357.9,17.2,375.2,24.9c15.3,7.7,44,40.2,61.2,68.9c45.9,80.4,47.9,930.2,1.9,1018.3c-47.8,95.7-120.6,112.9-476.6,112.9h-315.8v346.4V4086l-55.5,55.5l-55.5,55.5h-490h-490L2413,4141.5z M3163.4,3469.6c0-493.8,5.7-497.7,507.2-497.7h315.8v-201v-201h-346.4h-346.4l-65.1-65.1l-65.1-65.1v-346.4V1747h-201h-201v315.8c0,501.5-3.8,507.2-497.7,507.2h-325.4v201v201h317.7c359.8,0,424.9,17.2,474.7,124.4c24.9,49.8,30.6,132.1,30.6,380.9V3795h201h201V3469.6z M1235.9,912.5c-124.4-61.2-122.5-42.1-116.8-1232.6l5.7-1075.7l63.2-55.5l61.3-55.5h685.2c601,0,689.1,3.8,729.3,30.6c95.7,68.9,97.6,82.3,97.6,1196.3c0,1150.4,1.9,1133.1-124.4,1192.5C2543.2,958.4,1327.8,956.5,1235.9,912.5z M2340.3-291.5v-813.5h-401.9h-402v813.5V522h402h401.9V-291.5z M3283.9,914.4c-122.5-53.6-120.6-30.6-120.6-1203.9c0-782.8,5.7-1075.7,23-1112.1c45.9-101.4,70.8-105.3,809.6-105.3h683.3l55.5,55.5l55.5,55.5v1098.7c0,1203.9,5.7,1150.3-114.8,1211.6C4597,954.6,3377.7,954.6,3283.9,914.4z M4388.3-291.5v-813.5h-411.5h-411.5v813.5V522h411.5h411.5V-291.5z M6118.6,1308.7c-32.5-21.1-68.9-65.1-82.3-99.5c-13.4-42.1-21.1-323.5-21.1-891.9c0-717.8,3.8-842.2,30.6-895.8C6105.2-706.8,6067-703,7450.8-703s1345.6-3.8,1404.9,124.4c26.8,53.6,30.6,178,30.6,897.7c0,918.7-1.9,939.8-112.9,995.3c-49.8,26.8-212.5,30.6-1326.4,30.6C6233.5,1345,6176.1,1343.1,6118.6,1308.7z M8465.2,330.6v-612.5H7450.8H6436.4v612.5v612.5h1014.4h1014.4V330.6z M6135.8-1537.5c-118.7-59.3-120.6-67-120.6-991.5c0-918.7,1.9-939.8,112.9-995.3c49.8-26.8,212.5-30.6,1322.6-30.6s1272.8,3.8,1322.6,30.6c111,55.5,112.9,76.6,112.9,995.3c0,719.7-3.8,844.1-30.6,897.7c-59.3,128.3-21.1,124.4-1408.7,124.4C6352.1-1506.9,6189.4-1510.7,6135.8-1537.5z M8465.2-2540.5V-3153H7450.8H6436.4v612.5v612.5h1014.4h1014.4V-2540.5z" />
                        </g>
                      </svg>
                    )}
                    {clinicImageUrl && clinicSelectedImage && (
                      <img
                        className="p-1"
                        src={clinicImageUrl}
                        style={{ width: "200px", height: "200px" }}
                        alt="clinicLogoPreview"
                      />
                    )}
                  </div>
                  <div className="row m-0">
                    <div className="col-7">
                      <div className="d-flex justify-content-between align-items-center my-2">
                        <p
                          className={`m-0 fs-3 text-${
                            metaDatasUpdate.clinicIsOpen ? "success" : "danger"
                          } fw-bold`}
                        >
                          مفتوح الآن
                        </p>
                        <SwitchInput
                          clickAction={() =>
                            setMetaDatasUpdate({
                              ...metaDatasUpdate,
                              clinicIsOpen: !metaDatasUpdate.clinicIsOpen,
                            })
                          }
                          on={metaDatasUpdate.clinicIsOpen}
                        />
                      </div>
                    </div>
                    <div className="col-5 align-items-center">
                      <label
                        htmlFor="clinicLogoFileInput"
                        className="text-warning fs-4"
                      >
                        تغيير اللوجو
                        <input
                          onChange={(e) =>
                            setClinicSelectedImage(e.target.files[0])
                          }
                          type="file"
                          name="clinicLogo"
                          id="clinicLogoFileInput"
                          hidden
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card text-center">
            <div className="card-header " style={{ color: "var(--blue-dark)" }}>
              بيانات الطبيب
            </div>
            <div className="card-body p-0">
              <div
                className="rounded-bottom"
                style={{ backgroundColor: "var(--blue-dark)" }}
              >
                <h5 className="card-title my-0 text-white py-3 border-bottom border-secondary">
                  هنا يمكنك إضافة أو تعديل بيانات الطبيب
                </h5>
                <div className="row mx-0 my-1">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-4 p-0">
                        <TextInput
                          onChangeHandler={(event) =>
                            setMetaDatasUpdate({
                              ...metaDatasUpdate,
                              doctorFirstName: event.target.value,
                            })
                          }
                          value={metaDatasUpdate.doctorFirstName ?? ""}
                          name="doctorFirstName"
                          placeholder="الإسم الأول"
                        />
                      </div>
                      <div className="col-4 p-0">
                        <TextInput
                          onChangeHandler={(event) =>
                            setMetaDatasUpdate({
                              ...metaDatasUpdate,
                              doctorMiddleName: event.target.value,
                            })
                          }
                          value={metaDatasUpdate.doctorMiddleName ?? ""}
                          name="doctorMiddleName"
                          placeholder="الإسم الأوسط"
                        />
                      </div>
                      <div className="col-4 p-0">
                        <TextInput
                          onChangeHandler={(event) =>
                            setMetaDatasUpdate({
                              ...metaDatasUpdate,
                              doctorLastName: event.target.value,
                            })
                          }
                          value={metaDatasUpdate.doctorLastName ?? ""}
                          name="doctorLastName"
                          placeholder="الإسم الأخير"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-8">
                    <TextInput
                      onChangeHandler={(event) =>
                        setMetaDatasUpdate({
                          ...metaDatasUpdate,
                          doctorTitle: event.target.value,
                        })
                      }
                      value={metaDatasUpdate.doctorTitle ?? ""}
                      name="doctorTitle"
                      placeholder="لقب الدكتور"
                    />
                    <TextInput
                      onChangeHandler={(event) =>
                        setMetaDatasUpdate({
                          ...metaDatasUpdate,
                          doctorPhone1: event.target.value,
                        })
                      }
                      value={metaDatasUpdate.doctorPhone1 ?? ""}
                      name="doctorPhone1"
                      placeholder="هاتف الطبيب 1"
                    />
                    <TextInput
                      onChangeHandler={(event) =>
                        setMetaDatasUpdate({
                          ...metaDatasUpdate,
                          doctorPhone2: event.target.value,
                        })
                      }
                      value={metaDatasUpdate.doctorPhone2 ?? ""}
                      name="doctorPhone2"
                      placeholder="هاتف الطبيب 2"
                    />
                    <TextInput
                      onChangeHandler={(event) =>
                        setMetaDatasUpdate({
                          ...metaDatasUpdate,
                          doctorWhatsapp: event.target.value,
                        })
                      }
                      value={metaDatasUpdate.doctorWhatsapp ?? ""}
                      name="doctorWhatsapp"
                      placeholder="واتساب"
                    />
                    <TextInput
                      onChangeHandler={(event) =>
                        setMetaDatasUpdate({
                          ...metaDatasUpdate,
                          doctorTelegram: event.target.value,
                        })
                      }
                      value={metaDatasUpdate.doctorTelegram ?? ""}
                      name="doctorTelegram"
                      placeholder="تيليجرام"
                    />
                    <TextInput
                      onChangeHandler={(event) =>
                        setMetaDatasUpdate({
                          ...metaDatasUpdate,
                          doctorFacebook: event.target.value,
                        })
                      }
                      value={metaDatasUpdate.doctorFacebook ?? ""}
                      name="doctorFacebook"
                      placeholder="فيسبوك"
                    />
                    <TextInput
                      onChangeHandler={(event) =>
                        setMetaDatasUpdate({
                          ...metaDatasUpdate,
                          doctorEmail: event.target.value,
                        })
                      }
                      value={metaDatasUpdate.doctorEmail ?? ""}
                      name="doctorEmail"
                      placeholder="البريد الإلكترونى"
                    />
                    <TextInput
                      onChangeHandler={(event) =>
                        setMetaDatasUpdate({
                          ...metaDatasUpdate,
                          doctorScientificData: event.target.value,
                        })
                      }
                      value={metaDatasUpdate.doctorScientificData ?? ""}
                      name="doctorScientificData"
                      placeholder="البانات العلمية"
                    />
                    <TextInput
                      onChangeHandler={(event) =>
                        setMetaDatasUpdate({
                          ...metaDatasUpdate,
                          doctorProfessionalData: event.target.value,
                        })
                      }
                      value={metaDatasUpdate.doctorProfessionalData ?? ""}
                      name="doctorProfessionalData"
                      placeholder="البيانات المهنية"
                    />
                  </div>
                  <div className="col-4 ">
                    {!doctorImageUrl && !doctorSelectedImage && <DoctorSvg />}
                    {doctorImageUrl && doctorSelectedImage && (
                      <img
                        className="p-1"
                        src={doctorImageUrl}
                        style={{ width: "200px", height: "200px" }}
                        alt="doctorImagePreview"
                      />
                    )}
                    <label
                      htmlFor="doctorLogoFileInput"
                      className="text-warning fs-4"
                    >
                      تغيير الصورة
                      <input
                        onChange={(e) =>
                          setDoctorSelectedImage(e.target.files[0])
                        }
                        type="file"
                        name="doctorImage"
                        id="doctorLogoFileInput"
                        hidden
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row m-0 justify-content-center my-5">
            <ButtonGlowOnHover
              buttonClickHandler={submitFormHandler}
              text="حفظ"
            />
          </div>
        </form>
      )}
    </Fragment>
  );
};

export default MetaData;
